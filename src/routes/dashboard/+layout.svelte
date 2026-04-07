<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  let { children } = $props();
</script>

<div class="flex min-h-screen bg-background overflow-hidden relative">
  <!-- Sidebar is only visible on large desktop screens -->
  <Sidebar />
  
  <div class="flex-1 flex flex-col xl:pl-[280px] w-full transition-all duration-300">
    <Header />
    
    <main class="flex-1 overflow-y-auto w-full relative">
      <!-- Background Decorations specific to dashboard -->
      <div class="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div class="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none"></div>

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
