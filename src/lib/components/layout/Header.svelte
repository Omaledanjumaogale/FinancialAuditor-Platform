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
  let isNotificationsOpen = $state(false);

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
    { name: '🛡️ Admin Hub', icon: ShieldCheck, href: '/admin' },
    { name: '👤 Settings', icon: Settings, href: '/dashboard/profile' },
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  function closeMenu() {
    isMenuOpen = false;
    document.body.style.overflow = '';
  }
</script>

<header class="glass-nav sticky top-0 left-0 right-0 w-full h-[72px] flex items-center justify-between px-4 md:px-8 transition-all duration-300">
  <!-- Logo Section -->
  <a href="/" class="flex items-center gap-2.5 group shrink-0" onclick={closeMenu}>
    <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
      <Sparkles size={22} class="text-white" />
    </div>
    <div class="flex flex-col">
      <span class="text-foreground font-heading font-black text-xl tracking-tighter leading-none">Financial<span class="text-primary">Auditor</span></span>
      <span class="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.2em] leading-tight mt-0.5">Enterprise Intelligence</span>
    </div>
  </a>

  <!-- Desktop Desktop Navigation (Actions Only) -->
  <div class="flex items-center gap-3 md:gap-5">
    <!-- Desktop Search -->
    <div class="hidden lg:flex relative group">
      <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
      <input 
        type="text" 
        placeholder="Search enterprise records..." 
        class="bg-muted border border-transparent rounded-full py-2.5 pl-11 pr-5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all w-64 xl:w-80"
      />
    </div>

    <!-- Quick Actions -->
    <div class="flex items-center gap-1.5 md:gap-3">
      <button 
        class="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all duration-200"
        onclick={() => isNotificationsOpen = !isNotificationsOpen}
        aria-label="Notifications"
      >
        <Bell size={20} />
        <span class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-destructive border-2 border-background animate-pulse-soft"></span>
      </button>

      <!-- Profile (Hidden on Mobile) -->
      <button class="hidden sm:flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 hover:bg-muted rounded-full border border-transparent hover:border-border transition-all duration-200 group">
        <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
          AO
        </div>
        <div class="flex flex-col items-start">
          <span class="text-xs font-bold text-foreground leading-none">Adaeze O.</span>
          <span class="text-[10px] text-muted-foreground leading-none mt-1">Pro Plan</span>
        </div>
      </button>

      <!-- Hamburger Menu Button -->
      <button 
        class="p-2.5 text-foreground hover:bg-muted rounded-xl transition-all duration-200 z-[110]"
        onclick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div class="flex flex-col gap-1.5">
          <span class={cn("block w-6 h-0.5 bg-current rounded-full transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")}></span>
          <span class={cn("block w-4 h-0.5 bg-primary rounded-full transition-all duration-300 ml-auto", isMenuOpen && "opacity-0")}></span>
          <span class={cn("block w-6 h-0.5 bg-current rounded-full transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2")}></span>
        </div>
      </button>
    </div>
  </div>
</header>

<!-- Slide-in Navigation Drawer (Right Side) -->
{#if isMenuOpen}
  <div 
    class="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[105]"
    transition:fade={{ duration: 300 }}
    onclick={closeMenu}
    onkeydown={(e) => e.key === 'Escape' && closeMenu()}
    role="button"
    tabindex="0"
    aria-label="Close menu overlay"
  ></div>

  <div 
    class="fixed top-0 right-0 h-full w-full max-w-[360px] bg-background border-l border-border z-[106] shadow-2xl flex flex-col"
    transition:fly={{ x: 360, duration: 400, opacity: 1, easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }}
  >
    <div class="h-[72px] flex items-center justify-between px-6 border-b border-border">
      <span class="font-heading font-black text-xl tracking-tight">Navigation</span>
      <button onclick={closeMenu} class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
        <X size={22} />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
      <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-3">Enterprise Suite</div>
      {#each navLinks as link}
        <a 
          href={link.href} 
          class={cn(
            "flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 group border border-transparent",
            page.url.pathname === link.href 
              ? "bg-primary/5 text-primary border-primary/10 shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          onclick={closeMenu}
        >
          <span class="flex items-center gap-3.5 font-semibold text-sm">
            <span class="text-xl group-hover:scale-110 transition-transform">{link.name.split(' ')[0]}</span>
            <span>{link.name.split(' ').slice(1).join(' ')}</span>
          </span>
          <ChevronRight size={14} class={cn("opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0", page.url.pathname === link.href && "opacity-100 translate-x-0")} />
        </a>
      {/each}
    </nav>

    <!-- Drawer Footer Profile -->
    <div class="p-6 border-t border-border bg-muted/30">
      <div class="bg-background rounded-2xl p-4 border border-border shadow-sm">
        <div class="flex items-center gap-3.5 mb-4">
          <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg border border-primary/20">AO</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-black text-foreground truncate">Adaeze Okonkwo</div>
            <div class="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
              Pro Member <Sparkles size={10} />
            </div>
          </div>
        </div>
        <button class="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-muted hover:bg-destructive/5 hover:text-destructive rounded-xl text-sm font-bold transition-all duration-200 border border-transparent hover:border-destructive/20">
          <LogOut size={18} />
          Sign Out of Platform
        </button>
      </div>
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
