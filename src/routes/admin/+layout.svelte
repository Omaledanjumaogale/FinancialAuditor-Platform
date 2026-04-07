<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Shield, Bell, Send, Settings, Search } from 'lucide-svelte';

  let { children } = $props();

  const admin = {
    name: 'System Admin',
    role: 'Super Admin',
    status: 'Online'
  };
</script>

<div class="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto pt-20">
  <!-- Admin Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <div in:fade={{ duration: 400 }}>
      <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-bold uppercase tracking-widest text-danger bg-danger/5 px-2 py-0.5 rounded border border-danger/10">
          Admin Console
        </span>
        <div class="h-1 w-1 rounded-full bg-surface-300"></div>
        <span class="text-xs font-medium text-surface-500">{admin.role}</span>
      </div>
      <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">
        Platform Intelligence Hub <span class="text-danger animate-pulse inline-block">🛡️</span>
      </h1>
    </div>

    <div class="flex items-center gap-3" in:fade={{ delay: 200, duration: 400 }}>
      <button class="btn-secondary gap-2 px-4 border-danger/20 text-danger hover:bg-danger/5">
        <Bell size={16} />
        <span>System Alerts</span>
      </button>
      <button class="btn-primary gap-2 px-5 bg-surface-900 hover:bg-black">
        <Send size={18} />
        <span>Broadcast</span>
      </button>
    </div>
  </div>

  <!-- Main Admin View -->
  <div in:fade={{ delay: 400, duration: 600 }}>
    {@render children()}
  </div>
</div>
