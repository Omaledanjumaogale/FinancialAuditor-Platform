/**
 * FinancialAuditor — Enterprise LLM Service
 * ==========================================
 * Unified LLM interface with automatic 7-model fallback chain.
 * Primary: OpenAI GPT-4o-mini → Gemini 1.5 Flash → DeepSeek V3.1
 * → DeepSeek V3 → DeepSeek R1 → Qwen 3 235B → Nemotron 70B → GLM 4.5 Air
 *
 * All providers use the OpenAI-compatible /chat/completions API format.
 * This file runs SERVER-SIDE ONLY (never expose API keys to the browser).
 */

import { env } from '$env/dynamic/private';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMRequest {
  messages: LLMMessage[];
  /** JSON schema hint for structured output (passed as system instruction) */
  responseFormat?: 'json' | 'text';
  /** Max tokens for the response — defaults to 2048 */
  maxTokens?: number;
  /** Temperature: 0 = deterministic, 1 = creative — defaults to 0.3 */
  temperature?: number;
  /** Audit context label for logging */
  context?: string;
}

export interface LLMResponse {
  content: string;
  provider: string;
  model: string;
  tokensUsed?: number;
}

// ── Provider Registry ─────────────────────────────────────────────────────────

interface LLMProvider {
  name: string;
  baseUrl: string;
  model: string;
  apiKey: string;
  /** Some providers require a different auth header format */
  authHeader?: (key: string) => Record<string, string>;
}

function buildProviders(): LLMProvider[] {
  return [
    // Primary
    {
      name: 'openai',
      baseUrl: env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
      model: env.OPENAI_MODEL || 'gpt-4o-mini',
      apiKey: env.OPENAI_API_KEY || '',
    },
    // Secondary: Gemini via OpenAI-compatible endpoint
    {
      name: 'gemini',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
      model: env.GEMINI_MODEL || 'gemini-1.5-flash',
      apiKey: env.GEMINI_API_KEY || '',
    },
    // Fallback 1: DeepSeek V3.1 via OpenRouter
    {
      name: 'deepseek-v3-1',
      baseUrl: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      model: env.DEEPSEEK_V3_1_MODEL || 'deepseek/deepseek-chat-v3-0324',
      apiKey: env.DEEPSEEK_V3_1_KEY || '',
    },
    // Fallback 2: DeepSeek V3
    {
      name: 'deepseek-v3',
      baseUrl: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      model: env.DEEPSEEK_V3_MODEL || 'deepseek/deepseek-chat',
      apiKey: env.DEEPSEEK_V3_KEY || '',
    },
    // Fallback 3: DeepSeek R1 (reasoning)
    {
      name: 'deepseek-r1',
      baseUrl: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      model: env.DEEPSEEK_R1_MODEL || 'deepseek/deepseek-r1',
      apiKey: env.DEEPSEEK_R1_KEY || '',
    },
    // Fallback 4: Qwen 3 235B
    {
      name: 'qwen3-235b',
      baseUrl: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      model: env.QWEN_3_235B_MODEL || 'qwen/qwen3-235b-a22b',
      apiKey: env.QWEN_3_235B_KEY || '',
    },
    // Fallback 5: NVIDIA Nemotron 70B Super
    {
      name: 'nemotron-super',
      baseUrl: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      model: env.NVIDIA_NEMOTRON_SUPER_MODEL || 'nvidia/llama-3.1-nemotron-70b-instruct',
      apiKey: env.NVIDIA_NEMOTRON_SUPER_KEY || '',
    },
    // Fallback 6 (last resort): GLM 4.5 Air
    {
      name: 'glm-4-5-air',
      baseUrl: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      model: env.GLM_4_5_AIR_MODEL || 'thudm/glm-4-plus',
      apiKey: env.GLM_4_5_AIR_KEY || '',
    },
  ].filter(p => p.apiKey && !p.apiKey.startsWith('your-'));
}

// ── Core Request Function ─────────────────────────────────────────────────────

async function callProvider(provider: LLMProvider, request: LLMRequest): Promise<LLMResponse> {
  const messages = [...request.messages];

  // Enforce JSON output via system message when requested
  if (request.responseFormat === 'json') {
    const hasSystem = messages.some(m => m.role === 'system');
    if (hasSystem) {
      messages[0].content += '\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanation outside the JSON object.';
    } else {
      messages.unshift({
        role: 'system',
        content: 'You are a financial AI assistant. Respond ONLY with valid JSON. No markdown fences.',
      });
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${provider.apiKey}`,
  };

  // OpenRouter requires these site headers for attribution
  if (provider.baseUrl.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = 'https://financialauditor.ewinproject.org';
    headers['X-Title'] = 'FinancialAuditor Enterprise';
  }

  const body = {
    model: provider.model,
    messages,
    max_tokens: request.maxTokens ?? 2048,
    temperature: request.temperature ?? 0.3,
    ...(request.responseFormat === 'json' ? { response_format: { type: 'json_object' } } : {}),
  };

  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`[${provider.name}] HTTP ${response.status}: ${errorText.slice(0, 200)}`);
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>;
    usage?: { total_tokens: number };
    error?: { message: string };
  };

  if (data.error) throw new Error(`[${provider.name}] API error: ${data.error.message}`);

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(`[${provider.name}] Empty response`);

  return {
    content,
    provider: provider.name,
    model: provider.model,
    tokensUsed: data.usage?.total_tokens,
  };
}

// ── Main: Fallback-Chain Entry Point ─────────────────────────────────────────

/**
 * Call the LLM with automatic fallback across all configured providers.
 * Tries each provider in order until one succeeds or all fail.
 */
export async function callLLM(request: LLMRequest): Promise<LLMResponse> {
  const providers = buildProviders();
  if (providers.length === 0) {
    throw new Error('No LLM providers configured. Set at least OPENAI_API_KEY in environment variables.');
  }

  const errors: string[] = [];

  for (const provider of providers) {
    try {
      console.log(`[LLM] Trying provider: ${provider.name} (${provider.model})`);
      const result = await callProvider(provider, request);
      console.log(`[LLM] Success via ${provider.name} — ${result.tokensUsed ?? '?'} tokens — context: ${request.context ?? 'general'}`);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[LLM] Provider ${provider.name} failed: ${message}`);
      errors.push(`${provider.name}: ${message}`);
    }
  }

  throw new Error(`All LLM providers failed:\n${errors.join('\n')}`);
}

// ── Financial Audit Helpers ───────────────────────────────────────────────────

export interface AuditAnalysisResult {
  score: number;
  findings: Array<{
    category: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
    emoji: string;
  }>;
  summary: string;
  recommendations: string[];
}

/**
 * Analyse uploaded financial documents using the AI fallback chain.
 * Used by the Audit Engine in dashboard/audit.
 */
export async function analyseFinancialDocument(
  documentContent: string,
  auditType: string
): Promise<AuditAnalysisResult> {
  const { content } = await callLLM({
    context: 'audit-analysis',
    responseFormat: 'json',
    temperature: 0.2,
    maxTokens: 3000,
    messages: [
      {
        role: 'system',
        content: `You are an expert Nigerian financial auditor with deep knowledge of FIRS regulations, CAC requirements, and Nigerian tax law. 
You analyse financial documents and return structured JSON audit results.
Always respond with this exact JSON structure:
{
  "score": <number 0-100>,
  "findings": [
    { "category": "<string>", "severity": "low|medium|high", "message": "<string>", "emoji": "<emoji>" }
  ],
  "summary": "<string>",
  "recommendations": ["<string>", ...]
}`,
      },
      {
        role: 'user',
        content: `Audit Type: ${auditType}\n\nDocument Content:\n${documentContent.slice(0, 8000)}`,
      },
    ],
  });

  try {
    return JSON.parse(content) as AuditAnalysisResult;
  } catch {
    // Fallback: return a safe structured response if JSON parse fails
    return {
      score: 75,
      findings: [{ category: 'General', severity: 'low', message: 'Document processed. Manual review recommended.', emoji: '📋' }],
      summary: content.slice(0, 500),
      recommendations: ['Consult a certified auditor for detailed review.'],
    };
  }
}

/**
 * Generate AI financial advisory for the Analytics dashboard.
 */
export async function generateFinancialAdvisory(
  revenueData: Record<string, number>,
  expenseData: Record<string, number>
): Promise<{ insight: string; forecast: string; actions: string[] }> {
  const { content } = await callLLM({
    context: 'financial-advisory',
    responseFormat: 'json',
    temperature: 0.4,
    maxTokens: 1500,
    messages: [
      {
        role: 'system',
        content: 'You are a CFO-level financial advisor for a Nigerian business. Respond with JSON: { "insight": string, "forecast": string, "actions": string[] }',
      },
      {
        role: 'user',
        content: `Revenue by month: ${JSON.stringify(revenueData)}\nExpenses by month: ${JSON.stringify(expenseData)}\n\nProvide financial insights, a 3-month forecast, and 3 actionable recommendations.`,
      },
    ],
  });

  try {
    return JSON.parse(content);
  } catch {
    return {
      insight: content.slice(0, 300),
      forecast: 'Revenue trend analysis in progress.',
      actions: ['Review expense categories', 'Optimize tax deductions', 'Consult FIRS compliance checklist'],
    };
  }
}

import { PUBLIC_CRAWL4AI_API_URL } from '$env/static/public';

/**
 * Crawl4AI enhanced document analysis — scrapes a URL then audits.
 * Falls back to LLM-only if Crawl4AI is unavailable.
 */
export async function analyseUrlWithCrawl4AI(
  url: string,
  context: string
): Promise<{ content: string; analysis: string }> {
  const crawlUrl = PUBLIC_CRAWL4AI_API_URL || '';
  const crawlSecret = env.CRAWL4AI_API_SECRET || '';

  let crawledContent = '';

  if (crawlUrl && crawlSecret) {
    try {
      const crawlResponse = await fetch(`${crawlUrl}/crawl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${crawlSecret}`,
        },
        body: JSON.stringify({ url, extract_format: 'markdown', remove_forms: true }),
      });

      if (crawlResponse.ok) {
        const crawlData = await crawlResponse.json() as { markdown?: string; content?: string };
        crawledContent = crawlData.markdown || crawlData.content || '';
      }
    } catch (err) {
      console.warn('[Crawl4AI] Scrape failed, falling back to LLM direct analysis:', err);
    }
  }

  const { content: analysis } = await callLLM({
    context: 'url-analysis',
    responseFormat: 'text',
    messages: [
      { role: 'system', content: 'You are a financial document analyst. Extract key financial information and provide a concise audit-relevant summary.' },
      { role: 'user', content: `Context: ${context}\nURL: ${url}\n${crawledContent ? `Content:\n${crawledContent.slice(0, 6000)}` : 'Analyse this financial resource based on the URL and context provided.'}` },
    ],
  });

  return { content: crawledContent, analysis };
}
