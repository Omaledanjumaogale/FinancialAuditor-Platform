/**
 * FinancialAuditor — Email Service (Resend)
 * ==========================================
 * Domain: ewinproject.org
 * From:   noreply@ewinproject.org / reports@ewinproject.org
 *
 * SERVER-SIDE ONLY — uses private RESEND_API_KEY.
 */

import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);
const FROM_REPORTS = 'FinancialAuditor <reports@ewinproject.org>';
const FROM_NOREPLY = 'FinancialAuditor <noreply@ewinproject.org>';
const BRAND_COLOR = '#00C896';
const BG_COLOR = '#0A1628';

// ── Shared email template wrapper ─────────────────────────────────────────────
function htmlWrapper(body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}</style>
</head>
<body>
<div style="max-width:600px;margin:40px auto;background:${BG_COLOR};border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1)">
  <div style="background:linear-gradient(135deg,${BG_COLOR},#0f2040);padding:32px 40px;border-bottom:3px solid ${BRAND_COLOR}">
    <div style="display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;border-radius:8px;background:${BRAND_COLOR};display:flex;align-items:center;justify-content:center;font-size:18px">📊</div>
      <span style="color:${BRAND_COLOR};font-size:18px;font-weight:700;letter-spacing:-0.5px">FinancialAuditor</span>
    </div>
  </div>
  <div style="padding:40px;color:#e2e8f0">
    ${body}
  </div>
  <div style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);text-align:center">
    <p style="color:#475569;font-size:12px;margin:0">
      © ${new Date().getFullYear()} FinancialAuditor by EwinProject. All rights reserved.<br>
      <a href="https://financialauditor.ewinproject.org" style="color:${BRAND_COLOR};text-decoration:none">financialauditor.ewinproject.org</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

// ── Send audit report ─────────────────────────────────────────────────────────

export async function sendAuditReportEmail(
  to: string,
  userName: string,
  reportUrl: string,
  score?: number
) {
  const scoreHtml = score != null
    ? `<div style="text-align:center;margin:24px 0">
        <div style="display:inline-block;background:rgba(0,200,150,0.12);border:2px solid ${BRAND_COLOR};border-radius:50%;width:72px;height:72px;line-height:72px;font-size:22px;font-weight:700;color:${BRAND_COLOR}">${score}%</div>
        <p style="color:#94a3b8;font-size:13px;margin:8px 0 0">Compliance Score</p>
       </div>`
    : '';

  const body = `
    <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 8px">Your Audit Report is Ready ✅</h1>
    <p style="color:#94a3b8;margin:0 0 24px">Hello ${userName},</p>
    ${scoreHtml}
    <p style="color:#cbd5e1;line-height:1.7">Your comprehensive financial audit has been completed. Review your findings, compliance score, and actionable recommendations below.</p>
    <div style="margin:32px 0;text-align:center">
      <a href="${reportUrl}" style="background:${BRAND_COLOR};color:#0A1628;padding:14px 32px;text-decoration:none;font-weight:700;border-radius:8px;font-size:14px;letter-spacing:0.5px;display:inline-block">View Full Report →</a>
    </div>
    <p style="color:#475569;font-size:13px">If you did not request this audit, please contact us at <a href="mailto:support@ewinproject.org" style="color:${BRAND_COLOR}">support@ewinproject.org</a></p>`;

  const { data, error } = await resend.emails.send({
    from: FROM_REPORTS,
    to: [to],
    subject: `Your Audit Report is Ready — ${score != null ? `${score}% Compliance Score` : 'FinancialAuditor'}`,
    html: htmlWrapper(body),
  });

  if (error) { console.error('[Email] sendAuditReportEmail failed:', error); return { success: false, error }; }
  return { success: true, data };
}

// ── Welcome / onboarding ──────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, userName: string, plan: string) {
  const body = `
    <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 8px">Welcome to FinancialAuditor 🎉</h1>
    <p style="color:#94a3b8;margin:0 0 24px">Hello ${userName},</p>
    <p style="color:#cbd5e1;line-height:1.7">Your <strong style="color:${BRAND_COLOR}">${plan}</strong> account is now active. You can start uploading documents, running AI audits, and generating FIRS-compliant reports immediately.</p>
    <div style="background:rgba(0,200,150,0.06);border:1px solid rgba(0,200,150,0.2);border-radius:12px;padding:20px;margin:24px 0">
      <p style="color:#fff;font-weight:600;margin:0 0 12px">Get started in 3 steps:</p>
      <ol style="color:#94a3b8;line-height:2;margin:0;padding-left:20px">
        <li>Upload your financial documents</li>
        <li>Run your first AI audit</li>
        <li>Download your FIRS-compliant report</li>
      </ol>
    </div>
    <div style="margin:32px 0;text-align:center">
      <a href="https://financialauditor.ewinproject.org/dashboard" style="background:${BRAND_COLOR};color:#0A1628;padding:14px 32px;text-decoration:none;font-weight:700;border-radius:8px;font-size:14px;display:inline-block">Go to Dashboard →</a>
    </div>`;

  const { data, error } = await resend.emails.send({
    from: FROM_NOREPLY,
    to: [to],
    subject: `Welcome to FinancialAuditor — Your ${plan} account is ready`,
    html: htmlWrapper(body),
  });

  if (error) { console.error('[Email] sendWelcomeEmail failed:', error); return { success: false, error }; }
  return { success: true, data };
}

// ── Payment confirmation ──────────────────────────────────────────────────────

export async function sendPaymentConfirmationEmail(
  to: string,
  userName: string,
  amount: number,
  reference: string,
  planName: string
) {
  const formattedAmount = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

  const body = `
    <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 8px">Payment Confirmed ✅</h1>
    <p style="color:#94a3b8;margin:0 0 24px">Hello ${userName},</p>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;margin:0 0 24px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="color:#94a3b8;padding:8px 0;font-size:14px">Plan</td><td style="color:#fff;text-align:right;font-weight:600">${planName}</td></tr>
        <tr><td style="color:#94a3b8;padding:8px 0;font-size:14px;border-top:1px solid rgba(255,255,255,0.06)">Amount</td><td style="color:${BRAND_COLOR};text-align:right;font-weight:700;border-top:1px solid rgba(255,255,255,0.06)">${formattedAmount}</td></tr>
        <tr><td style="color:#94a3b8;padding:8px 0;font-size:14px;border-top:1px solid rgba(255,255,255,0.06)">Reference</td><td style="color:#fff;text-align:right;font-family:monospace;border-top:1px solid rgba(255,255,255,0.06)">${reference}</td></tr>
      </table>
    </div>
    <p style="color:#cbd5e1;line-height:1.7">Your subscription is now active. You have full access to all ${planName} features.</p>
    <div style="margin:32px 0;text-align:center">
      <a href="https://financialauditor.ewinproject.org/dashboard" style="background:${BRAND_COLOR};color:#0A1628;padding:14px 32px;text-decoration:none;font-weight:700;border-radius:8px;font-size:14px;display:inline-block">Open Dashboard →</a>
    </div>`;

  const { data, error } = await resend.emails.send({
    from: FROM_NOREPLY,
    to: [to],
    subject: `Payment Confirmed — ${formattedAmount} for ${planName}`,
    html: htmlWrapper(body),
  });

  if (error) { console.error('[Email] sendPaymentConfirmationEmail failed:', error); return { success: false, error }; }
  return { success: true, data };
}

// ── Audit alert ───────────────────────────────────────────────────────────────

export async function sendAuditAlertEmail(
  to: string,
  userName: string,
  flagCount: number,
  auditType: string
) {
  const body = `
    <h1 style="color:#f87171;font-size:22px;font-weight:700;margin:0 0 8px">⚠️ Compliance Flags Detected</h1>
    <p style="color:#94a3b8;margin:0 0 24px">Hello ${userName},</p>
    <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:20px;margin:0 0 24px">
      <p style="color:#fca5a5;font-weight:600;margin:0">Your <strong>${auditType}</strong> audit identified <strong>${flagCount} compliance flag${flagCount !== 1 ? 's' : ''}</strong> that require your attention.</p>
    </div>
    <p style="color:#cbd5e1;line-height:1.7">Review the detailed findings in your dashboard and take corrective action before your next FIRS filing deadline.</p>
    <div style="margin:32px 0;text-align:center">
      <a href="https://financialauditor.ewinproject.org/dashboard/audit" style="background:#ef4444;color:#fff;padding:14px 32px;text-decoration:none;font-weight:700;border-radius:8px;font-size:14px;display:inline-block">Review Flags →</a>
    </div>`;

  const { data, error } = await resend.emails.send({
    from: FROM_REPORTS,
    to: [to],
    subject: `⚠️ Action Required — ${flagCount} compliance flag${flagCount !== 1 ? 's' : ''} in your ${auditType} audit`,
    html: htmlWrapper(body),
  });

  if (error) { console.error('[Email] sendAuditAlertEmail failed:', error); return { success: false, error }; }
  return { success: true, data };
}
