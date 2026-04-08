import { PUBLIC_FLUTTERWAVE_PUBLIC_KEY, PUBLIC_PAYSTACK_PUBLIC_KEY } from "$env/static/public";

export interface PaymentData {
  amount: number;
  email: string;
  name: string;
  phone?: string;
  reference: string;
  onSuccess: (response: any) => void;
  onCancel?: () => void;
}

export const initiateFlutterwave = (data: PaymentData) => {
  if (typeof window === 'undefined') return;
  
  // @ts-ignore
  window.FlutterwaveCheckout({
    public_key: PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
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
    callback: (response: any) => {
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

  // @ts-ignore
  const handler = window.PaystackPop.setup({
    key: PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: data.email,
    amount: data.amount * 100, // Paystack uses kobo
    currency: "NGN",
    ref: data.reference,
    onClose: () => {
      console.log("Paystack Payment Closed");
      if (data.onCancel) data.onCancel();
    },
    callback: (response: any) => {
      console.log("Paystack Payment Successful", response);
      data.onSuccess(response);
    }
  });
  handler.openIframe();
};
