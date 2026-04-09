<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck, AlertCircle, BarChart2 } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { goto } from '$app/navigation';

  let mode      = $state<'signin' | 'signup'>('signin');
  let email     = $state('');
  let password  = $state('');
  let name      = $state('');
  let showPass  = $state(false);
  let isLoading = $state(false);
  let error     = $state('');

  async function handleSubmit() {
    if (!email || !password) { error = 'Please fill in all fields.'; return; }
    if (mode === 'signup' && !name) { error = 'Please enter your full name.'; return; }
    isLoading = true;
    error = '';
    try {
      if (mode === 'signin') {
        await authState.signIn(email, password);
      } else {
        await authState.signUp(email, password, name);
      }
      await goto('/dashboard');
    } catch (e: any) {
      error = e?.message?.includes('wrong-password') ? 'Incorrect password. Please try again.'
        : e?.message?.includes('user-not-found') ? 'No account found with this email.'
        : e?.message?.includes('email-already-in-use') ? 'This email is already registered.'
        : 'Something went wrong. Please try again.';
    } finally {
      isLoading = false;
    }
  }

  async function handleGoogle() {
    isLoading = true;
    error = '';
    try {
      await authState.signInWithGoogle();
      await goto('/dashboard');
    } catch (e: any) {
      error = 'Google sign-in failed. Please try again.';
    } finally {
      isLoading = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit();
  }
</script>

<svelte:head>
  <title>{mode === 'signin' ? 'Sign In' : 'Create Account'} — FinancialAuditor</title>
</svelte:head>

<div class="min-h-screen flex" style="background-color:#0a1628">

  <!-- Left Panel — Branding -->
  <div class="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
    style="background: linear-gradient(135deg, #0f2040 0%, #0a1628 50%, #071020 100%);">
    <!-- Grid pattern -->
    <div class="absolute inset-0 grid-pattern opacity-10" aria-hidden="true"></div>
    <!-- Glow -->
    <div class="absolute top-0 left-0 w-3/4 h-1/2 rounded-full blur-3xl opacity-15" style="background:radial-gradient(#10b981, transparent)" aria-hidden="true"></div>

    <div class="relative z-10">
      <a href="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4)]" aria-hidden="true">
          <BarChart2 size={20} class="text-white" />
        </div>
        <div>
          <p class="font-heading font-bold text-white text-lg leading-none">Financial<span class="text-emerald">Auditor</span></p>
          <p class="text-[10px] text-slate-dim tracking-widest uppercase mt-0.5">AI · Nigeria</p>
        </div>
      </a>
    </div>

    <div class="relative z-10 space-y-8">
      <div>
        <h1 class="text-3xl font-heading font-bold text-white leading-tight">
          Enterprise-grade<br/>
          <span class="text-emerald">financial intelligence</span><br/>
          built for Nigeria.
        </h1>
        <p class="text-slate-dim mt-3 text-sm leading-relaxed max-w-sm">
          Join 3,000+ businesses using AI-powered audits, FIRS compliance automation, and real-time financial analytics.
        </p>
      </div>

      <div class="space-y-3">
        {#each [
          'FIRS-compliant AI audit reports',
          'Real-time ledger reconciliation',
          'Verified ICAN-certified auditors',
          'End-to-end encrypted documents',
        ] as feature}
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full bg-emerald/20 flex items-center justify-center shrink-0" aria-hidden="true">
              <ShieldCheck size={12} class="text-emerald" />
            </div>
            <span class="text-sm text-slate">{feature}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="relative z-10">
      <p class="text-xs text-slate-dim">© 2026 FinancialAuditor · E-WIN Project · Lagos, Nigeria</p>
    </div>
  </div>

  <!-- Right Panel — Form -->
  <div class="flex-1 flex flex-col items-center justify-center px-6 py-12" in:fly={{ x: 10, duration: 300 }}>
    <div class="w-full max-w-sm space-y-6">

      <!-- Mobile Logo -->
      <div class="lg:hidden flex items-center gap-3 mb-4">
        <div class="w-9 h-9 rounded-xl bg-emerald flex items-center justify-center">
          <BarChart2 size={18} class="text-white" aria-hidden="true" />
        </div>
        <p class="font-heading font-bold text-white">Financial<span class="text-emerald">Auditor</span></p>
      </div>

      <!-- Heading -->
      <div>
        <h2 class="text-2xl font-heading font-bold text-white">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p class="text-sm text-slate-dim mt-1">
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
          <button onclick={() => { mode = mode === 'signin' ? 'signup' : 'signin'; error = ''; }}
            class="text-emerald hover:underline font-semibold ml-1">
            {mode === 'signin' ? 'Sign up free' : 'Sign in'}
          </button>
        </p>
      </div>

      <!-- Error -->
      {#if error}
        <div class="flex items-start gap-3 px-4 py-3 rounded-xl border" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3)" role="alert" in:fly={{ y: -4, duration: 200 }}>
          <AlertCircle size={15} class="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
          <p class="text-sm" style="color:#fca5a5">{error}</p>
        </div>
      {/if}

      <!-- Form -->
      <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4" novalidate>

        {#if mode === 'signup'}
          <div in:fly={{ y: -6, duration: 200 }}>
            <label for="auth-name" class="block text-xs font-semibold text-slate-dim mb-1.5">Full Name</label>
            <div class="relative">
              <input
                id="auth-name"
                type="text"
                bind:value={name}
                placeholder="Your full name"
                autocomplete="name"
                required
                class="w-full py-3 px-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
                style="background-color:#1f2937;"
              />
            </div>
          </div>
        {/if}

        <div>
          <label for="auth-email" class="block text-xs font-semibold text-slate-dim mb-1.5">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-dim" size={15} aria-hidden="true" />
            <input
              id="auth-email"
              type="email"
              bind:value={email}
              placeholder="you@company.ng"
              autocomplete={mode === 'signin' ? 'email' : 'email'}
              required
              class="w-full py-3 pl-10 pr-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
              style="background-color:#1f2937;"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label for="auth-password" class="text-xs font-semibold text-slate-dim">Password</label>
            {#if mode === 'signin'}
              <a href="/auth/forgot" class="text-xs text-emerald hover:underline">Forgot password?</a>
            {/if}
          </div>
          <div class="relative">
            <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-dim" size={15} aria-hidden="true" />
            <input
              id="auth-password"
              type={showPass ? 'text' : 'password'}
              bind:value={password}
              placeholder={mode === 'signin' ? '••••••••' : 'Min. 8 characters'}
              autocomplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
              onkeydown={handleKeydown}
              class="w-full py-3 pl-10 pr-11 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
              style="background-color:#1f2937;"
            />
            <button type="button" onclick={() => showPass = !showPass}
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-dim hover:text-white transition-colors"
              aria-label={showPass ? 'Hide password' : 'Show password'}>
              {#if showPass}<EyeOff size={15} aria-hidden="true" />{:else}<Eye size={15} aria-hidden="true" />{/if}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          class="w-full py-3 text-sm font-semibold rounded-xl text-white flex items-center justify-center gap-2 disable:opacity-60 transition-all"
          style="background: linear-gradient(135deg, #059669, #047857); box-shadow: 0 4px 14px rgba(16,185,129,0.35);"
          id="auth-submit-btn"
        >
          {#if isLoading}
            <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"></span>
            Processing...
          {:else}
            <Sparkles size={15} aria-hidden="true" />
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          {/if}
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center gap-3">
        <div class="flex-1 h-px" style="background:rgba(255,255,255,0.08)"></div>
        <span class="text-xs text-slate-dim">or</span>
        <div class="flex-1 h-px" style="background:rgba(255,255,255,0.08)"></div>
      </div>

      <!-- Google -->
      <button onclick={handleGoogle} disabled={isLoading}
        class="w-full py-3 text-sm font-semibold rounded-xl border border-white/10 text-slate hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 disable:opacity-60"
        style="background-color:#1f2937"
        id="google-signin-btn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <p class="text-[11px] text-slate-dim text-center leading-relaxed">
        By continuing, you agree to our <a href="/legal/terms" class="text-emerald hover:underline">Terms of Service</a> and
        <a href="/legal/privacy" class="text-emerald hover:underline">Privacy Policy</a>.
      </p>
    </div>
  </div>
</div>
