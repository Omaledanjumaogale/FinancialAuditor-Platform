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
    ChevronRight,
    Sparkles,
    LayoutGrid
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const menuItems = [
    { name: '📊 Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: '🤝 Marketplace', icon: ShoppingBag, href: '/marketplace' },
    { name: '🛡️ AI Audit', icon: ShieldCheck, href: '/dashboard/audit' },
    { name: '🧠 Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    { name: '📖 Ledger', icon: BookOpen, href: '/dashboard/ledger' },
    { name: '💳 Payments', icon: CreditCard, href: '/dashboard/payments' },
    { name: '💬 Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { name: '📜 Logs', icon: History, href: '/dashboard/logs' },
  ];

  const adminItems = [
    { name: '🛡️ Admin Hub', icon: ShieldCheck, href: '/admin' },
  ];
</script>

<aside class="hidden xl:flex flex-col w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-white/5 z-50">
  <!-- Sidebar Header -->
  <div class="h-[68px] flex items-center px-6 border-b border-white/5">
    <a href="/" class="flex items-center gap-2.5 group decoration-none">
      <div class="w-9 h-9 bg-gradient-to-br from-emerald to-emerald-deep rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
      </div>
      <div class="flex flex-col">
        <span class="text-white font-heading font-extrabold text-base tracking-tight leading-none">Financial<span class="text-emerald">Auditor</span></span>
        <span class="text-[9px] font-mono font-bold text-slate-dim uppercase tracking-widest leading-tight mt-0.5">CONSOLE · NG</span>
      </div>
    </a>
  </div>

  <!-- Navigation Content -->
  <div class="flex-1 flex flex-col overflow-y-auto py-6 px-4 space-y-8">
    <!-- Platform Section -->
    <div class="space-y-1.5">
      <div class="px-3 mb-3 flex items-center justify-between">
        <span class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em]">Platform Console</span>
        <LayoutGrid size={12} class="text-slate-dim/50" />
      </div>
      {#each menuItems as item}
        <a 
          href={item.href} 
          class={cn(
            "sidebar-link",
            page.url.pathname === item.href && "sidebar-link-active"
          )}
        >
          <span class="flex items-center gap-3">
            <span class="text-lg leading-none group-hover:scale-110 transition-transform duration-200">{item.name.split(' ')[0]}</span>
            <span class="font-semibold">{item.name.split(' ').slice(1).join(' ')}</span>
          </span>
          {#if page.url.pathname === item.href}
            <div class="ml-auto w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(0,200,150,0.4)]"></div>
          {/if}
        </a>
      {/each}
    </div>

    <!-- Management Section -->
    <div class="space-y-1.5">
      <div class="px-3 mb-3 flex items-center justify-between">
        <span class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em]">Administration</span>
        <ShieldCheck size={12} class="text-slate-dim/50" />
      </div>
      {#each adminItems as item}
        <a 
          href={item.href} 
          class={cn(
            "sidebar-link",
            page.url.pathname === item.href && "sidebar-link-active"
          )}
        >
          <span class="flex items-center gap-3">
            <span class="text-lg leading-none group-hover:scale-110 transition-transform duration-200">{item.name.split(' ')[0]}</span>
            <span class="font-semibold">{item.name.split(' ').slice(1).join(' ')}</span>
          </span>
        </a>
      {/each}
    </div>
  </div>

  <!-- Sidebar Footer -->
  <div class="p-4 mt-auto border-t border-white/5 bg-navy-mid/30">
    <div class="bg-surface rounded-2xl p-3 flex items-center gap-3 border border-white/5 shadow-sm hover:border-emerald/20 transition-colors group cursor-pointer">
      <div class="w-10 h-10 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center font-black text-sm border border-emerald/20 group-hover:bg-emerald group-hover:text-white transition-all duration-300">
        AO
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-black text-white truncate">Adaeze Okonkwo</div>
        <div class="text-[10px] text-slate-dim font-medium truncate italic">Pro Enterprise Plan</div>
      </div>
      <button class="text-slate-dim hover:text-danger transition-colors p-2 rounded-lg hover:bg-danger/5" title="Sign out of console">
        <LogOut size={16} />
      </button>
    </div>
  </div>
</aside>
