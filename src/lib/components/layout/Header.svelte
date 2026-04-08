<script lang="ts">
  import { fade, slide, fly } from 'svelte/transition';
  import { 
    X, Bell, Search, User, LogOut, 
    LayoutDashboard, ShoppingBag, ShieldCheck, 
    BarChart3, BookOpen, Settings, Home, 
    CreditCard, MessageSquare, History,
    ChevronRight, Sparkles, Globe, Mail,
    HelpCircle
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { page } from '$app/state';

  let isMenuOpen = $state(false);

  const navLinks = [
    { name: 'Features', href: '#features', emoji: '✨' },
    { name: 'How It Works', href: '#how-it-works', emoji: '🛠️' },
    { name: 'Pricing', href: '#pricing', emoji: '💰' },
    { name: 'For Auditors', href: '#auditors', emoji: '👨‍💼' },
    { name: 'Services', href: '#services', emoji: '🏢' },
  ];

  const dashboardLinks = [
    { name: '📊 Console', href: '/dashboard', emoji: '📊' },
    { name: '🤝 Marketplace', href: '/marketplace', emoji: '🤝' },
    { name: '🧠 Intelligence', href: '/dashboard/analytics', emoji: '🧠' },
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    document.body.style.overflow = '';
  }
</script>

<nav class="glass-nav fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 h-[68px] flex items-center">
  <div class="container-custom w-full flex items-center justify-between">
    <!-- LOGO -->
    <a href="/" class="flex items-center gap-2.5 group shrink-0 decoration-none" onclick={closeMenu}>
      <div class="w-10 h-10 bg-gradient-to-br from-emerald to-emerald-deep rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
      </div>
      <div class="flex flex-col">
        <div class="font-heading font-extrabold text-lg text-white leading-none">Financial<span class="text-emerald">Auditor</span></div>
        <div class="text-[10px] text-slate-dim font-mono tracking-widest leading-tight mt-0.5 uppercase">AI-POWERED · NIGERIA</div>
      </div>
    </a>

    <!-- RIGHT SIDE: HAMBURGER & CTA -->
    <div class="flex items-center gap-4">
      <div class="hidden md:flex items-center gap-3">
        <a href="/auth" class="btn-primary py-2 px-5 text-sm gap-2">
          <span class="text-base">🚀</span>
          Get Started
        </a>
      </div>

      <!-- HAMBURGER BUTTON (Right Hand Side) -->
      <button 
        onclick={toggleMenu} 
        class="flex flex-col gap-1.5 p-3 z-[120] bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group"
        aria-label="Toggle menu"
      >
        <span class={cn("block w-6 h-[2px] bg-white rounded-full transition-all duration-500", isMenuOpen && "rotate-45 translate-y-[8px] bg-emerald")}></span>
        <span class={cn("block w-4 h-[2px] bg-emerald rounded-full transition-all duration-500 ml-auto group-hover:w-6", isMenuOpen && "opacity-0")}></span>
        <span class={cn("block w-6 h-[2px] bg-white rounded-full transition-all duration-500", isMenuOpen && "-rotate-45 -translate-y-[8px] bg-emerald")}></span>
      </button>
    </div>
  </div>
</nav>

<!-- FULL SCREEN MENU OVERLAY -->
{#if isMenuOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="fixed inset-0 bg-navy/95 backdrop-blur-2xl z-[110] flex flex-col pt-[100px] px-6 md:px-12 pb-12 overflow-y-auto"
    transition:fade={{ duration: 300 }}
    onclick={(e) => e.target === e.currentTarget && closeMenu()}
  >
    <div class="container-custom grid lg:grid-cols-2 gap-16">
      <!-- Main Navigation -->
      <div class="space-y-10" in:fly={{ y: 40, delay: 100, duration: 600 }}>
        <div>
          <h4 class="text-[10px] font-black text-emerald uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span class="w-8 h-px bg-emerald/30"></span>
            Main Navigation
          </h4>
          <div class="flex flex-col gap-4">
            {#each navLinks as link}
              <a 
                href={link.href} 
                onclick={closeMenu}
                class="text-3xl md:text-5xl font-heading font-black text-white hover:text-emerald transition-all duration-300 flex items-center gap-4 group"
              >
                <span class="text-2xl md:text-4xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">{link.emoji}</span>
                {link.name}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <!-- Secondary Links & Dashboard -->
      <div class="space-y-12" in:fly={{ y: 40, delay: 200, duration: 600 }}>
        <!-- Platform Services -->
        <div>
          <h4 class="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span class="w-8 h-px bg-gold/30"></span>
            Platform Services
          </h4>
          <div class="grid sm:grid-cols-2 gap-4">
            {#each dashboardLinks as link}
              <a 
                href={link.href} 
                onclick={closeMenu}
                class="p-6 card-premium bg-white/5 hover:bg-emerald/5 border-white/5 hover:border-emerald/20 flex flex-col gap-3 group transition-all duration-300"
              >
                <span class="text-3xl group-hover:scale-110 transition-transform duration-500">{link.emoji}</span>
                <span class="font-heading font-bold text-white group-hover:text-emerald">{link.name}</span>
              </a>
            {/each}
          </div>
        </div>

        <!-- Support & Contact -->
        <div class="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
          <div class="space-y-4">
            <div class="flex items-center gap-3 text-slate hover:text-white transition-colors cursor-pointer">
              <Mail size={18} class="text-emerald" />
              <span class="text-sm font-medium">support@financialauditor.ng</span>
            </div>
            <div class="flex items-center gap-3 text-slate hover:text-white transition-colors cursor-pointer">
              <Globe size={18} class="text-emerald" />
              <span class="text-sm font-medium">Lagos, Nigeria</span>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <a href="/auth" onclick={closeMenu} class="btn-primary w-full justify-center py-4 text-lg">
              Start Free Trial
            </a>
            <a href="/auth" onclick={closeMenu} class="btn-secondary w-full justify-center py-4 text-lg">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Copyright -->
    <div class="mt-auto pt-16 text-center text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em]">
      © 2025 FinancialAuditor Nigeria · Enterprise Grade Intelligence
    </div>
  </div>
{/if}

<style>
  .glass-nav {
    background: rgba(10, 22, 40, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 200, 150, 0.12);
  }
</style>
