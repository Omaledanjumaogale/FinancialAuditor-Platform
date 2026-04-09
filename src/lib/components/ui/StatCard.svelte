<script lang="ts">
  import { fly } from 'svelte/transition';
  import { TrendingUp, TrendingDown, Minus } from 'lucide-svelte';

  interface Props {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: any;
    color?: 'brand' | 'accent' | 'info' | 'danger' | 'neutral';
    prefix?: string;
    suffix?: string;
    delay?: number;
    loading?: boolean;
  }

  let {
    label,
    value,
    change,
    trend = 'neutral' as 'up' | 'down' | 'neutral',
    icon: Icon,
    color = 'brand' as 'brand' | 'accent' | 'info' | 'danger' | 'neutral',
    prefix = '',
    suffix = '',
    delay = 0,
    loading = false,
  } = $props();

  // Pure inline-style color map — no dark: Tailwind classes needed
  const iconStyleMap = {
    brand:   'background:rgba(16,185,129,0.12);color:#10b981',
    accent:  'background:rgba(245,158,11,0.12);color:#f59e0b',
    info:    'background:rgba(59,130,246,0.12);color:#60a5fa',
    danger:  'background:rgba(239,68,68,0.12);color:#f87171',
    neutral: 'background:rgba(255,255,255,0.06);color:#94a3b8',
  };

  const trendStyleMap = {
    up:      { Icon: TrendingUp,   badge: 'background:rgba(16,185,129,0.12);color:#6ee7b7' },
    down:    { Icon: TrendingDown, badge: 'background:rgba(239,68,68,0.12);color:#fca5a5' },
    neutral: { Icon: Minus,        badge: 'background:rgba(255,255,255,0.06);color:#94a3b8' },
  };

  const iconStyle   = $derived((iconStyleMap as Record<string, string>)[color]);
  const trendConfig = $derived((trendStyleMap as Record<string, { Icon: typeof TrendingUp | typeof TrendingDown | typeof Minus; badge: string }>)[trend]);
  const TrendIcon   = $derived(trendConfig.Icon);
</script>

<div
  class="rounded-2xl p-5 border border-white/8 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
  style="background-color:#111827;"
  in:fly={{ y: 12, delay, duration: 300 }}
>
  {#if loading}
    <!-- Skeleton -->
    <div class="space-y-3 animate-pulse">
      <div class="h-3 w-24 rounded" style="background:rgba(255,255,255,0.06)"></div>
      <div class="h-8 w-32 rounded" style="background:rgba(255,255,255,0.06)"></div>
      <div class="h-2 w-20 rounded" style="background:rgba(255,255,255,0.06)"></div>
    </div>
  {:else}
    <!-- Header row -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] mb-1" style="color:#475569">{label}</p>
        <div class="flex items-baseline gap-1.5 mt-1">
          {#if prefix}<span class="text-base font-semibold" style="color:#64748b">{prefix}</span>{/if}
          <span class="text-2xl font-heading font-bold text-white tabular-nums">{value}</span>
          {#if suffix}<span class="text-base font-semibold" style="color:#64748b">{suffix}</span>{/if}
        </div>
      </div>
      {#if Icon}
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={iconStyle} aria-hidden="true">
          <Icon size={18} />
        </div>
      {/if}
    </div>

    <!-- Trend Badge -->
    {#if change}
      <div class="flex items-center gap-2 mt-auto pt-3 border-t" style="border-color:rgba(255,255,255,0.06)">
        <div class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold" style={trendConfig.badge}>
          <TrendIcon size={11} aria-hidden="true" />
          <span>{change}</span>
        </div>
        <span class="text-xs" style="color:#475569">vs last period</span>
      </div>
    {/if}
  {/if}
</div>
