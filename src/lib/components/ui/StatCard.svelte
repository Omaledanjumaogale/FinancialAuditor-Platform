<script lang="ts">
  import { cn } from '$lib/utils';
  import { fly } from 'svelte/transition';

  interface Props {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    emoji: string;
    delay?: number;
    class?: string;
  }

  let { 
    label, 
    value, 
    change, 
    trend = 'neutral', 
    emoji, 
    delay = 0,
    class: className 
  } = $props<Props>();
</script>

<div 
  class={cn(
    "card-premium p-6 group relative overflow-hidden transition-all duration-500",
    "hover:border-emerald/30 hover:-translate-y-1.5 hover:shadow-glow",
    className
  )}
  in:fly={{ y: 20, delay, duration: 600 }}
>
  <!-- Background Decoration from Original Design -->
  <div class="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
    <span class="text-8xl select-none">{emoji}</span>
  </div>

  <div class="relative z-10 flex flex-col h-full space-y-4">
    <div class="flex items-center justify-between">
      <div class="w-12 h-12 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald/10 group-hover:border-emerald/20 shadow-sm">
        {emoji}
      </div>
      
      {#if change}
        <div class={cn(
          "px-2.5 py-1 rounded-full text-[10px] font-black border tracking-widest uppercase transition-colors duration-300",
          trend === 'up' ? "bg-emerald/5 text-emerald border-emerald/10 group-hover:bg-emerald/10" : 
          trend === 'down' ? "bg-destructive/5 text-destructive border-destructive/10 group-hover:bg-destructive/10" : 
          "bg-white/5 text-slate-dim border-white/10"
        )}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {change}
        </div>
      {/if}
    </div>

    <div>
      <div class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em] mb-1.5 group-hover:text-emerald transition-colors duration-300">
        {label}
      </div>
      <div class="text-3xl font-heading font-black text-white tracking-tight group-hover:scale-[1.02] origin-left transition-transform duration-300">
        {value}
      </div>
    </div>

    <!-- Progress bar from Original Dashboard -->
    <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 mt-auto">
      <div 
        class={cn(
          "h-full rounded-full transition-all duration-1000 ease-out",
          trend === 'up' ? "bg-emerald shadow-[0_0_8px_rgba(0,200,150,0.4)]" : 
          trend === 'down' ? "bg-destructive shadow-[0_0_8px_rgba(255,77,109,0.4)]" : "bg-slate-dim"
        )}
        style="width: 65%"
      ></div>
    </div>
  </div>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 20px -5px rgba(0, 200, 150, 0.3);
  }
</style>
