import { PUBLIC_FLUTTERWAVE_KEY, PUBLIC_PAYSTACK_KEY } from "$env/static/public";

type PaymentResponse = {
  status?: string;
  transaction_id?: string;
  reference?: string;
  [key: string]: unknown;
};

export interface PaymentData {
  amount: number;
  email: string;
  name: string;
  phone?: string;
  reference: string;
  onSuccess: (response: PaymentResponse) => void;
  onCancel?: () => void;
}

type FlutterwaveWindow = typeof window & { FlutterwaveCheckout?: (config: Record<string, unknown>) => void };
type PaystackWindow = typeof window & { PaystackPop?: { setup: (config: Record<string, unknown>) => { openIframe: () => void } } };

export const initiateFlutterwave = (data: PaymentData) => {
  if (typeof window === 'undefined') return;
  const flwWindow = window as FlutterwaveWindow;
  if (!flwWindow.FlutterwaveCheckout) return;

  flwWindow.FlutterwaveCheckout({
    public_key: PUBLIC_FLUTTERWAVE_KEY,
    tx_ref: data.reference,
    amount: data.amount,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: data.email,
      phone_number: data.phone || "",
      name: data.name,
    },
    customizations: {
      title: "FinancialAuditor Enterprise",
      description: "Payment for Audit/Subscription",
      logo: "https://financialauditor.ewinproject.org/logo.png",
    },
    callback: (response: PaymentResponse) => {
      console.log("Flutterwave Payment Successful", response);
      data.onSuccess(response);
    },
    onclose: () => {
      console.log("Flutterwave Payment Closed");
      if (data.onCancel) data.onCancel();
    }
  });
};

export const initiatePaystack = (data: PaymentData) => {
  if (typeof window === 'undefined') return;
  const psWindow = window as PaystackWindow;
  if (!psWindow.PaystackPop) return;

  const handler = psWindow.PaystackPop.setup({
    key: PUBLIC_PAYSTACK_KEY,
    email: data.email,
    amount: data.amount * 100, // Paystack uses kobo
    currency: "NGN",
    ref: data.reference,
    onClose: () => {
      console.log("Paystack Payment Closed");
      if (data.onCancel) data.onCancel();
    },
    callback: (response: PaymentResponse) => {
      console.log("Paystack Payment Successful", response);
      data.onSuccess(response);
    }
  });
  handler.openIframe();
};
