<script lang="ts">
  import { page } from '$app/state';

  const statusMessages: Record<number, { title: string; description: string; icon: string }> = {
    404: {
      title: 'Page Not Found',
      description: "The page you're looking for doesn't exist or has been moved.",
      icon: '🔍',
    },
    403: {
      title: 'Access Restricted',
      description: "You don't have permission to view this page. Please sign in with the right account.",
      icon: '🔒',
    },
    500: {
      title: 'Server Error',
      description: 'Something went wrong on our end. Please try again shortly.',
      icon: '⚠️',
    },
  };

  const status = $derived(page.status);
  const msg = $derived(
    statusMessages[status] ?? {
      title: 'Something Went Wrong',
      description: page.error?.message ?? 'An unexpected error occurred.',
      icon: '❌',
    }
  );

  function goBack() {
    if (typeof window !== 'undefined') window.history.back();
  }
</script>

<svelte:head>
  <title>{status} — {msg.title} | FinancialAuditor</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div
  class="min-h-screen flex items-center justify-center px-4"
  style="background-color:#0a1628;color:#f1f5f9;font-family:system-ui,sans-serif"
>
  <div
    class="absolute inset-0 pointer-events-none"
    style="background:radial-gradient(ellipse 60% 40% at 50% 0%,rgba(0,200,150,0.12) 0%,transparent 70%)"
  ></div>

  <div class="relative z-10 max-w-lg w-full text-center">
    <a href="/" class="inline-flex items-center gap-3 mb-10" aria-label="Go to FinancialAuditor home">
      <div style="width:40px;height:40px;background:#00c896;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px">📊</div>
      <span style="color:#00c896;font-size:18px;font-weight:700;letter-spacing:-0.5px">Financial<span style="color:#fff">Auditor</span></span>
    </a>

    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:48px 40px">
      <div style="font-size:56px;margin-bottom:16px">{msg.icon}</div>
      <div style="font-size:13px;font-weight:700;letter-spacing:3px;color:#00c896;text-transform:uppercase;margin-bottom:12px">Error {status}</div>
      <h1 style="font-size:26px;font-weight:800;color:#fff;margin:0 0 12px">{msg.title}</h1>
      <p style="color:#94a3b8;line-height:1.7;margin:0 0 32px;font-size:15px">{msg.description}</p>

      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a href="/" style="background:#00c896;color:#0a1628;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;display:inline-block">
          Go Home
        </a>
        <button
          onclick={goBack}
          style="background:rgba(255,255,255,0.08);color:#e2e8f0;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;border:1px solid rgba(255,255,255,0.12);cursor:pointer"
        >
          Go Back
        </button>
      </div>
    </div>

    <p style="color:#475569;font-size:13px;margin-top:24px">
      Need help? <a href="mailto:support@ewinproject.org" style="color:#00c896;text-decoration:none">Contact support</a>
    </p>
  </div>
</div>
