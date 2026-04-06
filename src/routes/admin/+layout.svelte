<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let { children } = $props();

  const admin = {
    name: 'System Admin',
    role: 'Super Admin',
    initials: 'SA'
  };
</script>

<div class="max-w-7xl mx-auto px-6 py-8">
  <!-- Admin Topbar -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div in:fade={{ duration: 400 }}>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-rose text-[10px] font-bold uppercase tracking-[0.2em] border border-rose/30 px-2 py-0.5 rounded bg-rose/10">Admin Console</span>
        <span class="w-1.5 h-1.5 rounded-full bg-rose animate-pulse"></span>
      </div>
      <h1 class="text-3xl font-extrabold text-white">Platform Operations Hub 🛡️</h1>
    </div>

    <div class="flex items-center gap-4" in:fade={{ delay: 200, duration: 400 }}>
      <button class="btn-secondary px-5 py-2.5 text-sm border-rose text-rose hover:bg-rose/10">
        <span>📢</span> Broadcast
      </button>
      <button class="btn-primary px-5 py-2.5 text-sm bg-gradient-to-r from-rose to-rose-700">
        <span>📋</span> Requests (8)
      </button>
    </div>
  </div>

  <!-- Admin Content -->
  <div in:fade={{ delay: 400, duration: 600 }}>
    {@render children()}
  </div>
</div>
