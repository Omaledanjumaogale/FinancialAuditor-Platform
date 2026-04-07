<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Plus, Upload, Filter, Download } from 'lucide-svelte';

  let { children } = $props();

  const user = {
    name: 'Adaeze Okonkwo',
    company: 'AgroFresh Nigeria Ltd',
    plan: 'Pro Plan',
    status: 'Active'
  };
</script>

<div class="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto pt-20">
  <!-- Dashboard Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <div in:fade={{ duration: 400 }}>
      <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
          Client Portal
        </span>
        <div class="h-1 w-1 rounded-full bg-surface-300"></div>
        <span class="text-xs font-medium text-surface-500">{user.company}</span>
      </div>
      <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">
        Welcome back, {user.name.split(' ')[0]} <span class="animate-pulse inline-block">👋</span>
      </h1>
    </div>

    <div class="flex items-center gap-3" in:fade={{ delay: 200, duration: 400 }}>
      <button class="btn-secondary gap-2 px-4 py-3 min-h-[44px]">
        <Filter size={16} />
        <span class="hidden sm:inline">Filters</span>
      </button>
      <a href="/dashboard/upload" class="btn-secondary gap-2 px-4 py-3 min-h-[44px]">
        <Upload size={16} />
        <span class="hidden sm:inline">Upload</span>
      </a>
      <a href="/dashboard/new-audit" class="btn-primary gap-2 px-5 py-3 min-h-[44px]">
        <Plus size={18} />
        <span class="hidden sm:inline">New Audit</span>
      </a>
    </div>
  </div>

  <!-- Main Dashboard View -->
  <div in:fade={{ delay: 400, duration: 600 }}>
    {@render children()}
  </div>
</div>
