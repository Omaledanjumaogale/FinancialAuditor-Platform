<script lang="ts">
  import { page } from '$app/state';
  import { 
    LayoutDashboard, 
    FileText, 
    TrendingUp, 
    ShieldCheck, 
    Settings, 
    ShoppingBag, 
    LogOut,
    PlusCircle,
    UserCircle,
    BarChart3,
    BookOpen,
    HelpCircle
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Marketplace', icon: ShoppingBag, href: '/marketplace' },
    { name: 'AI Audit', icon: ShieldCheck, href: '/dashboard/audit' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    { name: 'Ledger', icon: BookOpen, href: '/dashboard/ledger' },
    { name: 'Settings', icon: Settings, href: '/dashboard/profile' },
  ];

  const adminItems = [
    { name: 'Admin Hub', icon: ShieldCheck, href: '/admin' },
  ];
</script>

<aside class="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-surface-200 z-50">
  <!-- Logo -->
  <div class="p-6">
    <a href="/" class="flex items-center gap-3 group">
      <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-brand-600/20 group-hover:scale-105 transition-transform">
        FA
      </div>
      <div class="flex flex-col">
        <span class="text-surface-900 font-bold text-lg leading-tight tracking-tight font-heading">FinancialAuditor</span>
        <span class="text-brand-600 text-[0.65rem] font-bold uppercase tracking-[0.2em]">Enterprise AI</span>
      </div>
    </a>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
    <div class="text-[0.65rem] font-bold text-surface-400 uppercase tracking-widest px-3 mb-2">Main Menu</div>
    {#each menuItems as item}
      <a 
        href={item.href} 
        class={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
          page.url.pathname === item.href 
            ? "bg-brand-50 text-brand-700 shadow-sm border border-brand-100" 
            : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
        )}
      >
        <item.icon size={18} class={cn(
          "transition-colors",
          page.url.pathname === item.href ? "text-brand-600" : "text-surface-400 group-hover:text-surface-600"
        )} />
        {item.name}
      </a>
    {/each}

    <div class="pt-6">
      <div class="text-[0.65rem] font-bold text-surface-400 uppercase tracking-widest px-3 mb-2">Platform Admin</div>
      {#each adminItems as item}
        <a 
          href={item.href} 
          class={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
            page.url.pathname === item.href 
              ? "bg-surface-900 text-white shadow-sm" 
              : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
          )}
        >
          <item.icon size={18} class={cn(
            "transition-colors",
            page.url.pathname === item.href ? "text-white" : "text-surface-400 group-hover:text-surface-600"
          )} />
          {item.name}
        </a>
      {/each}
    </div>
  </nav>

  <!-- Footer Profile -->
  <div class="p-4 border-t border-surface-100">
    <div class="bg-surface-50 rounded-xl p-3 flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
        AO
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-bold text-surface-900 truncate">Adaeze Okonkwo</div>
        <div class="text-[0.6rem] text-surface-500 truncate">Pro Plan</div>
      </div>
      <button class="text-surface-400 hover:text-danger transition-colors" title="Logout">
        <LogOut size={16} />
      </button>
    </div>
  </div>
</aside>
