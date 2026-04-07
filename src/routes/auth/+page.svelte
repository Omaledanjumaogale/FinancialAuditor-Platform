<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    Mail, 
    Lock, 
    User, 
    Globe, 
    ArrowRight, 
    ShieldCheck, 
    Loader2,
    Eye,
    EyeOff
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  let mode = $state<'login' | 'signup' | 'forgot'>('login');
  let email = $state('');
  let password = $state('');
  let name = $state('');
  let company = $state('');
  let role = $state<'client' | 'auditor'>('client');
  let isLoading = $state(false);
  let showPassword = $state(false);
  let error = $state<string | null>(null);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isLoading = true;
    error = null;
    
    // Simulation for now - will connect to Firebase
    setTimeout(() => {
      isLoading = false;
      window.location.href = '/dashboard';
    }, 1500);
  }

  function toggleMode() {
    mode = mode === 'login' ? 'signup' : 'login';
    error = null;
  }
</script>

<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
  <!-- Decorative background -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full"></div>
  </div>

  <div class="w-full max-w-[480px] relative z-10" in:fly={{ y: 20, duration: 600 }}>
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-3 group mb-4">
        <div class="w-12 h-12 bg-linear-to-br from-emerald to-emerald-deep rounded-2xl flex items-center justify-center shadow-xl shadow-emerald/20 group-hover:scale-110 transition-transform">
          <ShieldCheck size={28} class="text-white" />
        </div>
      </a>
      <h1 class="text-3xl font-heading font-black text-white">
        {#if mode === 'login'}Welcome Back{:else if mode === 'signup'}Create Account{:else}Reset Password{/if}
      </h1>
      <p class="text-slate-dim mt-2">
        {#if mode === 'login'}Access your financial intelligence dashboard{:else if mode === 'signup'}Join 50,000+ Nigerian businesses today{:else}We'll send you a link to reset your password{/if}
      </p>
    </div>

    <div class="card-premium p-8 backdrop-blur-xl bg-navy-mid/50">
      {#if error}
        <div class="bg-danger/10 border border-danger/20 text-danger text-sm p-4 rounded-xl mb-6 flex items-center gap-3">
          <span>⚠️</span> {error}
        </div>
      {/if}

      <form onsubmit={handleSubmit} class="space-y-5">
        {#if mode === 'signup'}
          <div class="space-y-2">
            <label for="name" class="text-xs font-bold text-slate-dim uppercase tracking-widest ml-1">Full Name</label>
            <div class="relative group">
              <input 
                id="name"
                type="text" 
                bind:value={name}
                required
                placeholder="Adaeze Okonkwo" 
                class="w-full bg-navy border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="role" class="text-xs font-bold text-slate-dim uppercase tracking-widest ml-1">I am a...</label>
            <div class="grid grid-cols-2 gap-3">
              <button 
                type="button"
                class={cn(
                  "py-3 rounded-xl border text-sm font-bold transition-all",
                  role === 'client' ? "bg-emerald text-navy border-emerald" : "bg-navy text-slate-dim border-white/10 hover:border-white/20"
                )}
                onclick={() => role = 'client'}
              >
                🏢 Business Owner
              </button>
              <button 
                type="button"
                class={cn(
                  "py-3 rounded-xl border text-sm font-bold transition-all",
                  role === 'auditor' ? "bg-gold text-navy border-gold" : "bg-navy text-slate-dim border-white/10 hover:border-white/20"
                )}
                onclick={() => role = 'auditor'}
              >
                👨‍💼 Auditor
              </button>
            </div>
          </div>
        {/if}

        <div class="space-y-2">
          <label for="email" class="text-xs font-bold text-slate-dim uppercase tracking-widest ml-1">Email Address</label>
          <div class="relative group">
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={18} />
            <input 
              id="email"
              type="email" 
              bind:value={email}
              required
              placeholder="adaeze@company.ng" 
              class="w-full bg-navy border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
            />
          </div>
        </div>

        {#if mode !== 'forgot'}
          <div class="space-y-2">
            <div class="flex items-center justify-between ml-1">
              <label for="password" class="text-xs font-bold text-slate-dim uppercase tracking-widest">Password</label>
              {#if mode === 'login'}
                <button 
                  type="button" 
                  class="text-[10px] font-bold text-emerald hover:text-gold transition-colors uppercase tracking-widest"
                  onclick={() => mode = 'forgot'}
                >
                  Forgot?
                </button>
              {/if}
            </div>
            <div class="relative group">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={18} />
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                bind:value={password}
                required
                placeholder="••••••••" 
                class="w-full bg-navy border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
              />
              <button 
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-dim hover:text-white transition-colors"
                onclick={() => showPassword = !showPassword}
              >
                {#if showPassword}<EyeOff size={18} />{:else}<Eye size={18} />{/if}
              </button>
            </div>
          </div>
        {/if}

        <button 
          type="submit" 
          disabled={isLoading}
          class="w-full btn-primary py-4 text-lg font-black group relative overflow-hidden"
        >
          {#if isLoading}
            <Loader2 class="animate-spin mx-auto" size={24} />
          {:else}
            <span class="flex items-center justify-center gap-2">
              {#if mode === 'login'}
                Login to Dashboard 🚀
              {:else if mode === 'signup'}
                Create Free Account 🔥
              {:else}
                Reset Password 🛡️
              {/if}
              <ArrowRight class="group-hover:translate-x-1 transition-transform" size={20} />
            </span>
          {/if}
        </button>
      </form>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-white/10"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase tracking-widest">
          <span class="bg-navy-mid px-4 text-slate-dim font-bold">Or continue with</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <button class="flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all">
          <Globe size={18} class="text-emerald" />
          Google
        </button>
        <button class="flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all">
          <User size={18} />
          GitHub
        </button>
      </div>
    </div>

    <div class="text-center mt-8">
      <button 
        class="text-slate-dim hover:text-white transition-colors text-sm font-bold"
        onclick={toggleMode}
      >
        {#if mode === 'login'}
          Don't have an account? <span class="text-emerald">Sign up free</span>
        {:else}
          Already have an account? <span class="text-emerald">Log in here</span>
        {/if}
      </button>
    </div>
  </div>
</div>
