<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  let { children } = $props();

  let isMobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<div class="flex min-h-screen bg-navy overflow-hidden relative">
  <!-- Sidebar is only visible on large desktop screens -->
  <Sidebar />
  
  <div class="flex-1 flex flex-col xl:pl-[280px] w-full transition-all duration-300">
    <!-- Header is handled within the layout for the dashboard -->
    <TopBar onMenuClick={toggleMobileMenu} />
    
    <main class="flex-1 overflow-y-auto w-full relative">
      <!-- Background Decorations specific to dashboard -->
      <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.08)_0%,transparent_70%)]"></div>
        <div class="absolute inset-0 grid-pattern opacity-20"></div>
      </div>

      <div class="container-custom py-8 md:py-12 relative z-10">
        {@render children()}
      </div>
    </main>
  </div>
</div>

<style>
  :global(.grid-pattern) {
    background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0);
    background-size: 32px 32px;
  }
</style>
