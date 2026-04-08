<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    BarChart3, TrendingUp, TrendingDown, ArrowUpRight, 
    ArrowDownRight, Calendar, Download, Filter, 
    MoreHorizontal, Activity, PieChart, Target, ArrowRight
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import StatCard from '$lib/components/ui/StatCard.svelte';

  const metrics = [
    { label: 'Platform Revenue', value: '₦4.2M', change: '18.4%', trend: 'up' as const, emoji: '💰' },
    { label: 'Operational Costs', value: '₦2.4M', change: '5.2%', trend: 'down' as const, emoji: '💸' },
    { label: 'Enterprise Profit', value: '₦1.8M', change: '12.1%', trend: 'up' as const, emoji: '💎' },
    { label: 'EBITDA Margin', value: '34.5%', change: '14.5%', trend: 'up' as const, emoji: '📊' }
  ];

  const categories = [
    { name: 'Logistics & Supply', amount: '₦450K', percentage: 45, emoji: '🚚', color: 'emerald' },
    { name: 'Human Capital', amount: '₦850K', percentage: 35, emoji: '👥', color: 'gold' },
    { name: 'Growth Marketing', amount: '₦250K', percentage: 15, emoji: '🚀', color: 'emerald' },
    { name: 'Others', amount: '₦150K', percentage: 5, emoji: '📦', color: 'white' }
  ];
</script>

<div class="space-y-10 pb-20 relative z-10 w-full" in:fade>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div class="space-y-2">
      <div class="flex items-center gap-3 text-[10px] font-black text-emerald uppercase tracking-[0.3em] mb-1">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
        </span>
        Performance Intelligence
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">Advanced <span class="text-emerald">Analytics</span></h1>
      <p class="text-slate text-lg font-medium max-w-2xl">Deep-dive into enterprise financial metrics and operational efficiency with real-time AI projections.</p>
    </div>
    <div class="flex items-center gap-4">
      <button class="btn-secondary py-3 px-6 text-xs flex items-center gap-3 group">
        <span class="text-lg group-hover:rotate-12 transition-transform duration-300">📅</span>
        Q1 2026 Analysis
      </button>
      <button class="btn-primary py-3 px-8 text-xs flex items-center gap-3 shadow-glow group">
        <span class="text-lg group-hover:scale-125 transition-transform duration-300">📥</span>
        Export Dataset
      </button>
    </div>
  </div>

  <!-- Key Metrics Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each metrics as metric, i}
      <StatCard {...metric} delay={100 + (i * 100)} />
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Sophisticated Performance Chart Area -->
    <div class="lg:col-span-2 card-premium p-10 bg-surface/40 backdrop-blur-sm relative overflow-hidden group">
      <!-- Background Decoration -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald/10 transition-all duration-700"></div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-16 relative z-10">
        <div class="space-y-1">
          <h3 class="text-2xl font-heading font-black text-white flex items-center gap-3">
            <span class="text-3xl">📈</span>
            Performance Matrix
          </h3>
          <p class="text-sm text-slate font-medium">Comparative analysis of inflow vs operational outflow.</p>
        </div>
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center gap-2.5 text-[10px] font-black text-emerald uppercase tracking-widest">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(0,200,150,0.4)]"></span> Gross Revenue
          </div>
          <div class="flex items-center gap-2.5 text-[10px] font-black text-gold uppercase tracking-widest">
            <span class="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_rgba(245,166,35,0.4)]"></span> Operational Burn
          </div>
        </div>
      </div>

      <div class="h-80 relative flex items-end gap-4 px-2 group/chart mb-6">
        {#each Array(12) as _, i}
          <div class="flex-1 flex flex-col items-center gap-2 relative group/bar h-full justify-end">
            <!-- Burn Bar -->
            <div 
              class="w-full bg-gold/10 rounded-t-lg group-hover/bar:bg-gold/30 transition-all duration-700 relative overflow-hidden"
              style="height: {20 + Math.random() * 40}%"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-gold/40 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity duration-500"></div>
            </div>
            <!-- Revenue Bar -->
            <div 
              class="w-full bg-emerald/10 rounded-t-lg group-hover/bar:bg-emerald/30 transition-all duration-700 relative overflow-hidden -mt-1"
              style="height: {40 + Math.random() * 50}%"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-emerald/40 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity duration-500"></div>
            </div>
            <span class="text-[9px] font-black text-slate-dim uppercase tracking-tighter group-hover/bar:text-white transition-colors mt-2">
              {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Expenditure Breakdown -->
    <div class="card-premium p-10 bg-surface/40 backdrop-blur-sm space-y-10 group">
      <div class="space-y-1">
        <h3 class="text-2xl font-heading font-black text-white flex items-center gap-3">
          <span class="text-3xl">🧭</span>
          Allocation
        </h3>
        <p class="text-sm text-slate font-medium">Departmental spend analysis.</p>
      </div>

      <div class="space-y-8">
        {#each categories as cat}
          <div class="space-y-3 group/item cursor-pointer">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-xl group-hover/item:scale-125 transition-transform duration-300">{cat.emoji}</span>
                <span class="text-sm font-bold text-white group-hover/item:text-emerald transition-colors">{cat.name}</span>
              </div>
              <span class="text-sm font-black text-white">{cat.percentage}%</span>
            </div>
            <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                class={cn(
                  "h-full rounded-full transition-all duration-1000 group-hover/item:brightness-125",
                  cat.color === 'emerald' ? "bg-emerald shadow-glow-sm" : 
                  cat.color === 'gold' ? "bg-gold" : "bg-white/20"
                )}
                style="width: {cat.percentage}%"
              ></div>
            </div>
            <div class="flex justify-between items-center opacity-0 group-hover/item:opacity-100 transition-opacity">
              <span class="text-[10px] font-black text-slate-dim uppercase tracking-widest">Calculated Burn</span>
              <span class="text-[10px] font-black text-white">{cat.amount}</span>
            </div>
          </div>
        {/each}
      </div>

      <button class="w-full py-4 rounded-xl border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white/20 transition-all mt-4 group/btn">
        Full Expense Audit <ArrowRight size={14} class="inline ml-2 group-hover/btn:translate-x-2 transition-transform" />
      </button>
    </div>
  </div>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
  .shadow-glow-sm {
    box-shadow: 0 0 15px -2px rgba(0, 200, 150, 0.3);
  }
</style>
