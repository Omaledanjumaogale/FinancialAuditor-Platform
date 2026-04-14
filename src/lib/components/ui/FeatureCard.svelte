<script lang="ts">
  import { cn } from '$lib/utils';
  import { fly } from 'svelte/transition';

  interface Props {
    title: string;
    description: string;
    emoji: string;
    tags?: string[];
    delay?: number;
    class?: string;
  }

  let { 
    title, 
    description, 
    emoji, 
    tags = [], 
    delay = 0,
    class: className 
  }: Props = $props();
</script>

<div 
  class={cn(
    "card-premium p-10 flex flex-col items-start text-left group transition-all duration-500",
    "hover:border-emerald/30 hover:-translate-y-2 hover:shadow-hover",
    className
  )}
  in:fly={{ y: 30, delay, duration: 800 }}
>
  <!-- Emoji Icon with Original Glow -->
  <div class="w-16 h-16 rounded-[24px] bg-emerald/10 flex items-center justify-center text-4xl mb-8 group-hover:bg-emerald group-hover:text-white transition-all duration-500 border border-emerald/20 shadow-glow relative overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <span class="relative z-10 select-none group-hover:scale-110 transition-transform duration-500">{emoji}</span>
  </div>

  <h3 class="text-2xl font-heading font-black mb-4 text-white tracking-tight group-hover:text-emerald transition-colors duration-300">
    {title}
  </h3>
  
  <p class="text-slate leading-relaxed mb-8 flex-1 group-hover:text-white transition-colors duration-300">
    {description}
  </p>
  
  <div class="flex flex-wrap gap-2.5 mt-auto">
    {#each tags as tag}
      <span class="text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-2 rounded-xl bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/30 group-hover:text-emerald group-hover:bg-emerald/5 transition-all duration-300 hover:scale-105">
        {tag}
      </span>
    {/each}
  </div>

  <!-- Decorative Gradient from Original -->
  <div class="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-emerald/5 to-transparent rounded-tl-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 20px -5px rgba(0, 200, 150, 0.3);
  }
</style>
