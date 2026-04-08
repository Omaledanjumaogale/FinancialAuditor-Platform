<script lang="ts">
  import { cn } from '$lib/utils';
  import { fly, fade } from 'svelte/transition';

  interface Props {
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    ctaText?: string;
    emoji: string;
    delay?: number;
    class?: string;
  }

  let { 
    name, 
    price, 
    period = 'yr', 
    description, 
    features, 
    isPopular = false, 
    ctaText = 'Get Started', 
    emoji,
    delay = 0,
    class: className 
  } = $props<Props>();
</script>

<div 
  class={cn(
    "card-premium p-8 flex flex-col h-full relative group transition-all duration-500",
    isPopular ? "border-emerald/40 bg-emerald/[0.02] shadow-glow" : "hover:border-white/20",
    className
  )}
  in:fly={{ y: 30, delay, duration: 800 }}
>
  {#if isPopular}
    <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20">
      Most Popular
    </div>
  {/if}

  <div class="mb-8">
    <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10">
      {emoji}
    </div>
    <h3 class="text-2xl font-heading font-black text-white mb-2 tracking-tight group-hover:text-emerald transition-colors">{name}</h3>
    <p class="text-slate-dim text-sm leading-relaxed">{description}</p>
  </div>

  <div class="mb-10 flex items-baseline gap-1">
    <span class="text-4xl font-heading font-black text-white tracking-tighter">{price}</span>
    <span class="text-slate-dim text-sm font-bold uppercase tracking-widest">/{period}</span>
  </div>

  <div class="space-y-4 mb-10 flex-1">
    {#each features as feature}
      <div class="flex items-start gap-3 group/item">
        <div class="mt-1 w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center text-emerald flex-shrink-0 group-hover/item:bg-emerald group-hover/item:text-white transition-all duration-300">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
        </div>
        <span class="text-slate text-sm font-medium group-hover/item:text-white transition-colors">{feature}</span>
      </div>
    {/each}
  </div>

  <button 
    class={cn(
      "w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 active:scale-[0.98]",
      isPopular 
        ? "bg-emerald text-white shadow-glow hover:brightness-110 hover:-translate-y-1" 
        : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
    )}
  >
    {ctaText}
  </button>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.3);
  }
</style>
