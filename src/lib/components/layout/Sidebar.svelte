<script lang="ts">
  import { page } from '$app/state';
  import {
    LayoutDashboard, ShoppingBag, ShieldCheck,
    BarChart3, BookOpen, CreditCard, MessageSquare,
    Clock, LogOut, Sparkles, BarChart2
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';

  const menuItems = [
    { name: 'Dashboard',    href: '/dashboard',           icon: LayoutDashboard },
    { name: 'Marketplace',  href: '/marketplace',         icon: ShoppingBag },
    { name: 'AI Audit',     href: '/dashboard/audit',     icon: ShieldCheck },
    { name: 'Analytics',    href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Ledger',       href: '/dashboard/ledger',    icon: BookOpen },
    { name: 'Payments',     href: '/dashboard/payments',  icon: CreditCard },
    { name: 'Messages',     href: '/dashboard/messages',  icon: MessageSquare },
    { name: 'Activity Log', href: '/dashboard/logs',      icon: Clock },
  ];

  const adminItems = [
    { name: 'Admin Panel', href: '/admin', icon: ShieldCheck },
  ];

  const displayName = $derived(
    authState.user?.displayName || authState.user?.email?.split('@')[0] || 'User'
  );
  const displayInitials = $derived(
    displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
  );
  const userEmail = $derived(authState.user?.email || '');

  async function handleSignOut() {
    try { await authState.logout(); } catch (err) { console.error('Sign out failed:', err); }
    window.location.href = '/auth';
  }
</script>

<aside
  class="hidden xl:flex flex-col w-[240px] h-screen fixed left-0 top-0 z-50"
  style="background-color:#0f2040; border-right:1px solid rgba(255,255,255,0.08);"
  aria-label="Dashboard sidebar navigation"
>
  <!-- Logo / Brand -->
  <div class="h-16 flex items-center px-5 shrink-0" style="border-bottom:1px solid rgba(255,255,255,0.08)">
    <a href="/" class="flex items-center gap-2.5 group" aria-label="Go to FinancialAuditor home">
      <div
        class="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-all duration-300 shrink-0"
        style="background-color:#10b981;"
        aria-hidden="true"
      >
        <BarChart2 size={16} class="text-white" />
      </div>
      <div>
        <div class="font-heading font-bold text-sm text-white leading-none">
          Financial<span style="color:#10b981">Auditor</span>
        </div>
        <div class="text-[9px] tracking-widest uppercase mt-0.5" style="color:#64748b">Enterprise</div>
      </div>
    </a>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-5" aria-label="Dashboard navigation">

    <!-- Main -->
    <div role="group" aria-labelledby="sidebar-main-label">
      <div id="sidebar-main-label" class="text-[10px] font-semibold uppercase tracking-[0.12em] px-2 mb-1.5" style="color:#475569">
        Main
      </div>
      <div class="space-y-0.5">
        {#each menuItems as item (item.href)}
          {@const isActive = page.url.pathname === item.href}
          {@const Icon = item.icon}
          <a
            href={item.href}
            class={cn('flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all border border-transparent', isActive ? '' : 'hover:bg-white/5')}
            style={isActive
              ? 'background:rgba(16,185,129,0.12); color:#10b981; border-color:rgba(16,185,129,0.2);'
              : 'color:#94a3b8;'}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
              style={isActive ? 'background:#10b981; color:#fff;' : 'background:rgba(255,255,255,0.05); color:#64748b;'}
              aria-hidden="true"
            >
              <Icon size={14} />
            </div>
            <span class="truncate">{item.name}</span>
            {#if isActive}
              <div
                class="w-1.5 h-1.5 rounded-full ml-auto shrink-0"
                style="background:#10b981; box-shadow:0 0 6px rgba(16,185,129,0.6);"
                aria-hidden="true"
              ></div>
            {/if}
          </a>
        {/each}
      </div>
    </div>

    <!-- Admin -->
    <div role="group" aria-labelledby="sidebar-admin-label">
      <div id="sidebar-admin-label" class="text-[10px] font-semibold uppercase tracking-[0.12em] px-2 mb-1.5" style="color:#475569">
        Admin
      </div>
      <div class="space-y-0.5">
        {#each adminItems as item (item.href)}
          {@const isActive = page.url.pathname === item.href}
          {@const Icon = item.icon}
          <a
            href={item.href}
            class={cn('flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all border border-transparent', isActive ? '' : 'hover:bg-white/5')}
            style={isActive ? 'background:rgba(16,185,129,0.12); color:#10b981; border-color:rgba(16,185,129,0.2);' : 'color:#94a3b8;'}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
              style={isActive ? 'background:#10b981; color:#fff;' : 'background:rgba(255,255,255,0.05); color:#64748b;'}
              aria-hidden="true"
            >
              <Icon size={14} />
            </div>
            <span class="truncate">{item.name}</span>
          </a>
        {/each}
      </div>
    </div>
  </nav>

  <!-- Upgrade CTA -->
  <div class="px-3 pb-2">
    <div class="rounded-xl p-3" style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2);">
      <div class="flex items-center gap-2 mb-1.5">
        <Sparkles size={13} style="color:#10b981;" aria-hidden="true" />
        <span class="text-xs font-semibold" style="color:#10b981;">Upgrade to Pro</span>
      </div>
      <p class="text-xs leading-snug mb-2.5" style="color:#64748b;">
        Unlock AI audits, priority support &amp; analytics.
      </p>
      <a href="/dashboard/payments" class="flex items-center justify-center w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-white transition-all"
        style="background:#10b981; box-shadow:0 2px 8px rgba(16,185,129,0.3);">
        Upgrade Now
      </a>
    </div>
  </div>

  <!-- User Profile Footer -->
  <div class="px-3 py-3 shrink-0" style="border-top:1px solid rgba(255,255,255,0.08);">
    <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group">
      <!-- Avatar -->
      <div
        class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 select-none text-white"
        style="background:linear-gradient(135deg,#059669,#0f2040);"
        aria-hidden="true"
      >{displayInitials}</div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="text-xs font-semibold text-white truncate leading-tight">{displayName}</div>
        <div class="text-[10px] truncate" style="color:#64748b;">{userEmail}</div>
      </div>

      <!-- Sign Out -->
      <button
        onclick={handleSignOut}
        class="p-1.5 rounded-lg transition-colors shrink-0"
        style="color:#64748b;"
        onmouseenter={e => (e.currentTarget as HTMLElement).style.color = '#f87171'}
        onmouseleave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
        aria-label="Sign out"
        title="Sign out"
      >
        <LogOut size={14} aria-hidden="true" />
      </button>
    </div>
  </div>
</aside>
