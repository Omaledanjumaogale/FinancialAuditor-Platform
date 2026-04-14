/**
 * POST /api/email/send
 * ─────────────────────
 * Unified email dispatch endpoint using Resend.
 * Supports: audit-report | welcome | payment-confirmation | audit-alert
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
  sendAuditReportEmail,
  sendWelcomeEmail,
  sendPaymentConfirmationEmail,
  sendAuditAlertEmail,
} from '$lib/services/email';

interface EmailBody {
  type: 'audit-report' | 'welcome' | 'payment-confirmation' | 'audit-alert';
  to: string;
  userName: string;
  // audit-report
  reportUrl?: string;
  score?: number;
  // welcome
  plan?: string;
  // payment-confirmation
  amount?: number;
  reference?: string;
  planName?: string;
  // audit-alert
  flagCount?: number;
  auditType?: string;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json() as EmailBody;

    if (!body.type || !body.to || !body.userName) {
      return error(400, 'type, to, and userName are required');
    }

    let result;

    switch (body.type) {
      case 'audit-report':
        if (!body.reportUrl) return error(400, 'reportUrl required');
        result = await sendAuditReportEmail(body.to, body.userName, body.reportUrl, body.score);
        break;

      case 'welcome':
        result = await sendWelcomeEmail(body.to, body.userName, body.plan ?? 'Starter');
        break;

      case 'payment-confirmation':
        if (!body.amount || !body.reference || !body.planName) return error(400, 'amount, reference, planName required');
        result = await sendPaymentConfirmationEmail(body.to, body.userName, body.amount, body.reference, body.planName);
        break;

      case 'audit-alert':
        if (body.flagCount == null || !body.auditType) return error(400, 'flagCount and auditType required');
        result = await sendAuditAlertEmail(body.to, body.userName, body.flagCount, body.auditType);
        break;

      default:
        return error(400, 'Unknown email type');
    }

    if (!result.success) return error(500, 'Email delivery failed');
    return json({ success: true, messageId: (result.data as unknown as Record<string, unknown>)?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API /email/send]', message);
    return error(500, `Email service error: ${message}`);
  }
};
