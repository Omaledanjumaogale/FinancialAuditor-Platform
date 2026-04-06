<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let { children } = $props();

  const user = {
    name: 'Adaeze Okonkwo',
    company: 'AgroFresh Nigeria Ltd',
    plan: 'Pro Plan · Active',
    initials: 'AO'
  };
</script>

<div class="max-w-7xl mx-auto px-6 py-8">
  <!-- Dashboard Topbar -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div in:fade={{ duration: 400 }}>
      <h1 class="text-3xl font-extrabold text-white mb-2">Good morning, {user.name} 👋</h1>
      <div class="flex items-center gap-3">
        <span class="text-slate-dim text-sm">{user.company}</span>
        <span class="w-1.5 h-1.5 rounded-full bg-emerald"></span>
        <span class="text-emerald text-xs font-bold uppercase tracking-wider">{user.plan}</span>
      </div>
    </div>

    <div class="flex items-center gap-4" in:fade={{ delay: 200, duration: 400 }}>
      <a href="/dashboard/upload" class="btn-secondary px-5 py-2.5 text-sm">
        <span>📤</span> Upload
      </a>
      <a href="/dashboard/new-entry" class="btn-primary px-5 py-2.5 text-sm">
        <span>➕</span> New Entry
      </a>
    </div>
  </div>

  <!-- Dashboard Content -->
  <div in:fade={{ delay: 400, duration: 600 }}>
    {@render children()}
  </div>
</div>
