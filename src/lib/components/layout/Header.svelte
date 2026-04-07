<script lang="ts">
  import { fade, slide, fly } from 'svelte/transition';
  import { Menu, X, Bell, Search, User, LogOut, LayoutDashboard, ShoppingBag, ShieldCheck, BarChart3, BookOpen, Settings, Home, CreditCard, MessageSquare, History } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { page } from '$app/state';

  let isMenuOpen = $state(false);
  let isNotificationsOpen = $state(false);

  // Enterprise Emoji-based Navigation Links
  const navLinks = [
    { name: '🏠 Home', icon: Home, href: '/' },
    { name: '📊 Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: '🛒 Marketplace', icon: ShoppingBag, href: '/marketplace' },
    { name: '🤖 AI Audit', icon: ShieldCheck, href: '/dashboard/audit' },
    { name: '📈 Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    { name: '📚 Ledger', icon: BookOpen, href: '/dashboard/ledger' },
    { name: '💳 Payments', icon: CreditCard, href: '/dashboard/payments' },
    { name: '💬 Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { name: '📜 Logs', icon: History, href: '/dashboard/logs' },
    { name: '🛡️ Admin', icon: ShieldCheck, href: '/admin' },
    { name: '👤 Profile', icon: Settings, href: '/dashboard/profile' },
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

<header class="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
  <div class="h-[68px] glass-nav flex items-center justify-between px-4 md:px-8">
    
    <!-- Logo -->
    <a href="/" class="flex items-center gap-3 group shrink-0">
      <div class="w-10 h-10 bg-linear-to-br from-emerald to-emerald-deep rounded-xl flex items-center justify-center shadow-lg shadow-emerald/20 group-hover:scale-105 transition-transform">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      </div>
      <div class="flex flex-col">
        <span class="text-white font-bold text-lg leading-tight tracking-tight font-heading">Financial<span class="text-emerald">Auditor</span></span>
        <span class="text-slate-dim text-[0.6rem] font-mono uppercase tracking-widest">AI-POWERED · NIGERIA</span>
      </div>
    </a>

    <!-- Right Side Actions -->
    <div class="flex items-center gap-4">
      <!-- Search (Hidden on Mobile) -->
      <div class="hidden md:flex relative group">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={16} />
        <input 
          type="text" 
          placeholder="Search..." 
          class="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all w-48 lg:w-64"
        />
      </div>

      <!-- Notifications -->
      <button 
        class="relative p-2 text-slate-dim hover:text-white hover:bg-white/5 rounded-lg transition-all"
        onclick={() => isNotificationsOpen = !isNotificationsOpen}
        aria-label="Notifications"
      >
        <Bell size={20} />
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-navy"></span>
      </button>

      <!-- Profile (Hidden on Mobile) -->
      <button class="hidden md:flex items-center gap-2 p-1 pl-2 hover:bg-white/5 rounded-full border border-white/10 transition-all">
        <span class="text-xs font-semibold text-slate">Adaeze O.</span>
        <div class="w-8 h-8 rounded-full bg-emerald/10 text-emerald flex items-center justify-center font-bold text-xs border border-emerald/20">
          AO
        </div>
      </button>

      <!-- Hamburger Menu Button (The only navigation trigger) -->
      <button 
        class="p-2 text-white hover:bg-white/5 rounded-lg transition-all z-[110]"
        onclick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <div class="flex flex-col gap-1.5">
          <span class={cn("block w-6 h-0.5 bg-white rounded-full transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")}></span>
          <span class={cn("block w-4 h-0.5 bg-emerald rounded-full transition-all duration-300", isMenuOpen && "opacity-0")}></span>
          <span class={cn("block w-6 h-0.5 bg-white rounded-full transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2")}></span>
        </div>
      </button>
    </div>
  </div>
</header>

<!-- Slide-in Navigation Drawer (Right Side) -->
{#if isMenuOpen}
  <div 
    class="fixed inset-0 bg-navy/80 backdrop-blur-md z-[105]"
    transition:fade={{ duration: 300 }}
    onclick={closeMenu}
    onkeydown={(e) => e.key === 'Escape' && closeMenu()}
    role="button"
    tabindex="0"
    aria-label="Close menu"
  ></div>

  <div 
    class="fixed top-0 right-0 h-full w-full max-w-[320px] bg-navy-mid border-l border-white/10 z-[106] shadow-2xl flex flex-col"
    transition:fly={{ x: 320, duration: 400, opacity: 1 }}
  >
    <div class="h-[68px] flex items-center justify-between px-6 border-b border-white/10">
      <span class="font-heading font-bold text-white text-lg">Menu</span>
      <button onclick={closeMenu} class="p-2 text-slate-dim hover:text-white transition-colors">
        <X size={24} />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-6 space-y-2">
      <div class="text-[0.65rem] font-bold text-slate-dim uppercase tracking-[0.2em] mb-4">Main Navigation</div>
      {#each navLinks as link}
        <a 
          href={link.href} 
          class={cn(
            "flex items-center justify-between p-3 rounded-xl transition-all group border border-transparent",
            page.url.pathname === link.href 
              ? "bg-emerald/10 text-white border-emerald/20" 
              : "text-slate hover:bg-white/5 hover:text-white"
          )}
          onclick={closeMenu}
        >
          <span class="flex items-center gap-3 font-medium">
            <span class="text-lg">{link.name.split(' ')[0]}</span>
            <span>{link.name.split(' ').slice(1).join(' ')}</span>
          </span>
          <link.icon size={16} class={cn("opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0", page.url.pathname === link.href && "opacity-100 translate-x-0")} />
        </a>
      {/each}
    </nav>

    <div class="p-6 border-t border-white/10 space-y-4">
      <div class="bg-navy rounded-2xl p-4 border border-white/5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-emerald/20 text-emerald flex items-center justify-center font-bold">AO</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-bold text-white truncate">Adaeze Okonkwo</div>
            <div class="text-xs text-slate-dim">Pro Member 💎</div>
          </div>
        </div>
        <button class="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-danger/10 hover:text-danger rounded-xl text-sm font-medium transition-all border border-white/10 hover:border-danger/20">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Extra responsive scaling for the drawer */
  @media (max-width: 480px) {
    /* Drawer width adjustment for very small screens */
    :global(.fixed.top-0.right-0.h-full) {
      max-width: 100% !important;
    }
  }
</style>
