/**
 * Updated AI service — wraps the server-side LLM API route
 * for use from client-side Svelte components.
 *
 * CLIENT-SAFE: makes fetch calls to /api/ai/audit — no direct API key access.
 */

export interface ScanRequest {
  url?: string;
  documentContent?: string;
  auditType?: string;
  context?: string;
}

export interface AuditResult {
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
 * Analyse financial documents via the server-side AI endpoint.
 * Uses the 7-model fallback chain automatically.
 */
export async function analyseDocument(request: ScanRequest): Promise<AuditResult> {
  const response = await fetch('/api/ai/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      documentContent: request.documentContent ?? request.url ?? '',
      auditType: request.auditType ?? 'General Financial Audit',
      context: request.context ?? 'document-audit',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`AI audit failed: ${err}`);
  }

  const data = await response.json() as { success: boolean; result: AuditResult };
  return data.result;
}

/**
 * Send a message to the AI advisory engine.
 * Returns a plain-text insight response.
 */
export async function getAIInsight(
  systemPrompt: string,
  userMessage: string,
  context = 'advisory'
): Promise<string> {
  const response = await fetch('/api/ai/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      context,
    }),
  });

  if (!response.ok) throw new Error('AI insight request failed');
  const data = await response.json() as { result: { content: string } };
  return data.result.content;
}

// Legacy compatibility — still works for anything calling executeAIAnalysis
export const executeAIAnalysis = (request: { url: string; context: string }) =>
  analyseDocument({ url: request.url, context: request.context });
