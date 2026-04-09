<script lang="ts">
  import { Bell, Search, Settings, Menu, ChevronRight } from 'lucide-svelte';
  import { page } from '$app/state';
  import { authState } from '$lib/stores/auth.svelte';
  import { auth } from '$lib/firebase';
  import { signOut } from 'firebase/auth';

  interface Props { onMenuClick: () => void; }
  let { onMenuClick } = $props() as Props;

  const displayName = $derived(
    authState.user?.displayName || authState.user?.email?.split('@')[0] || 'User'
  );
  const displayInitials = $derived(
    displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
  );

  const breadcrumbs = $derived(
    page.url.pathname
      .split('/')
      .filter(Boolean)
      .map((seg, i, arr) => ({
        name: seg.charAt(0).toUpperCase() + seg.slice(1),
        href: '/' + arr.slice(0, i + 1).join('/')
      }))
  );

  const fiscalYears = [2026, 2025, 2024, 2023];

  async function handleSignOut() {
    try { await signOut(auth); } catch {}
    window.location.href = '/auth';
  }
</script>

<header
  class="sticky top-0 z-40 h-16 flex items-center px-4 md:px-6 gap-4"
  style="background-color:rgba(15,32,64,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08);"
>
  <!-- Mobile Menu Toggle -->
  <button
    type="button"
    onclick={onMenuClick}
    class="xl:hidden p-2 rounded-xl transition-colors"
    style="color:#94a3b8;"
    onmouseenter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9'; }}
    onmouseleave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
    aria-label="Toggle sidebar"
  >
    <Menu size={20} aria-hidden="true" />
  </button>

  <!-- Breadcrumbs -->
  <nav class="hidden md:flex items-center gap-1.5 text-sm flex-1 min-w-0" aria-label="Breadcrumb">
    <a href="/dashboard" class="text-xs font-semibold uppercase tracking-wider transition-colors"
      style="color:#475569;"
      onmouseenter={e => (e.currentTarget as HTMLElement).style.color = '#10b981'}
      onmouseleave={e => (e.currentTarget as HTMLElement).style.color = '#475569'}>
      Console
    </a>
    {#each breadcrumbs as crumb, i (crumb.href)}
      <ChevronRight size={12} style="color:#334155; flex-shrink:0;" aria-hidden="true" />
      {#if i === breadcrumbs.length - 1}
        <span class="text-xs font-semibold uppercase tracking-wider truncate" style="color:#f1f5f9;" aria-current="page">
          {crumb.name}
        </span>
      {:else}
        <a href={crumb.href} class="text-xs font-medium uppercase tracking-wider transition-colors" style="color:#475569;"
          onmouseenter={e => (e.currentTarget as HTMLElement).style.color = '#10b981'}
          onmouseleave={e => (e.currentTarget as HTMLElement).style.color = '#475569'}>
          {crumb.name}
        </a>
      {/if}
    {/each}
  </nav>

  <!-- Search -->
  <div class="hidden lg:flex items-center flex-1 max-w-xs">
    <div class="relative w-full">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2" size={14} style="color:#475569;" aria-hidden="true" />
      <input
        type="search"
        id="topbar-search"
        placeholder="Search records..."
        class="w-full rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none transition-all"
        style="background-color:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:#f1f5f9;"
        onfocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.4)'; }}
        onblur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
        aria-label="Search records"
      />
    </div>
  </div>

  <!-- Right Actions -->
  <div class="flex items-center gap-2 ml-auto">

    <!-- Fiscal Year -->
    <label for="fy-select" class="sr-only">Select fiscal year</label>
    <select
      id="fy-select"
      class="hidden sm:block text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
      style="background-color:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:#94a3b8;"
    >
      {#each fiscalYears as yr (yr)}
        <option value={yr} style="background:#0f2040; color:#f1f5f9;">FY {yr}</option>
      {/each}
    </select>

    <!-- Notifications -->
    <button
      class="relative p-2 rounded-xl transition-colors"
      style="color:#94a3b8;"
      onmouseenter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9'; }}
      onmouseleave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
      aria-label="View notifications"
    >
      <Bell size={18} aria-hidden="true" />
      <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" style="border:2px solid #0f2040;" aria-label="New notifications"></span>
    </button>

    <!-- Settings -->
    <a
      href="/dashboard/profile"
      class="hidden md:flex p-2 rounded-xl transition-colors"
      style="color:#94a3b8;"
      onmouseenter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9'; }}
      onmouseleave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
      aria-label="Account settings"
    >
      <Settings size={18} aria-hidden="true" />
    </a>

    <!-- Avatar / Sign Out -->
    <button
      onclick={handleSignOut}
      class="w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold text-xs select-none transition-colors"
      style="background:linear-gradient(135deg,#059669,#047857); box-shadow:0 2px 8px rgba(16,185,129,0.3);"
      title="Sign out — {displayName}"
      aria-label="Sign out ({displayName})"
    >
      {displayInitials}
    </button>
  </div>
</header>
