<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    Mail, 
    Lock, 
    User, 
    Globe, 
    ArrowRight, 
    ShieldCheck, 
    Loader2,
    Eye,
    EyeOff,
    Sparkles,
    CheckCircle2
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  let mode = $state<'login' | 'signup' | 'forgot'>('login');
  let email = $state('');
  let password = $state('');
  let name = $state('');
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

<div class="min-h-screen bg-background flex flex-col md:flex-row items-stretch overflow-hidden">
  <!-- Left Side: Brand & Visuals (Hidden on Mobile) -->
  <div class="hidden lg:flex flex-1 relative bg-primary items-center justify-center p-20 overflow-hidden">
    <div class="absolute inset-0 grid-pattern opacity-10 invert pointer-events-none"></div>
    <div class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full"></div>
    
    <div class="relative z-10 max-w-lg space-y-12">
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 group-hover:scale-105 transition-transform duration-300">
          <Sparkles size={32} class="text-primary" />
        </div>
        <div class="flex flex-col">
          <span class="text-white font-heading font-black text-3xl tracking-tighter leading-none">Financial<span class="text-white/70">Auditor</span></span>
          <span class="text-[10px] font-mono font-bold text-white/60 uppercase tracking-[0.2em] leading-tight mt-1">Enterprise Intelligence Platform</span>
        </div>
      </a>

      <div class="space-y-10">
        <h2 class="text-5xl font-heading font-black text-white leading-[1.05] tracking-tighter">
          Secure Access to Nigeria's <br/> <span class="text-white/60 italic">Smartest Audit Console.</span>
        </h2>
        
        <div class="space-y-6">
          <div class="flex items-center gap-4 text-white/90 font-medium">
            <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 size={14} />
            </div>
            FIRS & CAC Compliant Framework
          </div>
          <div class="flex items-center gap-4 text-white/90 font-medium">
            <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 size={14} />
            </div>
            Real-time Multi-Modal AI Extraction
          </div>
          <div class="flex items-center gap-4 text-white/90 font-medium">
            <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 size={14} />
            </div>
            Verified ICAN Auditor Network
          </div>
        </div>
      </div>

      <div class="pt-10 border-t border-white/10 flex items-center gap-6">
        <div class="flex -space-x-3">
          {#each Array(4) as _, i}
            <div class="w-10 h-10 rounded-full border-2 border-primary bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">
              {['AO', 'JD', 'MB', 'SK'][i]}
            </div>
          {/each}
        </div>
        <div class="text-sm text-white/60 font-medium">
          Joined by <span class="text-white font-black">50,000+</span> enterprises
        </div>
      </div>
    </div>
  </div>

  <!-- Right Side: Form -->
  <div class="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 relative bg-background">
    <div class="w-full max-w-[440px] space-y-10" in:fly={{ y: 20, duration: 600 }}>
      <!-- Mobile Logo -->
      <div class="lg:hidden text-center mb-8">
        <a href="/" class="inline-flex items-center gap-2.5">
          <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Sparkles size={22} class="text-white" />
          </div>
          <span class="text-foreground font-heading font-black text-2xl tracking-tighter">FinancialAuditor</span>
        </a>
      </div>

      <div class="space-y-3 text-center md:text-left">
        <h1 class="text-3xl font-heading font-black text-foreground tracking-tight">
          {#if mode === 'login'}Welcome Back 👋{:else if mode === 'signup'}Create Enterprise Account 🔥{:else}Reset Your Password 🛡️{/if}
        </h1>
        <p class="text-muted-foreground font-medium">
          {#if mode === 'login'}Sign in to access your intelligence console{:else if mode === 'signup'}Start your 30-day free enterprise trial today{:else}We'll send a secure link to your email address{/if}
        </p>
      </div>

      <div class="space-y-6">
        {#if error}
          <div class="bg-destructive/5 border border-destructive/10 text-destructive text-sm p-4 rounded-2xl flex items-center gap-3 font-bold" in:slide>
            <span>⚠️</span> {error}
          </div>
        {/if}

        <form onsubmit={handleSubmit} class="space-y-5">
          {#if mode === 'signup'}
            <div class="space-y-2">
              <label for="name" class="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Legal Name</label>
              <div class="relative group">
                <User class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  id="name"
                  type="text" 
                  bind:value={name}
                  required
                  placeholder="Adaeze Okonkwo" 
                  class="w-full bg-muted border border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all font-medium"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label for="role" class="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Primary Platform Role</label>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  class={cn(
                    "py-3 rounded-2xl border text-xs font-black transition-all duration-300",
                    role === 'client' ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  )}
                  onclick={() => role = 'client'}
                >
                  🏢 Business Owner
                </button>
                <button 
                  type="button"
                  class={cn(
                    "py-3 rounded-2xl border text-xs font-black transition-all duration-300",
                    role === 'auditor' ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  )}
                  onclick={() => role = 'auditor'}
                >
                  👨‍💼 Certified Auditor
                </button>
              </div>
            </div>
          {/if}

          <div class="space-y-2">
            <label for="email" class="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Enterprise Email</label>
            <div class="relative group">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
              <input 
                id="email"
                type="email" 
                bind:value={email}
                required
                placeholder="ceo@company.ng" 
                class="w-full bg-muted border border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all font-medium"
              />
            </div>
          </div>

          {#if mode !== 'forgot'}
            <div class="space-y-2">
              <div class="flex items-center justify-between ml-1">
                <label for="password" class="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Access Key</label>
                {#if mode === 'login'}
                  <button 
                    type="button" 
                    class="text-[10px] font-black text-primary hover:text-primary/70 transition-colors uppercase tracking-widest"
                    onclick={() => mode = 'forgot'}
                  >
                    Forgot Key?
                  </button>
                {/if}
              </div>
              <div class="relative group">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  bind:value={password}
                  required
                  placeholder="••••••••••••" 
                  class="w-full bg-muted border border-transparent rounded-2xl py-3.5 pl-12 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all font-medium"
                />
                <button 
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
            class="w-full btn-primary py-4 text-lg font-black group relative overflow-hidden shadow-xl shadow-primary/20"
          >
            {#if isLoading}
              <Loader2 class="animate-spin mx-auto" size={24} />
            {:else}
              <span class="flex items-center justify-center gap-2.5">
                {#if mode === 'login'}
                  Sign In to Console
                {:else if mode === 'signup'}
                  Deploy Account
                {:else}
                  Send Reset Link
                {/if}
                <ArrowRight class="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            {/if}
          </button>
        </form>

        <div class="relative my-10">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border"></div>
          </div>
          <div class="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
            <span class="bg-background px-6 text-muted-foreground">Or Connect with</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-3 py-3.5 px-4 bg-muted border border-transparent rounded-2xl text-foreground font-bold hover:bg-background hover:border-border transition-all shadow-sm">
            <Globe size={18} class="text-primary" />
            Google Workspace
          </button>
          <button class="flex items-center justify-center gap-3 py-3.5 px-4 bg-muted border border-transparent rounded-2xl text-foreground font-bold hover:bg-background hover:border-border transition-all shadow-sm">
            <User size={18} />
            Microsoft 365
          </button>
        </div>
      </div>

      <div class="text-center">
        <button 
          class="text-muted-foreground hover:text-foreground transition-colors text-sm font-bold"
          onclick={toggleMode}
        >
          {#if mode === 'login'}
            New to FinancialAuditor? <span class="text-primary font-black">Deploy Account Free</span>
          {:else}
            Existing enterprise? <span class="text-primary font-black">Sign in to Console</span>
          {/if}
        </button>
      </div>
    </div>

    <!-- Footer Copyright -->
    <div class="absolute bottom-8 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
      © 2026 FinancialAuditor Enterprise · Nigeria
    </div>
  </div>
</div>

<style>
  :global(.grid-pattern) {
    background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0);
    background-size: 24px 24px;
  }
</style>
