<script lang="ts">
  import '../app.css';
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

<div class="min-h-screen bg-background text-foreground font-sans selection:bg-emerald/20 overflow-x-hidden w-full relative">
  <!-- Restore Original Hero Gradient -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.18)_0%,transparent_70%),radial-gradient(ellipse_50%_40%_at_90%_60%,rgba(245,166,35,0.08)_0%,transparent_60%)]"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
  </div>

  <div class="relative z-10 flex flex-col min-h-screen w-full max-w-[100vw]">
    {@render children()}
  </div>
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
