<script lang="ts">
  import { fade, slide, fly } from 'svelte/transition';
  import { 
    Menu, X, Bell, Search, User, LogOut, 
    LayoutDashboard, ShoppingBag, ShieldCheck, 
    BarChart3, BookOpen, Settings, Home, 
    CreditCard, MessageSquare, History,
    ChevronRight, Sparkles
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { page } from '$app/state';

  let isMenuOpen = $state(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'For Auditors', href: '#auditors' },
    { name: 'Services', href: '#services' },
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

<nav class="glass-nav fixed top-0 left-0 right-0 z-50 px-4 md:px-8 h-[68px] flex items-center">
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

    <!-- DESKTOP NAV -->
    <div class="hidden md:flex items-center gap-8">
      {#each navLinks as link}
        <a href={link.href} class="nav-link text-sm font-medium text-slate-dim hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald after:transition-all hover:after:w-full">{link.name}</a>
      {/each}
    </div>

    <!-- DESKTOP CTA -->
    <div class="hidden md:flex items-center gap-3">
      <a href="/auth" class="btn-ghost text-sm font-semibold px-4">Sign In</a>
      <a href="/auth" class="btn-primary py-2 px-5 text-sm gap-2">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        Start Free Trial
      </a>
    </div>

    <!-- HAMBURGER -->
    <button onclick={toggleMenu} class="md:hidden flex flex-col gap-1.5 p-2 z-[110]" aria-label="Toggle menu">
      <span class={cn("block w-6 h-[2px] bg-white rounded-full transition-all duration-300", isMenuOpen && "rotate-45 translate-y-[8px]")}></span>
      <span class={cn("block w-4 h-[2px] bg-emerald rounded-full transition-all duration-300 ml-auto", isMenuOpen && "opacity-0")}></span>
      <span class={cn("block w-6 h-[2px] bg-white rounded-full transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-[8px]")}></span>
    </button>
  </div>
</nav>

<!-- MOBILE MENU -->
{#if isMenuOpen}
  <div 
    class="fixed inset-0 bg-navy/98 backdrop-blur-xl z-[100] flex flex-col p-8 gap-8"
    transition:fly={{ x: 300, duration: 400 }}
  >
    <div class="flex items-center justify-between">
      <div class="font-heading font-extrabold text-xl text-white">Menu</div>
      <button onclick={toggleMenu} class="text-slate-dim">
        <X size={24} />
      </button>
    </div>
    <div class="flex flex-col gap-6 mt-4">
      {#each navLinks as link}
        <a href={link.href} onclick={toggleMenu} class="text-white text-2xl font-heading font-semibold border-b border-white/10 pb-4">{link.name}</a>
      {/each}
    </div>
    <div class="mt-auto flex flex-col gap-4">
      <a href="/auth" onclick={toggleMenu} class="btn-secondary w-full py-4 text-lg">Sign In</a>
      <a href="/auth" onclick={toggleMenu} class="btn-primary w-full py-4 text-lg">Start Free Trial</a>
    </div>
  </div>
{/if}

<style>
  @media (max-width: 480px) {
    :global(.fixed.top-0.right-0.h-full) {
      max-width: 100% !important;
    }
  }
</style>
