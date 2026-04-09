<script lang="ts">
  import { fly } from 'svelte/transition';
  import { BarChart2, TrendingUp, TrendingDown, ShieldCheck, FileText, DollarSign, Activity, ArrowUpRight, Users, AlertCircle } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import StatCard from '$lib/components/ui/StatCard.svelte';
  import { useQuery } from 'convex-svelte';
  import { api } from '$convex/_generated/api';

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const statsQuery = $derived(
    currentUser ? useQuery(api.stats.getByUserId, { userId: currentUser._id }) : null
  );
  const stats = $derived(statsQuery?.data);

  const recentQuery = $derived(
    currentUser ? useQuery(api.ledger.getRecent, { userId: currentUser._id, limit: 5 }) : null
  );
  const recentTransactions = $derived(recentQuery?.data || []);

  const statCards = $derived([
    {
      label: 'Total Revenue',
      value: stats?.totalRevenue ? `₦${(stats.totalRevenue / 1000000).toFixed(1)}M` : '₦0',
      icon: DollarSign,
      trend: stats?.revenueTrend ?? 12.4,
      color: 'emerald',
      sub: 'This fiscal year',
    },
    {
      label: 'Compliance Score',
      value: `${stats?.complianceScore ?? 94}%`,
      icon: ShieldCheck,
      trend: stats?.complianceTrend ?? 2.1,
      color: 'blue',
      sub: 'FIRS & CAC rating',
    },
    {
      label: 'Pending Audits',
      value: String(stats?.pendingAudits ?? 3),
      icon: FileText,
      trend: stats?.auditTrend ?? -1,
      color: 'amber',
      sub: 'Awaiting review',
    },
    {
      label: 'Monthly Spend',
      value: stats?.monthlySpend ? `₦${(stats.monthlySpend / 1000).toFixed(0)}K` : '₦0',
      icon: TrendingUp,
      trend: stats?.spendTrend ?? 5.3,
      color: 'purple',
      sub: 'Vs previous month',
    },
  ]);

  // Deterministic bar heights for chart (no random)
  const chartBars = [
    { label: 'Jan', h: 55 }, { label: 'Feb', h: 72 }, { label: 'Mar', h: 48 },
    { label: 'Apr', h: 88 }, { label: 'May', h: 65 }, { label: 'Jun', h: 92 },
    { label: 'Jul', h: 70 }, { label: 'Aug', h: 83 }, { label: 'Sep', h: 60 },
    { label: 'Oct', h: 95 }, { label: 'Nov', h: 78 }, { label: 'Dec', h: 100 },
  ];

  const recentActivity = [
    { action: 'AI audit completed', detail: 'Q3 Financial Report', time: '2 min ago', icon: ShieldCheck, color: 'text-emerald' },
    { action: 'Invoice processed',   detail: 'Dangote Cement Ltd',  time: '18 min ago', icon: FileText,   color: 'text-blue-400' },
    { action: 'Alert triggered',     detail: 'VAT variance detected', time: '1 hr ago', icon: AlertCircle, color: 'text-amber-400' },
    { action: 'Auditor hired',       detail: 'Dr. Chima Eze',        time: '3 hrs ago', icon: Users,       color: 'text-purple-400' },
  ];
</script>

<svelte:head>
  <title>Dashboard — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-10" in:fly={{ y: 10, duration: 300 }}>

  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-heading font-bold text-white tracking-tight">
        Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},
        {currentUser?.name?.split(' ')[0] || 'there'} 👋
      </h1>
      <p class="text-sm text-slate mt-0.5">Here's your financial overview for today.</p>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-slate-dim px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
        {new Date().toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
      </span>
      <a href="/dashboard/audit" class="btn-primary flex items-center gap-1.5 py-2 px-4 text-sm rounded-xl">
        <Activity size={14} aria-hidden="true" />
        New Audit
      </a>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    {#each statCards as stat, i (stat.label)}
      <div
        class="rounded-2xl p-5 border border-white/8 space-y-3 hover:border-white/15 transition-all duration-300"
        style="background-color: #111827;"
        in:fly={{ y: 12, delay: i * 60, duration: 300 }}
      >
        <div class="flex items-center justify-between">
          <p class="text-xs font-semibold text-slate-dim uppercase tracking-wider">{stat.label}</p>
          <div class="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5" aria-hidden="true">
            <stat.icon size={15} class="text-emerald" />
          </div>
        </div>
        <p class="text-2xl font-heading font-bold text-white tabular-nums">{stat.value}</p>
        <div class="flex items-center justify-between">
          <p class="text-xs text-slate-dim">{stat.sub}</p>
          <span class={cn('flex items-center gap-1 text-xs font-semibold', stat.trend >= 0 ? 'text-emerald' : 'text-red-400')}>
            {#if stat.trend >= 0}
              <TrendingUp size={11} aria-hidden="true" />+{stat.trend}%
            {:else}
              <TrendingDown size={11} aria-hidden="true" />{stat.trend}%
            {/if}
          </span>
        </div>
      </div>
    {/each}
  </div>

  <!-- Main Content: Chart + Activity -->
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

    <!-- Revenue Chart -->
    <div class="xl:col-span-2 rounded-2xl border border-white/8 p-6" style="background-color: #111827;">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-sm font-semibold text-white">Revenue Overview</h2>
          <p class="text-xs text-slate-dim mt-0.5">Monthly breakdown — FY 2025/26</p>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-emerald font-semibold bg-emerald/10 px-3 py-1.5 rounded-lg border border-emerald/20">
          <TrendingUp size={12} aria-hidden="true" />
          +18.2% YoY
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="flex items-end gap-1.5 h-40 px-2" role="img" aria-label="Monthly revenue bar chart">
        {#each chartBars as bar (bar.label)}
          <div class="flex-1 flex flex-col items-center gap-1 group">
            <div
              class="w-full rounded-t-md bg-emerald/30 group-hover:bg-emerald transition-colors duration-200 relative"
              style="height: {bar.h}%"
              title="{bar.label}: {bar.h}% of peak"
            >
              <div class="absolute bottom-0 left-0 right-0 h-full rounded-t-md"
                style="background: linear-gradient(to top, rgba(16,185,129,0.7), rgba(16,185,129,0.2))">
              </div>
            </div>
            <span class="text-[9px] text-slate-dim">{bar.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="rounded-2xl border border-white/8 p-6 space-y-4" style="background-color: #111827;">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold text-white">Recent Activity</h2>
        <a href="/dashboard/logs" class="text-xs text-emerald hover:underline flex items-center gap-1">
          View all <ArrowUpRight size={11} />
        </a>
      </div>
      <div class="space-y-3">
        {#each recentActivity as item (item.action + item.time)}
          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
              <item.icon size={13} class={item.color} />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{item.action}</p>
              <p class="text-xs text-slate-dim truncate">{item.detail}</p>
            </div>
            <span class="text-[10px] text-slate-dim whitespace-nowrap">{item.time}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Recent Transactions -->
  <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color: #111827;">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8">
      <h2 class="text-sm font-semibold text-white">Recent Transactions</h2>
      <a href="/dashboard/ledger" class="text-xs text-emerald hover:underline flex items-center gap-1">
        View all <ArrowUpRight size={11} />
      </a>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr style="background-color: #1f2937;">
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Description</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Date</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Category</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {#if recentTransactions.length === 0}
            {#each [
              { desc: 'Q3 External Audit Fee',   date: 'Apr 09, 2026', cat: 'Audit',    amount: -85000, credit: false },
              { desc: 'FIRS Tax Remittance',      date: 'Apr 08, 2026', cat: 'Tax',      amount: -220000, credit: false },
              { desc: 'Client Retainer Fee',      date: 'Apr 07, 2026', cat: 'Revenue',  amount: 500000,  credit: true },
              { desc: 'Paystack Settlement',      date: 'Apr 06, 2026', cat: 'Payment',  amount: 145000,  credit: true },
              { desc: 'Office Lease Payment',     date: 'Apr 05, 2026', cat: 'Expense',  amount: -60000,  credit: false },
            ] as tx (tx.desc)}
              <tr class="border-t border-white/8 hover:bg-white/3 transition-colors">
                <td class="px-6 py-4 text-sm text-white font-medium">{tx.desc}</td>
                <td class="px-6 py-4 text-xs text-slate-dim">{tx.date}</td>
                <td class="px-6 py-4">
                  <span class="text-[11px] font-semibold px-2 py-0.5 rounded-lg"
                    style={tx.credit ? 'background:rgba(16,185,129,0.15);color:#6ee7b7' : 'background:rgba(239,68,68,0.12);color:#fca5a5'}>
                    {tx.cat}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm font-bold text-right {tx.credit ? 'text-emerald' : 'text-red-400'} tabular-nums">
                  {tx.credit ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                </td>
              </tr>
            {/each}
          {:else}
            {#each recentTransactions as tx (tx._id)}
              <tr class="border-t border-white/8 hover:bg-white/3 transition-colors">
                <td class="px-6 py-4 text-sm text-white font-medium">{tx.description}</td>
                <td class="px-6 py-4 text-xs text-slate-dim">{new Date(tx.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td class="px-6 py-4 text-xs text-slate-dim capitalize">{tx.category}</td>
                <td class="px-6 py-4 text-sm font-bold text-right {tx.amount >= 0 ? 'text-emerald' : 'text-red-400'} tabular-nums">
                  {tx.amount >= 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
