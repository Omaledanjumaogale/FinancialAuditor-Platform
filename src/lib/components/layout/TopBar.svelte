<script lang="ts">
  import { Menu, Bell, Search, LogOut, Settings } from 'lucide-svelte';
  import { page } from '$app/state';
  import { authState } from '$lib/stores/auth.svelte';
  import { auth } from '$lib/firebase';
  import { signOut } from 'firebase/auth';

  interface Props {
    onMenuClick: () => void;
  }
  let { onMenuClick } = $props<Props>();

  const displayName = $derived(
    authState.user?.displayName || authState.user?.email?.split('@')[0] || 'User'
  );
  const displayInitials = $derived(
    displayName
      .split(' ')
      .map((n: string) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  );

  // Breadcrumbs — derived directly, not as a function
  const breadcrumbs = $derived(
    page.url.pathname
      .split('/')
      .filter(Boolean)
      .map((segment, i, arr) => ({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: '/' + arr.slice(0, i + 1).join('/')
      }))
  );

  const fiscalYears = [2026, 2025, 2024, 2023];

  async function handleSignOut() {
    try {
      await signOut(auth);
      window.location.href = '/auth';
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  }
</script>

<header
  class="glass-nav sticky top-0 z-40 h-[68px] flex items-center px-4 md:px-8 w-full border-b border-white/5"
>
  <!-- Left: Menu + Breadcrumbs -->
  <div class="flex items-center gap-4 flex-1 min-w-0">
    <button
      onclick={onMenuClick}
      class="xl:hidden p-2 text-slate-dim hover:text-white transition-colors hover:bg-white/5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
      aria-label="Toggle navigation menu"
    >
      <Menu size={22} aria-hidden="true" />
    </button>

    <nav class="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" aria-label="Breadcrumb">
      <a href="/dashboard" class="text-slate-dim hover:text-emerald transition-colors">Console</a>
      {#each breadcrumbs as crumb, i (crumb.href)}
        <span class="text-slate-dim/30" aria-hidden="true">/</span>
        {#if i === breadcrumbs.length - 1}
          <span class="text-white" aria-current="page">{crumb.name}</span>
        {:else}
          <a href={crumb.href} class="text-slate-dim hover:text-emerald transition-colors">{crumb.name}</a>
        {/if}
      {/each}
    </nav>
  </div>

  <!-- Centre: Search -->
  <div class="hidden lg:flex items-center flex-1 max-w-sm mx-6">
    <div class="relative w-full group">
      <Search
        class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors"
        size={16}
        aria-hidden="true"
      />
      <input
        type="search"
        id="topbar-search"
        name="search"
        placeholder="Search records..."
        class="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-dim/50 outline-none focus:border-emerald/30 focus:bg-emerald/5 transition-all"
        aria-label="Search enterprise records"
      />
    </div>
  </div>

  <!-- Right: Actions -->
  <div class="flex items-center gap-2 md:gap-3">
    <!-- Mobile search -->
    <button
      class="lg:hidden p-2 text-slate-dim hover:text-white hover:bg-white/5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
      aria-label="Open search"
    >
      <Search size={20} aria-hidden="true" />
    </button>

    <!-- Fiscal Year -->
    <div class="hidden sm:block h-6 w-px bg-white/10 mx-1" aria-hidden="true"></div>
    <label for="fiscal-year-select" class="sr-only">Select fiscal year</label>
    <select
      id="fiscal-year-select"
      class="hidden sm:block bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white outline-none focus:border-emerald/30 cursor-pointer"
    >
      {#each fiscalYears as yr (yr)}
        <option value={yr}>FY {yr}</option>
      {/each}
    </select>

    <!-- Notifications -->
    <button
      class="relative p-2 text-slate-dim hover:text-white hover:bg-white/5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
      aria-label="Notifications — new alerts available"
    >
      <Bell size={20} aria-hidden="true" />
      <span class="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-navy" aria-hidden="true"></span>
    </button>

    <!-- Settings -->
    <button
      class="hidden md:flex p-2 text-slate-dim hover:text-white hover:bg-white/5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
      aria-label="Settings"
    >
      <Settings size={20} aria-hidden="true" />
    </button>

    <!-- Divider -->
    <div class="hidden md:block h-6 w-px bg-white/10 mx-1" aria-hidden="true"></div>

    <!-- Avatar -->
    <div
      class="w-9 h-9 rounded-xl bg-linear-to-br from-emerald/80 to-emerald-deep flex items-center justify-center text-white font-black text-xs shadow-lg select-none"
      aria-hidden="true"
      title={displayName}
    >{displayInitials}</div>

    <!-- Sign Out -->
    <button
      onclick={handleSignOut}
      class="hidden md:flex p-2 text-slate-dim hover:text-danger transition-colors rounded-lg hover:bg-danger/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger"
      aria-label="Sign out"
      title="Sign out"
    >
      <LogOut size={16} aria-hidden="true" />
    </button>
  </div>
</header>
