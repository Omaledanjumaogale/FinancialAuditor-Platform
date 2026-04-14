/**
 * POST /api/ai/audit
 * ──────────────────
 * Server-side AI audit endpoint. Receives document content,
 * runs it through the LLM fallback chain, returns structured analysis.
 * Keeps all API keys server-side — never exposed to the browser.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { analyseFinancialDocument, callLLM } from '$lib/services/llm';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json() as {
      documentContent?: string;
      auditType?: string;
      messages?: Array<{ role: string; content: string }>;
      context?: string;
    };

    // Direct document audit
    if (body.documentContent) {
      const result = await analyseFinancialDocument(
        body.documentContent,
        body.auditType ?? 'General Financial Audit'
      );
      return json({ success: true, result });
    }

    // Generic LLM chat (for AI advisory, analytics insights, etc.)
    if (body.messages && Array.isArray(body.messages)) {
      const result = await callLLM({
        messages: body.messages as Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
        context: body.context ?? 'api-call',
        responseFormat: 'text',
      });
      return json({ success: true, result });
    }

    return error(400, 'Provide either documentContent or messages');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API /ai/audit]', message);
    return error(500, `AI service error: ${message}`);
  }
};
