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

<aside class="hidden xl:flex flex-col w-[280px] h-screen fixed left-0 top-0 bg-background border-r border-border z-50">
  <!-- Sidebar Header -->
  <div class="h-[72px] flex items-center px-6 border-b border-border">
    <a href="/" class="flex items-center gap-2.5 group">
      <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
        <Sparkles size={20} class="text-white" />
      </div>
      <div class="flex flex-col">
        <span class="text-foreground font-heading font-black text-lg tracking-tighter leading-none">Financial<span class="text-primary">Auditor</span></span>
        <span class="text-[9px] font-bold text-primary uppercase tracking-[0.2em] leading-tight mt-0.5">Enterprise Hub</span>
      </div>
    </a>
  </div>

  <!-- Navigation Content -->
  <div class="flex-1 flex flex-col overflow-y-auto py-6 px-4 space-y-8">
    <!-- Platform Section -->
    <div class="space-y-1.5">
      <div class="px-3 mb-3 flex items-center justify-between">
        <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Platform Console</span>
        <LayoutGrid size={12} class="text-muted-foreground/50" />
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
            <div class="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
          {/if}
        </a>
      {/each}
    </div>

    <!-- Management Section -->
    <div class="space-y-1.5">
      <div class="px-3 mb-3 flex items-center justify-between">
        <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Administration</span>
        <ShieldCheck size={12} class="text-muted-foreground/50" />
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
  <div class="p-4 mt-auto border-t border-border bg-muted/20">
    <div class="bg-background rounded-2xl p-3 flex items-center gap-3 border border-border shadow-sm hover:border-primary/20 transition-colors group cursor-pointer">
      <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        AO
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-black text-foreground truncate">Adaeze Okonkwo</div>
        <div class="text-[10px] text-muted-foreground font-medium truncate">Pro Enterprise Plan</div>
      </div>
      <button class="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/5" title="Sign out of console">
        <LogOut size={16} />
      </button>
    </div>
  </div>
</aside>
