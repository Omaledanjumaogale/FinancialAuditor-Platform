<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let { children } = $props();
  
  // Anti-overflow protection
  onMount(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<div class="min-h-screen bg-navy text-slate font-sans selection:bg-emerald/30 overflow-x-hidden w-full relative">
  <!-- Background Elements -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald/5 blur-[120px]"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px]"></div>
    <div class="absolute inset-0 grid-pattern opacity-30"></div>
  </div>

  <div class="relative z-10 flex flex-col min-h-screen">
    {@render children()}
  </div>
</div>

<style>
  :global(body) {
    background-color: var(--color-navy);
    overflow-x: hidden;
    width: 100%;
  }
</style>
