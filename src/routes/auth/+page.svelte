<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    Mail, Lock, User, ArrowRight, Sparkles, 
    ShieldCheck, CheckCircle2, ChevronLeft
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  let mode = $state<'login' | 'signup' | 'forgot'>('login');
  let email = $state('');
  let password = $state('');
  let name = $state('');
  let loading = $state(false);

  function toggleMode() {
    if (mode === 'login') mode = 'signup';
    else mode = 'login';
  }
</script>

<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
  <!-- Auth Background -->
  <div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.15)_0%,transparent_70%)]"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
  </div>

  <div class="w-full max-w-[1100px] grid lg:grid-cols-2 gap-12 items-center relative z-10">
    <!-- Left Side: Branding & Trust -->
    <div class="hidden lg:flex flex-col space-y-10" in:fly={{ x: -50, duration: 800 }}>
      <a href="/" class="flex items-center gap-3 group decoration-none">
        <div class="w-12 h-12 bg-gradient-to-br from-emerald to-emerald-deep rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <div class="flex flex-col">
          <span class="text-white font-heading font-black text-2xl tracking-tighter leading-none">Financial<span class="text-emerald">Auditor</span></span>
          <span class="text-xs font-mono font-bold text-slate-dim uppercase tracking-widest mt-1">Enterprise Intelligence</span>
        </div>
      </a>

      <div class="space-y-6">
        <h2 class="text-5xl font-heading font-black text-white leading-[1.1] tracking-tighter">
          The Future of <span class="grad-text">Nigerian</span> <br/> Finance is AI-First.
        </h2>
        <p class="text-lg text-slate leading-relaxed max-w-md font-medium">
          Join 50,000+ enterprises automating their audits, compliance, and growth strategies with the world's most advanced financial engine.
        </p>
      </div>

      <div class="space-y-5">
        <div class="flex items-center gap-4 group">
          <div class="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald group-hover:bg-emerald group-hover:text-white transition-all duration-300">
            <ShieldCheck size={20} />
          </div>
          <span class="text-slate font-bold">Bank-Grade 256-bit Encryption</span>
        </div>
        <div class="flex items-center gap-4 group">
          <div class="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald group-hover:bg-emerald group-hover:text-white transition-all duration-300">
            <CheckCircle2 size={20} />
          </div>
          <span class="text-slate font-bold">FIRS & CAC Compliant Framework</span>
        </div>
      </div>
    </div>

    <!-- Right Side: Auth Form -->
    <div class="w-full max-w-[480px] mx-auto" in:fly={{ x: 50, duration: 800 }}>
      <div class="card-premium p-8 md:p-10 bg-surface/80 backdrop-blur-xl border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
          <Sparkles size={120} class="text-emerald" />
        </div>

        <div class="relative z-10">
          <div class="mb-10 space-y-2">
            <h1 class="text-3xl font-heading font-black text-white tracking-tight">
              {#if mode === 'login'}Welcome Back{:else if mode === 'signup'}Create Account{:else}Reset Password{/if}
            </h1>
            <p class="text-slate-dim font-medium">
              {#if mode === 'login'}Enter your credentials to access the console.{:else if mode === 'signup'}Get started with your 30-day free trial.{:else}We'll send you recovery instructions.{/if}
            </p>
          </div>

          <form class="space-y-6">
            {#if mode === 'signup'}
              <div class="space-y-1.5" in:slide>
                <label for="name" class="form-label">Full Name</label>
                <div class="relative group">
                  <User class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={18} />
                  <input type="text" id="name" bind:value={name} placeholder="Adaeze Okonkwo" class="form-input pl-12" />
                </div>
              </div>
            {/if}

            <div class="space-y-1.5">
              <label for="email" class="form-label">Enterprise Email</label>
              <div class="relative group">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={18} />
                <input type="email" id="email" bind:value={email} placeholder="adaeze@enterprise.ng" class="form-input pl-12" />
              </div>
            </div>

            {#if mode !== 'forgot'}
              <div class="space-y-1.5" in:slide>
                <div class="flex items-center justify-between">
                  <label for="password" class="form-label">Password</label>
                  {#if mode === 'login'}
                    <button type="button" onclick={() => mode = 'forgot'} class="text-[10px] font-black text-emerald uppercase tracking-widest hover:underline">Forgot?</button>
                  {/if}
                </div>
                <div class="relative group">
                  <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={18} />
                  <input type="password" id="password" bind:value={password} placeholder="••••••••" class="form-input pl-12" />
                </div>
              </div>
            {/if}

            <button type="submit" class="btn-primary w-full py-4 text-base shadow-xl shadow-emerald/20 group">
              {#if mode === 'login'}Sign In to Console{:else if mode === 'signup'}Start Free Trial{:else}Send Reset Link{/if}
              <ArrowRight size={18} class="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div class="mt-10 pt-8 border-t border-white/5 space-y-6">
            <div class="relative flex items-center justify-center">
              <span class="absolute px-4 bg-surface text-[10px] font-black text-slate-dim uppercase tracking-[0.3em]">Or Continue With</span>
              <div class="w-full h-[1px] bg-white/5"></div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button class="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all font-bold text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button class="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all font-bold text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
            </div>

            <p class="text-center text-slate-dim font-medium">
              {#if mode === 'login'}
                Don't have an account? <button onclick={toggleMode} class="text-emerald font-bold hover:underline">Sign up for free</button>
              {:else if mode === 'signup'}
                Already have an account? <button onclick={toggleMode} class="text-emerald font-bold hover:underline">Sign in instead</button>
              {:else}
                Remember your password? <button onclick={() => mode = 'login'} class="text-emerald font-bold hover:underline">Back to login</button>
              {/if}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
