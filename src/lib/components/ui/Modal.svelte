<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';

  interface Props {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    maxWidth?: string;
    children?: any;
    emoji?: string;
  }

  let { 
    id, 
    isOpen, 
    onClose, 
    title, 
    subtitle, 
    maxWidth = '560px', 
    children,
    emoji
  }: Props = $props();

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }

  // Prevent background scrolling when modal is open
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
    transition:fade={{ duration: 300 }}
  >
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-navy/90 backdrop-blur-xl" 
      onclick={onClose}
    ></div>

    <!-- Modal Box -->
    <div 
      class={cn(
        "relative w-full bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl z-10 transition-all duration-500",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald/[0.03] before:to-transparent before:pointer-events-none"
      )}
      style="max-width: {maxWidth}"
      transition:fly={{ y: 40, duration: 600, opacity: 0 }}
    >
      <div class="p-8 md:p-12 relative z-10">
        <!-- Header -->
        <div class="flex items-start justify-between mb-10">
          <div class="space-y-2">
            {#if emoji}
              <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 shadow-sm border border-white/5">
                {emoji}
              </div>
            {/if}
            {#if title}
              <h3 class="text-3xl font-heading font-black text-white tracking-tighter leading-none">{title}</h3>
            {/if}
            {#if subtitle}
              <p class="text-slate-dim text-sm font-medium tracking-tight uppercase leading-relaxed">{subtitle}</p>
            {/if}
          </div>
          
          <button 
            onclick={onClose}
            class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-dim hover:text-white hover:bg-white/10 transition-all duration-300 group active:scale-95"
            aria-label="Close modal"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="group-hover:rotate-90 transition-transform duration-500">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="space-y-6">
          {@render children?.()}
        </div>
      </div>

      <!-- Decorative Footer -->
      <div class="h-1.5 w-full bg-gradient-to-r from-emerald/20 via-emerald to-emerald/20 opacity-30"></div>
    </div>
  </div>
{/if}

<style>
  /* Ensure the modal is always centered on screen */
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
