<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import {
    Menu, X, ArrowRight,
    LayoutDashboard, ShoppingBag, BarChart3,
    ShieldCheck, Mail, Globe,
    Sparkles, LogIn, BarChart2
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  let isMenuOpen = $state(false);
  let scrolled   = $state(false);

  const navLinks = [
    { name: 'Features',     href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing',      href: '#pricing' },
    { name: 'For Auditors', href: '#auditors' },
    { name: 'Services',     href: '#services' },
  ];

  const platformLinks = [
    { name: 'Dashboard',    href: '/dashboard',           icon: LayoutDashboard },
    { name: 'Marketplace',  href: '/marketplace',         icon: ShoppingBag },
    { name: 'Analytics',    href: '/dashboard/analytics', icon: BarChart3 },
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  $effect(() => {
    function onScroll() { scrolled = window.scrollY > 12; }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<!-- ════════════════ NAVBAR ════════════════ -->
<nav
  class={cn(
    'fixed top-0 left-0 right-0 z-[100] h-16 flex items-center transition-all duration-300',
    scrolled
      ? 'border-b shadow-lg'
      : ''
  )}
  style="background-color: rgba(10,22,40,0.92); backdrop-filter: blur(20px); border-color: rgba(255,255,255,0.08);"
  aria-label="Main navigation"
>
  <div class="container-page w-full flex items-center justify-between">

    <!-- LOGO -->
    <a
      href="/"
      class="flex items-center gap-3 shrink-0 group"
      onclick={closeMenu}
      aria-label="FinancialAuditor home"
    >
      <div
        class="w-9 h-9 bg-emerald rounded-xl flex items-center justify-center shadow-[0_4px_14px_-2px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-all duration-300 shrink-0"
        aria-hidden="true"
      >
        <BarChart2 size={18} class="text-white" />
      </div>
      <div>
        <div class="font-heading font-bold text-base text-white leading-none tracking-tight">
          Financial<span class="text-emerald">Auditor</span>
        </div>
        <div class="text-[10px] text-slate-dim tracking-widest font-medium uppercase leading-tight mt-0.5">
          AI · Nigeria
        </div>
      </div>
    </a>

    <!-- Desktop CTAs -->
    <div class="hidden md:flex items-center gap-3">
      <a href="/auth" class="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate rounded-xl hover:text-white hover:bg-white/5 transition-all">
        <LogIn size={15} aria-hidden="true" />
        Sign in
      </a>
      <a href="/auth" class="btn-primary flex items-center gap-1.5 py-2 px-5 text-sm rounded-xl shadow-[0_4px_14px_-2px_rgba(16,185,129,0.4)]">
        <Sparkles size={14} aria-hidden="true" />
        Get Started Free
      </a>
    </div>

    <!-- HAMBURGER BUTTON — always visible -->
    <button
      type="button"
      onclick={toggleMenu}
      class={cn(
        'flex items-center justify-center w-10 h-10 z-[120] rounded-xl transition-all duration-200 border',
        isMenuOpen
          ? 'bg-emerald/20 border-emerald/40 text-emerald'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate'
      )}
      aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isMenuOpen}
      aria-controls="mobile-menu"
    >
      {#if isMenuOpen}
        <X size={20} aria-hidden="true" />
      {:else}
        <Menu size={20} aria-hidden="true" />
      {/if}
    </button>
  </div>
</nav>

<!-- ════════════════ FULL SCREEN NAV PANEL ════════════════ -->
{#if isMenuOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105]"
    onclick={closeMenu}
    transition:fade={{ duration: 200 }}
    aria-hidden="true"
  ></div>

  <!-- Slide-in Panel -->
  <div
    id="mobile-menu"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
    class="fixed top-0 right-0 bottom-0 w-full max-w-xs z-[110] flex flex-col overflow-y-auto shadow-2xl"
    style="background-color: #0f2040; border-left: 1px solid rgba(255,255,255,0.08);"
    transition:fly={{ x: 320, duration: 350, opacity: 1 }}
  >
    <!-- Panel Header -->
    <div class="flex items-center justify-between p-5 shrink-0" style="border-bottom: 1px solid rgba(255,255,255,0.08)">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-emerald rounded-lg flex items-center justify-center" aria-hidden="true">
          <BarChart2 size={16} class="text-white" />
        </div>
        <span class="font-heading font-bold text-white">Menu</span>
      </div>
      <button
        type="button"
        onclick={closeMenu}
        class="p-2 rounded-xl text-slate hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Close menu"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </div>

    <!-- Menu Body -->
    <div class="flex-1 p-5 space-y-6">

      <!-- Navigation -->
      <section aria-labelledby="nav-section-label">
        <p id="nav-section-label" class="text-[10px] font-semibold text-slate-dim uppercase tracking-widest mb-3 px-1">
          Navigation
        </p>
        <nav class="space-y-1" aria-label="Site navigation">
          {#each navLinks as link (link.href)}
            <a
              href={link.href}
              onclick={closeMenu}
              class="flex items-center justify-between px-3 py-3 rounded-xl text-slate hover:bg-white/5 hover:text-white font-medium text-sm transition-all group"
            >
              {link.name}
              <ArrowRight
                size={14}
                class="text-slate-dim group-hover:text-emerald group-hover:translate-x-1 transition-all"
                aria-hidden="true"
              />
            </a>
          {/each}
        </nav>
      </section>

      <!-- Platform Links -->
      <section aria-labelledby="platform-section-label">
        <p id="platform-section-label" class="text-[10px] font-semibold text-slate-dim uppercase tracking-widest mb-3 px-1">
          Platform
        </p>
        <div class="space-y-2">
          {#each platformLinks as link (link.href)}
            {@const Icon = link.icon}
            <a
              href={link.href}
              onclick={closeMenu}
              class="flex items-center gap-3 px-3 py-3 rounded-xl text-slate hover:bg-emerald/10 hover:text-emerald font-medium text-sm transition-all group border border-transparent hover:border-emerald/20"
            >
              <div class="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald group-hover:text-white transition-all shrink-0">
                <Icon size={14} aria-hidden="true" />
              </div>
              {link.name}
            </a>
          {/each}
        </div>
      </section>

      <!-- Contact -->
      <section style="padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08);" aria-labelledby="contact-label">
        <p id="contact-label" class="text-[10px] font-semibold text-slate-dim uppercase tracking-widest mb-3 px-1">Contact</p>
        <div class="space-y-2">
          <div class="flex items-center gap-3 px-3 py-2 text-sm text-slate">
            <Mail size={14} class="text-emerald shrink-0" aria-hidden="true" />
            <span>support@financialauditor.ng</span>
          </div>
          <div class="flex items-center gap-3 px-3 py-2 text-sm text-slate">
            <Globe size={14} class="text-emerald shrink-0" aria-hidden="true" />
            <span>Lagos, Nigeria</span>
          </div>
        </div>
      </section>
    </div>

    <!-- Panel Footer CTAs -->
    <div class="p-5 shrink-0 space-y-2" style="border-top: 1px solid rgba(255,255,255,0.08)">
      <a href="/auth" onclick={closeMenu} class="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm">
        <Sparkles size={15} aria-hidden="true" />
        Start Free Trial
      </a>
      <a href="/auth" onclick={closeMenu} class="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-slate hover:text-white hover:bg-white/5 transition-all border border-white/10">
        <LogIn size={15} aria-hidden="true" />
        Sign In
      </a>
    </div>
  </div>
{/if}
