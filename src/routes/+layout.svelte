<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import MobileBottomNav from '$lib/components/layout/MobileBottomNav.svelte';
  import { setupConvex, useConvexClient } from 'convex-svelte';
  import Toast from '$lib/components/ui/Toast.svelte';
  import { PUBLIC_CONVEX_URL } from '$env/static/public';
  import { authState } from '$lib/stores/auth.svelte';
  import { api } from '$convex/_generated/api';

  let { children } = $props();
  let toast: any = $state();

  // ── Convex setup ─────────────────────────────────────────────────────────────
  // Use a placeholder to satisfy convex-svelte's context setup during SSR.
  // Real connections are never opened on the Edge — only the browser establishes
  // the WebSocket. Mutations/queries below are guarded with browser checks.
  const convexUrl = PUBLIC_CONVEX_URL || 'https://determined-mule-860.convex.cloud';
  setupConvex(convexUrl);
  const client = useConvexClient();

  // ── Sync Firebase auth user into Convex (browser-only) ───────────────────────
  $effect(() => {
    if (!browser || !authState.user || !PUBLIC_CONVEX_URL) return;
    const { uid, email, displayName } = authState.user;
    client
      .mutation(api.users.store, {
        uid,
        email: email || '',
        name: displayName || undefined,
        role: 'client',
        plan: 'starter',
        isVerified: false,
      })
      .catch((err: unknown) => {
        console.error('[Layout] Failed to sync user with Convex:', err);
      });
  });

  // ── Viewport height fix + accessibility pass ──────────────────────────────────
  onMount(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);

    document.querySelectorAll('img').forEach((img) => {
      if (!img.alt) img.alt = 'Enterprise financial record';
    });

    // ── Register service worker for offline caching ───────────────────────────
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => console.log('[SW] Registered, scope:', reg.scope))
        .catch((err) => console.warn('[SW] Registration failed:', err));
    }

    return () => window.removeEventListener('resize', setVh);
  });

  // ── Structured Data (JSON-LD) — lazy inlined for SEO ─────────────────────────
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FinancialAuditor',
    url: 'https://financialauditor.ewinproject.org',
    description:
      'AI-Powered Financial Auditing and Ledger Management Platform for Nigeria. Enterprise-grade compliance and real-time intelligence.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    author: { '@type': 'Organization', name: 'E-WIN Project' },
  };
</script>

<svelte:head>
  <title>FinancialAuditor - AI-Powered Financial Auditing &amp; Ledger Management | Nigeria</title>
  <meta
    name="description"
    content="Transform your financial auditing with AI. Secure, enterprise-grade ledger management and real-time compliance for Nigerian businesses. Start your free trial today!"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />

  <!-- SEO / Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://financialauditor.ewinproject.org" />
  <meta property="og:title" content="FinancialAuditor - AI-Powered Auditing" />
  <meta property="og:description" content="Enterprise-grade financial intelligence for Nigeria. AI-powered audits, ledger management, and compliance." />
  <meta property="og:image" content="https://financialauditor.ewinproject.org/og-image.png" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FinancialAuditor - AI Auditing" />
  <meta name="twitter:description" content="Automate your financial audits with enterprise-grade AI." />

  <!-- Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(schemaData)}<\/script>`}
</svelte:head>

<div
  class="min-h-screen bg-navy text-white font-sans selection:bg-emerald/20 overflow-x-hidden w-full relative"
  style="background-color:#0a1628;color:#f1f5f9"
>
  <!-- Hero Gradient Overlay -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.18)_0%,transparent_70%),radial-gradient(ellipse_50%_40%_at_90%_60%,rgba(245,166,35,0.08)_0%,transparent_60%)]"
    ></div>
    <div class="absolute inset-0 grid-pattern opacity-10"></div>
  </div>

  <div class="relative z-10 flex flex-col min-h-screen w-full max-w-[100vw]">
    {@render children()}
  </div>

  <!-- Mobile Bottom Nav — shows on all pages below md breakpoint -->
  <MobileBottomNav />

  <Toast bind:this={toast} />
</div>

<style>
  :global(body) {
    background-color: #0a1628;
    color: #f1f5f9;
    overflow-x: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  :global(.grid-pattern) {
    background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0);
    background-size: 32px 32px;
  }
</style>
