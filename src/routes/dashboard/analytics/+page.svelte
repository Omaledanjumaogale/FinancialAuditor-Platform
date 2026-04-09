<script lang="ts">
  import { fly } from 'svelte/transition';
  import {
    BarChart3, TrendingUp, TrendingDown, PieChart,
    Calendar, Download, ArrowRight, DollarSign,
    Flame, Target, Activity
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const metrics = [
    { label: 'Platform Revenue',  value: '₦4.2M',  change: '+18.4%', up: true,  icon: DollarSign, iconStyle: 'background:rgba(16,185,129,0.12);color:#10b981' },
    { label: 'Operational Costs', value: '₦2.4M',  change: '-5.2%',  up: false, icon: Flame,      iconStyle: 'background:rgba(239,68,68,0.12);color:#f87171' },
    { label: 'Enterprise Profit', value: '₦1.8M',  change: '+12.1%', up: true,  icon: TrendingUp,  iconStyle: 'background:rgba(16,185,129,0.12);color:#10b981' },
    { label: 'EBITDA Margin',     value: '34.5%',   change: '+14.5%', up: true,  icon: Target,     iconStyle: 'background:rgba(59,130,246,0.12);color:#60a5fa' },
  ];

  const categories = [
    { name: 'Logistics & Supply', amount: '₦450K', percentage: 45, color: '#10b981' },
    { name: 'Human Capital',      amount: '₦850K', percentage: 35, color: '#f59e0b' },
    { name: 'Growth Marketing',   amount: '₦250K', percentage: 15, color: '#3b82f6' },
    { name: 'Other Expenses',     amount: '₦150K', percentage: 5,  color: '#64748b' },
  ];

  // Deterministic chart data — no Math.random()
  const revenueData   = [42, 58, 48, 71, 55, 68, 52, 80, 65, 49, 75, 88];
  const operatingData = [22, 30, 25, 38, 28, 35, 26, 42, 33, 25, 38, 44];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // KPI trend sparkline (last 6 months, deterministic)
  const sparkData = [
    [60, 65, 58, 72, 68, 88],
    [80, 75, 82, 70, 78, 72],
    [40, 52, 45, 60, 55, 72],
    [55, 60, 58, 66, 62, 75],
  ];

  // Normalize sparkline point to SVG path
  function sparkPath(data: number[]) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const w = 60, h = 24;
    return data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }
</script>

<svelte:head>
  <title>Analytics — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-12" in:fly={{ y: 12, duration: 300 }}>

  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <Activity size={13} style="color:#10b981" aria-hidden="true" />
        <span class="text-xs font-semibold uppercase tracking-wider" style="color:#10b981">Performance Intelligence</span>
      </div>
      <h1 class="text-2xl font-heading font-bold text-white tracking-tight">
        Advanced <span style="color:#10b981">Analytics</span>
      </h1>
      <p class="text-sm mt-1" style="color:#64748b">Real-time financial metrics and AI-powered operational insights.</p>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <button class="flex items-center gap-2 py-2 px-4 text-sm rounded-xl border border-white/10 font-medium transition-all"
        style="color:#94a3b8; background:rgba(255,255,255,0.03);"
        onmouseenter={e => (e.currentTarget as HTMLElement).style.color = '#f1f5f9'}
        onmouseleave={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}>
        <Calendar size={14} aria-hidden="true" />
        Q1 2026
      </button>
      <button class="flex items-center gap-2 py-2 px-4 text-sm rounded-xl font-semibold text-white transition-all"
        style="background:#10b981; box-shadow:0 2px 10px rgba(16,185,129,0.3);">
        <Download size={14} aria-hidden="true" />
        Export Data
      </button>
    </div>
  </div>

  <!-- KPI Metric Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    {#each metrics as m, i (m.label)}
      <div class="rounded-2xl p-5 border border-white/8 space-y-3 hover:border-white/15 transition-all duration-300"
        style="background-color:#111827;" in:fly={{ y: 10, delay: i * 60, duration: 280 }}>
        <div class="flex items-center justify-between">
          <p class="text-xs font-semibold uppercase tracking-wider" style="color:#475569">{m.label}</p>
          <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={m.iconStyle} aria-hidden="true">
            <m.icon size={15} />
          </div>
        </div>
        <div class="flex items-end justify-between gap-2">
          <p class="text-2xl font-heading font-bold text-white tabular-nums">{m.value}</p>
          <!-- Sparkline -->
          <svg width="60" height="24" viewBox="0 0 60 24" aria-hidden="true" class="shrink-0 mb-1">
            <path d={sparkPath(sparkData[i])} fill="none"
              stroke={m.up ? '#10b981' : '#f87171'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class={cn('flex items-center gap-1 text-xs font-semibold w-fit px-2 py-0.5 rounded-lg',
          m.up ? '' : '')}
          style={m.up
            ? 'background:rgba(16,185,129,0.12);color:#6ee7b7;'
            : 'background:rgba(239,68,68,0.12);color:#fca5a5;'}>
          {#if m.up}<TrendingUp size={11} aria-hidden="true" />{:else}<TrendingDown size={11} aria-hidden="true" />{/if}
          {m.change}
        </span>
      </div>
    {/each}
  </div>

  <!-- Chart Grid -->
  <div class="grid lg:grid-cols-3 gap-6">

    <!-- Grouped Bar Chart -->
    <div class="lg:col-span-2 rounded-2xl border border-white/8 p-6" style="background-color:#111827;">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-sm font-semibold text-white flex items-center gap-2">
            <BarChart3 size={15} style="color:#10b981" aria-hidden="true" />
            Performance Matrix
          </h2>
          <p class="text-xs mt-0.5" style="color:#64748b">Inflow vs operational outflow by month</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5">
            <div class="w-2 h-2 rounded-full bg-emerald" aria-hidden="true"></div>
            <span class="text-xs font-medium" style="color:#64748b">Revenue</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-2 h-2 rounded-full" style="background:#f59e0b" aria-hidden="true"></div>
            <span class="text-xs font-medium" style="color:#64748b">Costs</span>
          </div>
        </div>
      </div>

      <div class="h-52 flex items-end gap-1.5" role="img" aria-label="Revenue vs costs bar chart by month">
        {#each months as month, i (month)}
          <div class="flex-1 flex flex-col items-center gap-1 group">
            <div class="w-full flex items-end gap-0.5 h-44">
              <!-- Revenue bar -->
              <div class="flex-1 rounded-t-sm transition-colors duration-200 hover:opacity-90"
                style="height:{revenueData[i]}%; background:rgba(16,185,129,0.25); hover:background:rgba(16,185,129,0.5)"
                title="{month} Revenue: {revenueData[i]}%"
              ></div>
              <!-- Cost bar -->
              <div class="flex-1 rounded-t-sm transition-colors duration-200"
                style="height:{operatingData[i]}%; background:rgba(245,158,11,0.25);"
                title="{month} Costs: {operatingData[i]}%"
              ></div>
            </div>
            <span class="text-[9px] font-semibold uppercase" style="color:#475569">{month}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Budget Allocation -->
    <div class="rounded-2xl border border-white/8 p-6 space-y-5" style="background-color:#111827;">
      <div>
        <h2 class="text-sm font-semibold text-white flex items-center gap-2">
          <PieChart size={15} style="color:#10b981" aria-hidden="true" />
          Budget Allocation
        </h2>
        <p class="text-xs mt-0.5" style="color:#64748b">Departmental spend breakdown</p>
      </div>

      <div class="space-y-4">
        {#each categories as cat (cat.name)}
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full shrink-0" style="background:{cat.color}" aria-hidden="true"></div>
                <span class="font-medium text-white text-xs">{cat.name}</span>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <span style="color:#64748b">{cat.amount}</span>
                <span class="font-semibold text-white tabular-nums w-8 text-right">{cat.percentage}%</span>
              </div>
            </div>
            <div class="w-full h-1.5 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.06)">
              <div class="h-full rounded-full transition-all duration-700"
                style="width:{cat.percentage}%; background:{cat.color}; opacity:0.75"
              ></div>
            </div>
          </div>
        {/each}
      </div>

      <a href="/dashboard/ledger"
        class="flex items-center justify-between w-full p-3 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/3 text-sm font-medium transition-all group"
        style="color:#94a3b8;"
        onmouseenter={e => (e.currentTarget as HTMLElement).style.color = '#10b981'}
        onmouseleave={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
      >
        Full Expense Audit
        <ArrowRight size={14} class="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </a>
    </div>
  </div>

  <!-- Bottom KPI Table -->
  <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color:#111827;">
    <div class="px-6 py-4 border-b border-white/8">
      <h2 class="text-sm font-semibold text-white">Financial KPI Summary</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse" aria-label="Financial KPI summary">
        <thead>
          <tr style="background-color:#1f2937;">
            {#each ['Metric', 'Q1 2026', 'Q4 2025', 'Change', 'Status'] as col (col)}
              <th class="px-6 py-3 text-[10px] font-semibold uppercase tracking-widest" style="color:#475569">{col}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each [
            { metric: 'Revenue',        q1: '₦4.2M',  q4: '₦3.5M',  change: '+20%',  ok: true  },
            { metric: 'Gross Margin',   q1: '68.4%',  q4: '65.1%',  change: '+3.3%', ok: true  },
            { metric: 'OpEx',           q1: '₦2.4M',  q4: '₦2.5M',  change: '-4%',   ok: true  },
            { metric: 'Net Profit',     q1: '₦1.8M',  q4: '₦1.0M',  change: '+80%',  ok: true  },
            { metric: 'Cash Burn Rate', q1: '₦201K',  q4: '₦240K',  change: '-16%',  ok: true  },
            { metric: 'FIRS Liability', q1: '₦580K',  q4: '₦620K',  change: '-6.5%', ok: true  },
          ] as row (row.metric)}
            <tr class="border-t hover:bg-white/3 transition-colors" style="border-color:rgba(255,255,255,0.06)">
              <td class="px-6 py-3.5 text-sm font-medium text-white">{row.metric}</td>
              <td class="px-6 py-3.5 text-sm text-white tabular-nums font-semibold">{row.q1}</td>
              <td class="px-6 py-3.5 text-sm tabular-nums" style="color:#64748b">{row.q4}</td>
              <td class="px-6 py-3.5">
                <span class="text-xs font-bold tabular-nums" style={row.ok ? 'color:#6ee7b7' : 'color:#fca5a5'}>{row.change}</span>
              </td>
              <td class="px-6 py-3.5">
                <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg" style="background:rgba(16,185,129,0.12);color:#6ee7b7">On Track</span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
