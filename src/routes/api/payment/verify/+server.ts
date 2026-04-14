/**
 * POST /api/payment/verify
 * ─────────────────────────
 * Server-side payment verification for Flutterwave and Korapay.
 * Called after a successful client-side payment callback.
 * Uses secret keys to verify with the payment provider's API.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FLUTTERWAVE_SECRET_KEY, KORAPAY_SECRET_KEY } from '$env/static/private';

interface VerifyBody {
  provider: 'flutterwave' | 'korapay';
  transactionId?: string;
  reference?: string;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json() as VerifyBody;

    if (!body.provider) return error(400, 'provider is required');

    // ── Flutterwave verification ────────────────────────────────────────
    if (body.provider === 'flutterwave') {
      if (!body.transactionId) return error(400, 'transactionId required for Flutterwave');

      const res = await fetch(
        `https://api.flutterwave.com/v3/transactions/${body.transactionId}/verify`,
        { headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}` } }
      );

      if (!res.ok) {
        const text = await res.text();
        return error(502, `Flutterwave verification failed: ${text.slice(0, 200)}`);
      }

      const data = await res.json() as {
        status: string;
        data?: { status: string; amount: number; currency: string; tx_ref: string };
      };

      if (data.status !== 'success' || data.data?.status !== 'successful') {
        return json({ verified: false, reason: 'Transaction not successful', raw: data });
      }

      return json({ verified: true, provider: 'flutterwave', transaction: data.data });
    }

    // ── Korapay verification ────────────────────────────────────────────
    if (body.provider === 'korapay') {
      if (!body.reference) return error(400, 'reference required for Korapay');

      const res = await fetch(
        `https://api.korapay.com/merchant/api/v1/charges/${body.reference}`,
        {
          headers: {
            Authorization: `Bearer ${KORAPAY_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        return error(502, `Korapay verification failed: ${text.slice(0, 200)}`);
      }

      const data = await res.json() as {
        status: boolean;
        data?: { status: string; amount: number; reference: string };
      };

      if (!data.status || data.data?.status !== 'success') {
        return json({ verified: false, reason: 'Transaction not successful', raw: data });
      }

      return json({ verified: true, provider: 'korapay', transaction: data.data });
    }

    return error(400, 'Unsupported provider');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API /payment/verify]', message);
    return error(500, `Payment verification error: ${message}`);
  }
};
