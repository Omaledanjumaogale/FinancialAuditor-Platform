<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';

  let { children } = $props();
  let mobileSidebarOpen = $state(false);
</script>

<!-- Dashboard Shell -->
<div class="flex min-h-screen" style="background-color:#0a1628;">

  <!-- Sidebar — desktop always visible (xl+) -->
  <Sidebar />

  <!-- Mobile Sidebar Overlay -->
  {#if mobileSidebarOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
      onclick={() => (mobileSidebarOpen = false)}
      transition:fade={{ duration: 200 }}
      aria-hidden="true"
    ></div>
    <div
      class="fixed inset-y-0 left-0 w-[240px] z-50 xl:hidden overflow-y-auto"
      style="background-color:#0f2040; border-right:1px solid rgba(255,255,255,0.08);"
      transition:fly={{ x: -240, duration: 300, opacity: 1 }}
    >
      <Sidebar />
    </div>
  {/if}

  <!-- Main Content Area -->
  <div class="flex-1 flex flex-col xl:ml-[240px] min-w-0">
    <TopBar onMenuClick={() => { mobileSidebarOpen = !mobileSidebarOpen; }} />
    <main
      class="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden pb-24 xl:pb-8"
      id="main-content"
      style="background-color:#0a1628;"
    >
      {@render children()}
    </main>
  </div>
</div>
