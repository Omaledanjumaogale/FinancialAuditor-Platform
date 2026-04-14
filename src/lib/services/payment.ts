/**
 * FinancialAuditor — Payment Service
 * ====================================
 * Supports:
 *  - Flutterwave V4 (primary, inline popup)
 *  - Korapay     (secondary, inline popup)
 *
 * CLIENT-SIDE ONLY — uses PUBLIC keys only.
 * Secret keys are handled by server-side API routes.
 */

import {
  PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
  PUBLIC_KORAPAY_PUBLIC_KEY,
} from '$env/static/public';

// ── Types ─────────────────────────────────────────────────────────────────────

export type PaymentResponse = {
  status?: string;
  transaction_id?: string | number;
  reference?: string;
  flw_ref?: string;
  [key: string]: unknown;
};

export interface PaymentData {
  amount: number;          // Amount in NGN (naira)
  email: string;
  name: string;
  phone?: string;
  reference: string;       // Unique transaction reference
  description?: string;    // Human-readable payment description
  planName?: string;       // Subscription plan name
  onSuccess: (response: PaymentResponse) => void;
  onCancel?: () => void;
}

// ── Flutterwave V4 ────────────────────────────────────────────────────────────

type FlutterwaveWindow = typeof window & {
  FlutterwaveCheckout?: (config: Record<string, unknown>) => void;
};

/**
 * Load the Flutterwave V4 inline script if not already loaded.
 */
function loadFlutterwaveScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Not a browser'));
    const fw = window as FlutterwaveWindow;
    if (fw.FlutterwaveCheckout) return resolve();

    const existing = document.querySelector('script[data-flw]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.setAttribute('data-flw', 'true');
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Flutterwave script'));
    document.head.appendChild(script);
  });
}

export async function initiateFlutterwave(data: PaymentData): Promise<void> {
  if (typeof window === 'undefined') return;

  await loadFlutterwaveScript();

  const fw = window as FlutterwaveWindow;
  if (!fw.FlutterwaveCheckout) throw new Error('FlutterwaveCheckout not available');

  fw.FlutterwaveCheckout({
    public_key: PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: data.reference,
    amount: data.amount,
    currency: 'NGN',
    payment_options: 'card,banktransfer,ussd,mpesa',
    customer: {
      email: data.email,
      phone_number: data.phone ?? '',
      name: data.name,
    },
    customizations: {
      title: 'FinancialAuditor Enterprise',
      description: data.description ?? `Payment for ${data.planName ?? 'Audit Service'}`,
      logo: 'https://financialauditor.ewinproject.org/logo.png',
    },
    callback: (response: PaymentResponse) => {
      console.log('[Flutterwave] Payment success', response.reference);
      data.onSuccess(response);
    },
    onclose: () => {
      console.log('[Flutterwave] Payment modal closed');
      data.onCancel?.();
    },
  });
}

// ── Korapay ──────────────────────────────────────────────────────────────────

type KorapayWindow = typeof window & {
  Korapay?: {
    initialize: (config: Record<string, unknown>) => void;
  };
};

function loadKorapayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Not a browser'));
    const kp = window as KorapayWindow;
    if (kp.Korapay) return resolve();

    const existing = document.querySelector('script[data-kp]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://korabay.com/cdn/korapay.js';
    script.setAttribute('data-kp', 'true');
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Korapay script'));
    document.head.appendChild(script);
  });
}

export async function initiateKorapay(data: PaymentData): Promise<void> {
  if (typeof window === 'undefined') return;

  await loadKorapayScript();

  const kp = window as KorapayWindow;
  if (!kp.Korapay) throw new Error('Korapay not available');

  kp.Korapay.initialize({
    key: PUBLIC_KORAPAY_PUBLIC_KEY,
    reference: data.reference,
    amount: data.amount,
    currency: 'NGN',
    customer: {
      email: data.email,
      name: data.name,
    },
    narration: data.description ?? `Payment for ${data.planName ?? 'Audit Service'}`,
    onClose: () => {
      console.log('[Korapay] Payment modal closed');
      data.onCancel?.();
    },
    onSuccess: (response: Record<string, unknown>) => {
      console.log('[Korapay] Payment success', response.reference);
      data.onSuccess(response as PaymentResponse);
    },
    onFailed: (response: Record<string, unknown>) => {
      console.error('[Korapay] Payment failed', response);
    },
  });
}

// ── Smart Payment Dispatcher ──────────────────────────────────────────────────

/**
 * Try Flutterwave first, automatically fall back to Korapay on failure.
 * This ensures maximum payment success rate across all Nigerian banks.
 */
export async function initiatePayment(data: PaymentData): Promise<void> {
  try {
    await initiateFlutterwave(data);
  } catch (flwError) {
    console.warn('[Payment] Flutterwave failed, trying Korapay:', flwError);
    try {
      await initiateKorapay(data);
    } catch (kpError) {
      console.error('[Payment] All payment providers failed:', kpError);
      throw new Error('Payment gateway unavailable. Please try again later.');
    }
  }
}

// ── Utility ───────────────────────────────────────────────────────────────────

/**
 * Generate a unique transaction reference with timestamp.
 */
export function generatePaymentRef(prefix = 'FA'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
