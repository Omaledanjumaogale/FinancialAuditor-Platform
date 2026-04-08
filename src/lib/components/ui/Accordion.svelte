<script lang="ts">
  import { cn } from '$lib/utils';
  import { slide } from 'svelte/transition';

  interface Props {
    items: {
      question: string;
      answer: string;
      emoji?: string;
    }[];
    class?: string;
  }

  let { items, class: className } = $props<Props>();
  let openIndex = $state<number | null>(null);

  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<div class={cn("space-y-4 w-full", className)}>
  {#each items as item, i}
    <div 
      class={cn(
        "card-premium overflow-hidden transition-all duration-300",
        openIndex === i ? "border-emerald/40 bg-emerald/[0.02]" : "hover:border-white/20"
      )}
    >
      <button 
        onclick={() => toggle(i)}
        class="w-full px-6 py-5 flex items-center justify-between text-left group"
        aria-expanded={openIndex === i}
      >
        <div class="flex items-center gap-4">
          {#if item.emoji}
            <span class="text-xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
          {/if}
          <span class="font-heading font-bold text-white tracking-tight text-lg group-hover:text-emerald transition-colors duration-300">
            {item.question}
          </span>
        </div>
        
        <div class={cn(
          "w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center transition-all duration-500",
          openIndex === i ? "rotate-180 bg-emerald text-white" : "text-slate-dim group-hover:text-white group-hover:bg-white/10"
        )}>
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </button>

      {#if openIndex === i}
        <div transition:slide={{ duration: 400 }}>
          <div class="px-6 pb-6 pt-0">
            <div class="h-px w-full bg-white/10 mb-6"></div>
            <p class="text-slate leading-relaxed text-base">
              {item.answer}
            </p>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
