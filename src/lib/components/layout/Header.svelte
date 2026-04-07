<script lang="ts">
  import { fade, slide, fly } from 'svelte/transition';
  import { Menu, X, Bell, Search, User, LogOut, LayoutDashboard, ShoppingBag, ShieldCheck, BarChart3, BookOpen, Settings } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { page } from '$app/state';

  let isMenuOpen = $state(false);
  let isNotificationsOpen = $state(false);

  const navLinks = [
    { name: '🏠 Home', icon: LayoutDashboard, href: '/' },
    { name: '📊 Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: '🛒 Marketplace', icon: ShoppingBag, href: '/marketplace' },
    { name: '🤖 AI Audit', icon: ShieldCheck, href: '/dashboard/audit' },
    { name: '📈 Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    { name: '📚 Ledger', icon: BookOpen, href: '/dashboard/ledger' },
    { name: '🛡️ Admin', icon: ShieldCheck, href: '/admin' },
    { name: '👤 Profile', icon: Settings, href: '/dashboard/profile' },
    { name: '🚪 Logout', icon: LogOut, href: '/auth/logout', primary: true }
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

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <div class="h-16 flex items-center justify-between px-4 md:px-6 md:pl-72 lg:pr-10 bg-white/80 backdrop-blur-md border-b border-surface-200">
    
    <!-- Mobile/Tablet Logo (Visible when Sidebar is hidden) -->
    <a href="/" class="flex md:hidden items-center gap-2 group">
      <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-brand-600/20 group-hover:scale-105 transition-transform">
        FA
      </div>
      <span class="text-surface-900 font-bold text-base leading-tight tracking-tight font-heading">FinancialAuditor</span>
    </a>

    <!-- Desktop Breadcrumbs/Search Placeholder -->
    <div class="hidden md:flex items-center gap-4 flex-1">
      <div class="relative max-w-md w-full">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={16} />
        <input 
          type="text" 
          placeholder="Search audits, documents..." 
          class="w-full bg-surface-50 border border-surface-200 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <!-- Notifications -->
      <button 
        class="relative p-2 text-surface-500 hover:text-surface-900 hover:bg-surface-50 rounded-lg transition-all"
        onclick={() => isNotificationsOpen = !isNotificationsOpen}
        aria-label="Notifications"
      >
        <Bell size={20} />
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-white"></span>
      </button>

      <!-- Desktop Profile Dropdown (Simplified) -->
      <button class="hidden md:flex items-center gap-2 p-1 pl-2 hover:bg-surface-50 rounded-full border border-surface-200 transition-all">
        <span class="text-xs font-semibold text-surface-700">Adaeze O.</span>
        <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
          AO
        </div>
      </button>

      <!-- Hamburger Menu Button -->
      <button 
        class="md:hidden p-2 text-surface-500 hover:text-surface-900 hover:bg-surface-50 rounded-lg transition-all z-[60]"
        onclick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {#if isMenuOpen}
          <X size={24} />
        {:else}
          <Menu size={24} />
        {/if}
      </button>
    </div>
  </div>
</header>

<!-- Slide-in Mobile Menu Drawer -->
{#if isMenuOpen}
  <div 
    class="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-50 md:hidden"
    transition:fade={{ duration: 300 }}
    onclick={closeMenu}
    aria-hidden="true"
  ></div>
  
  <div 
    class="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[60] md:hidden shadow-2xl flex flex-col"
    transition:fly={{ x: 280, duration: 400, opacity: 1 }}
  >
    <div class="h-16 flex items-center justify-between px-6 border-b border-surface-100">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-lg font-bold">
          FA
        </div>
        <span class="text-surface-900 font-bold text-sm tracking-tight font-heading">FinancialAuditor</span>
      </div>
      <button 
        class="p-2 -mr-2 text-surface-500 hover:text-surface-900 hover:bg-surface-50 rounded-lg transition-all"
        onclick={closeMenu}
        aria-label="Close Menu"
      >
        <X size={20} />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto py-6 px-4">
      <div class="text-[0.65rem] font-bold text-surface-400 uppercase tracking-widest px-4 mb-4">Navigation</div>
      
      <nav class="flex flex-col gap-1">
        {#each navLinks as link, i}
          <a 
            href={link.href}
            class={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
              page.url.pathname === link.href 
                ? "bg-brand-50 text-brand-700" 
                : "text-surface-600 active:bg-surface-50"
            )}
            onclick={closeMenu}
          >
            <link.icon size={18} class={cn(page.url.pathname === link.href ? "text-brand-600" : "text-surface-400")} />
            {link.name.replace(/^[^\s]+\s/, '')}
          </a>
        {/each}
      </nav>
      
      <div class="mt-8 pt-8 border-t border-surface-100">
        <div class="flex items-center gap-3 px-4 mb-6">
          <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
            AO
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-bold text-surface-900 truncate">Adaeze Okonkwo</div>
            <div class="text-xs text-surface-500 truncate">adaeze@agrofresh.ng</div>
          </div>
        </div>
        
        <div class="px-4">
          <button class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-900 text-white text-sm font-bold shadow-lg shadow-surface-900/10 active:scale-95 transition-all">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>

    <div class="p-6 text-center border-t border-surface-50 bg-surface-50/50">
      <div class="text-surface-300 text-[0.6rem] font-bold tracking-widest uppercase">
        Platform v2.0
      </div>
    </div>
  </div>
{/if}
