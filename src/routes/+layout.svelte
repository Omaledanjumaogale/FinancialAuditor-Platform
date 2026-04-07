<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import MobileBottomNav from '$lib/components/layout/MobileBottomNav.svelte';
  
  let { children } = $props();
  
  // Anti-overflow and viewport scaling protection
  onMount(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Accessibility check: ensure all images have alt text if missing
    document.querySelectorAll('img').forEach(img => {
      if (!img.alt) img.alt = "Enterprise financial record";
    });
    
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<div class="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 overflow-x-hidden w-full relative">
  <!-- Subtle Enterprise Background Elements -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div class="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] animate-pulse-soft"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-500/[0.02] blur-[100px]"></div>
    <div class="absolute inset-0 grid-pattern opacity-[0.03]"></div>
  </div>

  <div class="relative z-10 flex flex-col min-h-screen w-full max-w-[100vw]">
    {@render children()}
  </div>

  <!-- Global Mobile UX Enhancement -->
  <MobileBottomNav />
</div>

<style>
  :global(body) {
    background-color: var(--color-background);
    color: var(--color-foreground);
    overflow-x: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  :global(.grid-pattern) {
    background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0);
    background-size: 32px 32px;
  }
</style>
