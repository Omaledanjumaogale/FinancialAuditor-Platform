<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Calendar, Download, Filter, MoreHorizontal } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const metrics = [
    { label: 'Revenue', value: '₦4.2M', change: '+18.4%', status: 'up', emoji: '💰' },
    { label: 'Expenses', value: '₦2.4M', change: '-5.2%', status: 'down', emoji: '💸' },
    { label: 'Net Profit', value: '₦1.8M', change: '+12.1%', status: 'up', emoji: '💎' },
    { label: 'EBITDA', value: '₦2.1M', change: '+14.5%', status: 'up', emoji: '📊' }
  ];

  const categories = [
    { name: 'Logistics', amount: '₦450K', percentage: 45, color: 'danger' },
    { name: 'Personnel', amount: '₦850K', percentage: 35, color: 'emerald' },
    { name: 'Marketing', amount: '₦250K', percentage: 15, color: 'gold' },
    { name: 'Others', amount: '₦150K', percentage: 5, color: 'info' }
  ];
</script>

<div class="space-y-8" in:fade>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-heading font-black text-white">Advanced Analytics 📈</h1>
      <p class="text-slate-dim">Real-time financial intelligence and performance insights.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2.5 px-6 border-white/10 text-white flex items-center gap-2">
        <Calendar size={18} />
        Last 30 Days
      </button>
      <button class="btn-primary py-2.5 px-6 flex items-center gap-2">
        <Download size={18} />
        Export Report
      </button>
    </div>
  </div>

  <!-- Key Metrics -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each metrics as metric}
      <div class="card-premium p-6 group">
        <div class="flex justify-between items-start mb-4">
          <div class="text-3xl group-hover:scale-110 transition-transform">{metric.emoji}</div>
          <div class={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
            metric.status === 'up' ? "bg-emerald/10 text-emerald" : "bg-danger/10 text-danger"
          )}>
            {#if metric.status === 'up'}<ArrowUpRight size={12} />{:else}<ArrowDownRight size={12} />{/if}
            {metric.change}
          </div>
        </div>
        <div class="text-sm font-bold text-slate-dim uppercase tracking-widest mb-1">{metric.label}</div>
        <div class="text-3xl font-heading font-black text-white">{metric.value}</div>
      </div>
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Revenue vs Expenses Chart -->
    <div class="lg:col-span-2 card-premium p-8">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-xl font-heading font-bold text-white flex items-center gap-2">
          <span>📉</span> Performance Overview
        </h3>
        <div class="flex gap-4">
          <div class="flex items-center gap-2 text-xs font-bold text-emerald">
            <span class="w-3 h-3 rounded-full bg-emerald"></span> Revenue
          </div>
          <div class="flex items-center gap-2 text-xs font-bold text-danger">
            <span class="w-3 h-3 rounded-full bg-danger"></span> Expenses
          </div>
        </div>
      </div>

      <div class="h-80 relative flex items-end gap-3 px-4">
        {#each Array(12) as _, i}
          <div class="flex-1 flex flex-col items-center gap-1 group relative">
            <div 
              class="w-full bg-emerald/20 border border-emerald/30 rounded-t-lg transition-all group-hover:bg-emerald group-hover:border-emerald"
              style={`height: ${Math.random() * 60 + 20}%`}
            ></div>
            <div 
              class="w-full bg-danger/20 border border-danger/30 rounded-t-lg transition-all group-hover:bg-danger group-hover:border-danger"
              style={`height: ${Math.random() * 30 + 10}%`}
            ></div>
            <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-navy text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
              ₦{(Math.random() * 800).toFixed(0)}K Net
            </div>
          </div>
        {/each}
      </div>
      <div class="flex justify-between mt-6 text-[10px] font-mono text-slate-dim uppercase tracking-[0.2em] border-t border-white/5 pt-4 px-4">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
      </div>
    </div>

    <!-- Expense Categories -->
    <div class="card-premium p-8">
      <h3 class="text-xl font-heading font-bold text-white mb-8 flex items-center gap-2">
        <span>🏷️</span> Expense Breakdown
      </h3>
      <div class="space-y-8">
        {#each categories as cat}
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
              <span class="font-bold text-white">{cat.name}</span>
              <span class="text-slate-dim">{cat.amount} · {cat.percentage}%</span>
            </div>
            <div class="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                class={cn("h-full rounded-full transition-all duration-1000", 
                  cat.color === 'emerald' ? "bg-emerald" : 
                  cat.color === 'danger' ? "bg-danger" : 
                  cat.color === 'gold' ? "bg-gold" : "bg-info")} 
                style={`width: ${cat.percentage}%`}
              ></div>
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-12 p-6 bg-linear-to-br from-emerald/10 to-transparent border border-emerald/20 rounded-2xl">
        <div class="text-2xl mb-4">💡</div>
        <div class="text-xs font-heading font-bold text-emerald mb-1 uppercase tracking-widest">AI INSIGHT</div>
        <p class="text-xs text-slate-dim leading-relaxed">
          Switching your personnel payments to <span class="text-white font-bold">KoraPay</span> could save you ₦42K in transaction fees monthly.
        </p>
      </div>
    </div>
  </div>
</div>
