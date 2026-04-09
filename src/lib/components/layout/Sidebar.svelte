<script lang="ts">
  import { page } from '$app/state';
  import { ShieldCheck, LogOut, LayoutGrid } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { auth } from '$lib/firebase';
  import { signOut } from 'firebase/auth';

  const menuItems = [
    { name: '📊 Dashboard',   href: '/dashboard' },
    { name: '🤝 Marketplace', href: '/marketplace' },
    { name: '🛡️ AI Audit',    href: '/dashboard/audit' },
    { name: '🧠 Analytics',   href: '/dashboard/analytics' },
    { name: '📖 Ledger',      href: '/dashboard/ledger' },
    { name: '💳 Payments',    href: '/dashboard/payments' },
    { name: '💬 Messages',    href: '/dashboard/messages' },
    { name: '📜 Logs',        href: '/dashboard/logs' },
  ];

  const adminItems = [
    { name: '🛡️ Admin Hub', href: '/admin' },
  ];

  const displayName = $derived(
    authState.user?.displayName || authState.user?.email?.split('@')[0] || 'User'
  );
  const displayInitials = $derived(
    displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
  );
  const displayPlan = $derived(() => {
    const email = authState.user?.email ?? '';
    if (email.includes('enterprise')) return 'Enterprise Plan';
    if (email.includes('pro')) return 'Pro Plan';
    return 'Starter Plan';
  });

  async function handleSignOut() {
    try {
      await signOut(auth);
      // Use window.location for sign-out to clear SvelteKit cache fully
      window.location.href = '/auth';
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  }
</script>

<aside
  class="hidden xl:flex flex-col w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-white/5 z-50"
  aria-label="Main navigation sidebar"
>
  <!-- Logo -->
  <div class="h-[68px] flex items-center px-6 border-b border-white/5">
    <a href="/" class="flex items-center gap-2.5 group no-underline" aria-label="Go to FinancialAuditor home">
      <div class="w-9 h-9 bg-linear-to-br from-emerald to-emerald-deep rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300" aria-hidden="true">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      </div>
      <div class="flex flex-col">
        <span class="text-white font-heading font-extrabold text-base tracking-tight leading-none">
          Financial<span class="text-emerald">Auditor</span>
        </span>
        <span class="text-[9px] font-mono font-bold text-slate-dim uppercase tracking-widest leading-tight mt-0.5">
          CONSOLE · NG
        </span>
      </div>
    </a>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 flex flex-col overflow-y-auto py-6 px-4 space-y-8" aria-label="Dashboard navigation">

    <!-- Platform Group -->
    <div class="space-y-1" role="group" aria-labelledby="nav-platform-label">
      <div id="nav-platform-label" class="px-3 mb-3 flex items-center justify-between">
        <span class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em]">Platform Console</span>
        <LayoutGrid size={12} class="text-slate-dim/50" aria-hidden="true" />
      </div>
      {#each menuItems as item (item.href)}
        {@const isActive = page.url.pathname === item.href}
        <a
          href={item.href}
          class={cn('sidebar-link', isActive && 'sidebar-link-active')}
          aria-current={isActive ? 'page' : undefined}
        >
          <span class="flex items-center gap-3 flex-1">
            <span class="text-lg leading-none" aria-hidden="true">{item.name.split(' ')[0]}</span>
            <span class="font-semibold">{item.name.split(' ').slice(1).join(' ')}</span>
          </span>
          {#if isActive}
            <div class="w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(0,200,150,0.4)]" aria-hidden="true"></div>
          {/if}
        </a>
      {/each}
    </div>

    <!-- Admin Group -->
    <div class="space-y-1" role="group" aria-labelledby="nav-admin-label">
      <div id="nav-admin-label" class="px-3 mb-3 flex items-center justify-between">
        <span class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em]">Administration</span>
        <ShieldCheck size={12} class="text-slate-dim/50" aria-hidden="true" />
      </div>
      {#each adminItems as item (item.href)}
        {@const isActive = page.url.pathname === item.href}
        <a
          href={item.href}
          class={cn('sidebar-link', isActive && 'sidebar-link-active')}
          aria-current={isActive ? 'page' : undefined}
        >
          <span class="flex items-center gap-3">
            <span class="text-lg leading-none" aria-hidden="true">{item.name.split(' ')[0]}</span>
            <span class="font-semibold">{item.name.split(' ').slice(1).join(' ')}</span>
          </span>
        </a>
      {/each}
    </div>
  </nav>

  <!-- User Card -->
  <div class="p-4 border-t border-white/5 bg-navy-mid/30">
    <div class="bg-surface rounded-2xl p-3 flex items-center gap-3 border border-white/5 shadow-sm hover:border-emerald/20 transition-colors group">
      <div
        class="w-10 h-10 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center font-black text-sm border border-emerald/20 group-hover:bg-emerald group-hover:text-white transition-all duration-300 shrink-0 select-none"
        aria-hidden="true"
      >{displayInitials}</div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-black text-white truncate">{displayName}</div>
        <div class="text-[10px] text-slate-dim font-medium truncate">{displayPlan()}</div>
      </div>
      <button
        onclick={handleSignOut}
        class="text-slate-dim hover:text-danger transition-colors p-2 rounded-lg hover:bg-danger/5 shrink-0"
        aria-label="Sign out of console"
        title="Sign out"
      >
        <LogOut size={16} aria-hidden="true" />
      </button>
    </div>
  </div>
</aside>
