<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';

  interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    emoji: string;
  }

  let toasts = $state<Toast[]>([]);
  let count = 0;

  export function add(message: string, type: Toast['type'] = 'info', emoji: string = 'ℹ️') {
    const id = count++;
    toasts = [...toasts, { id, message, type, emoji }];
    setTimeout(() => {
      remove(id);
    }, 5000);
  }

  function remove(id: number) {
    toasts = toasts.filter(t => t.id !== id);
  }
</script>

<div class="fixed bottom-8 right-8 z-[2000] flex flex-col gap-4 max-w-sm w-full pointer-events-none">
  {#each toasts as toast (toast.id)}
    <div 
      class={cn(
        "p-5 rounded-2xl border bg-surface/80 backdrop-blur-2xl shadow-2xl pointer-events-auto group relative overflow-hidden flex items-start gap-4 transition-all duration-300",
        toast.type === 'success' ? "border-emerald/30 shadow-emerald/5" : 
        toast.type === 'error' ? "border-danger/30 shadow-danger/5" : 
        toast.type === 'warning' ? "border-gold/30 shadow-gold/5" : "border-white/10 shadow-white/5"
      )}
      in:fly={{ x: 100, duration: 600 }}
      out:fade={{ duration: 300 }}
    >
      <!-- Type-specific Gradient -->
      <div class={cn(
        "absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity duration-700",
        toast.type === 'success' ? "bg-emerald" : 
        toast.type === 'error' ? "bg-danger" : 
        toast.type === 'warning' ? "bg-gold" : "bg-white"
      )}></div>

      <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
        {toast.emoji}
      </div>

      <div class="flex-1 pr-8">
        <div class="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-50">
          {toast.type} notification
        </div>
        <p class="text-white text-sm font-medium leading-relaxed tracking-tight">
          {toast.message}
        </p>
      </div>

      <button 
        onclick={() => remove(toast.id)}
        class="absolute top-4 right-4 text-slate-dim hover:text-white transition-colors p-1"
        aria-label="Dismiss notification"
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Bottom Progress Bar -->
      <div class={cn(
        "absolute bottom-0 left-0 h-1 bg-current opacity-20 w-full origin-left animate-toast-progress",
        toast.type === 'success' ? "text-emerald" : 
        toast.type === 'error' ? "text-danger" : 
        toast.type === 'warning' ? "text-gold" : "text-white"
      )}></div>
    </div>
  {/each}
</div>

<style>
  @keyframes toast-progress {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }
  .animate-toast-progress {
    animation: toast-progress 5000ms linear forwards;
  }
</style>
