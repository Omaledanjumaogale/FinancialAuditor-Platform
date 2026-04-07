<script lang="ts">
  import { page } from '$app/state';
  import { 
    LayoutDashboard, 
    ShieldCheck, 
    Settings, 
    ShoppingBag, 
    LogOut,
    BarChart3,
    BookOpen,
    CreditCard,
    MessageSquare,
    History,
    ChevronRight
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const menuItems = [
    { name: '📊 Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: '🛒 Marketplace', icon: ShoppingBag, href: '/marketplace' },
    { name: '🤖 AI Audit', icon: ShieldCheck, href: '/dashboard/audit' },
    { name: '📈 Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    { name: '📚 Ledger', icon: BookOpen, href: '/dashboard/ledger' },
    { name: '💳 Payments', icon: CreditCard, href: '/dashboard/payments' },
    { name: '💬 Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { name: '📜 Logs', icon: History, href: '/dashboard/logs' },
  ];

  const adminItems = [
    { name: '🛡️ Admin Hub', icon: ShieldCheck, href: '/admin' },
  ];
</script>

<aside class="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-navy-mid border-r border-white/10 z-50">
  <!-- Logo -->
  <div class="p-6 h-[68px] flex items-center border-b border-white/10">
    <a href="/" class="flex items-center gap-3 group">
      <div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald to-emerald-deep flex items-center justify-center shadow-lg shadow-emerald/20 group-hover:scale-105 transition-transform">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      </div>
      <div class="flex flex-col">
        <span class="text-white font-bold text-lg leading-tight tracking-tight font-heading">Financial<span class="text-emerald">Auditor</span></span>
        <span class="text-emerald text-[0.6rem] font-bold uppercase tracking-[0.2em]">Enterprise AI</span>
      </div>
    </a>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <div class="text-[0.65rem] font-bold text-slate-dim uppercase tracking-widest px-3 mb-4">Main Menu</div>
    {#each menuItems as item}
      <a 
        href={item.href} 
        class={cn(
          "flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all group border border-transparent",
          page.url.pathname === item.href 
            ? "bg-emerald/10 text-white border-emerald/20 shadow-lg shadow-emerald/5" 
            : "text-slate hover:bg-white/5 hover:text-white"
        )}
      >
        <span class="flex items-center gap-3">
          <span class="text-lg leading-none">{item.name.split(' ')[0]}</span>
          <span>{item.name.split(' ').slice(1).join(' ')}</span>
        </span>
        <ChevronRight size={14} class={cn(
          "transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
          page.url.pathname === item.href && "opacity-100 translate-x-0"
        )} />
      </a>
    {/each}

    <div class="pt-8">
      <div class="text-[0.65rem] font-bold text-slate-dim uppercase tracking-widest px-3 mb-4">Platform Admin</div>
      {#each adminItems as item}
        <a 
          href={item.href} 
          class={cn(
            "flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all group border border-transparent",
            page.url.pathname === item.href 
              ? "bg-white text-navy-mid shadow-lg" 
              : "text-slate hover:bg-white/5 hover:text-white"
          )}
        >
          <span class="flex items-center gap-3">
            <span class="text-lg leading-none">{item.name.split(' ')[0]}</span>
            <span>{item.name.split(' ').slice(1).join(' ')}</span>
          </span>
          <ChevronRight size={14} class={cn(
            "transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
            page.url.pathname === item.href && "opacity-100 translate-x-0"
          )} />
        </a>
      {/each}
    </div>
  </nav>

  <!-- Footer Profile -->
  <div class="p-4 border-t border-white/10">
    <div class="bg-navy rounded-2xl p-3 flex items-center gap-3 border border-white/5">
      <div class="w-10 h-10 rounded-full bg-emerald/20 text-emerald flex items-center justify-center font-bold text-sm border border-emerald/20">
        AO
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-bold text-white truncate">Adaeze Okonkwo</div>
        <div class="text-[0.65rem] text-slate-dim truncate">Pro Plan Member 💎</div>
      </div>
      <button class="text-slate-dim hover:text-danger transition-colors p-2" title="Logout">
        <LogOut size={18} />
      </button>
    </div>
  </div>
</aside>
