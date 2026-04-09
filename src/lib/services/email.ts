import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function sendAuditReportEmail(to: string, userName: string, reportUrl: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'FinancialAuditor <reports@financialauditor.ewinproject.org>',
      to: [to],
      subject: 'Your AI Audit Report is Ready',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #0A1628; color: #ffffff; border-radius: 12px;">
          <h1 style="color: #00C896; border-bottom: 2px solid #00C896; padding-bottom: 10px;">Audit Complete</h1>
          <p>Hello ${userName},</p>
          <p>Your comprehensive financial audit report has been generated and is ready for review.</p>
          <div style="margin: 30px 0;">
            <a href="${reportUrl}" style="background: #00C896; color: #0A1628; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px;">View Full Report</a>
          </div>
          <p style="color: #94A3B8; font-size: 14px;">This is an automated message from the FinancialAuditor Intelligence Console.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email service error:', err);
    return { success: false, error: err };
  }
}
