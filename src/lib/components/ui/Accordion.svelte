<script lang="ts">
  import { cn } from '$lib/utils';
  import { slide } from 'svelte/transition';

  interface AccordionItem {
    question: string;
    answer: string;
    emoji?: string;
  }

  interface Props {
    items: AccordionItem[];
    class?: string;
  }

  let { items, class: className } = $props<Props>();
  let openIndex = $state<number | null>(null);

  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(index);
    }
  }
</script>

<div class={cn("space-y-3 w-full", className)} role="list" aria-label="Frequently asked questions">
  {#each items as item, i (item.question)}
    {@const panelId = `faq-panel-${i}`}
    {@const buttonId = `faq-btn-${i}`}
    {@const isOpen = openIndex === i}
    <div
      class={cn(
        "card-premium overflow-hidden transition-all duration-300",
        isOpen ? "border-emerald/40 bg-emerald/2" : "hover:border-white/20"
      )}
      role="listitem"
    >
      <button
        id={buttonId}
        onclick={() => toggle(i)}
        onkeydown={(e) => handleKeydown(e, i)}
        class="w-full px-6 py-5 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-t-xl"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div class="flex items-center gap-4 pr-4">
          {#if item.emoji}
            <span
              class="text-xl group-hover:scale-110 transition-transform duration-300 select-none"
              aria-hidden="true"
            >{item.emoji}</span>
          {/if}
          <span class="font-heading font-bold text-white tracking-tight text-base md:text-lg group-hover:text-emerald transition-colors duration-300">
            {item.question}
          </span>
        </div>

        <div
          class={cn(
            "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center transition-all duration-500",
            isOpen ? "rotate-180 bg-emerald text-white" : "bg-white/5 text-slate-dim group-hover:text-white group-hover:bg-white/10"
          )}
          aria-hidden="true"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </button>

      {#if isOpen}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          transition:slide={{ duration: 350 }}
        >
          <div class="px-6 pb-6 pt-0">
            <div class="h-px w-full bg-white/10 mb-5" aria-hidden="true"></div>
            <p class="text-slate leading-relaxed text-base">
              {item.answer}
            </p>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
