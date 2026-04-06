<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SEO from '$lib/components/SEO.svelte';

  const stats = [
    { icon: '💰', label: 'Total Revenue', value: '₦4.2M', trend: '↑ 18.4%', trendColor: 'emerald', bgColor: 'emerald' },
    { icon: '💎', label: 'Net Profit', value: '₦1.8M', trend: '↑ 12.1%', trendColor: 'gold', bgColor: 'gold' },
    { icon: '💸', label: 'Total Expenses', value: '₦2.4M', trend: '↓ 5.2%', trendColor: 'rose', bgColor: 'rose' },
    { icon: '💳', label: 'Cash Balance', value: '₦940K', trend: 'Available', trendColor: 'blue', bgColor: 'blue' }
  ];

  const transactions = [
    { icon: '📤', name: 'Sales — Agromart Ltd', date: '15 Jun 2025', amount: '+₦320K', type: 'income', color: 'emerald' },
    { icon: '📥', name: 'Logistics — Swift Cargo', date: '14 Jun 2025', amount: '−₦85K', type: 'expense', color: 'rose' },
    { icon: '📤', name: 'Wholesale — Lagos Hub', date: '13 Jun 2025', amount: '+₦560K', type: 'income', color: 'emerald' },
    { icon: '📥', name: 'Salaries — June 2025', date: '12 Jun 2025', amount: '−₦210K', type: 'expense', color: 'rose' }
  ];

  const insights = [
    { icon: '🤖', title: 'OPPORTUNITY', message: 'Cut logistics 12% → Save ₦216K in Q3. AI found 3 better carrier routes.', color: 'emerald' },
    { icon: '⚠️', title: 'ANOMALY', message: 'Duplicate payment Sunny Electronics ₦45,000 — 10 & 11 Jun. Review needed.', color: 'rose' },
    { icon: '📅', title: 'TAX REMINDER', message: 'VAT filing due in 14 days. Estimated ₦312,000. Auto-file available.', color: 'gold' }
  ];
</script>

<SEO title="Dashboard" description="Manage your financial intelligence, audits, and transactions." />

<!-- KPI GRID -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  {#each stats as stat, i}
    <div class="card p-6 group" in:fly={{ y: 20, delay: 100 * i, duration: 500 }}>
      <div class="flex items-center justify-between mb-4">
        <span class="text-[10px] font-mono text-slate-dim uppercase tracking-widest">{stat.label}</span>
        <div class="w-10 h-10 rounded-xl bg-{stat.bgColor}/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
          {stat.icon}
        </div>
      </div>
      <div class="text-3xl font-bold text-white mb-2">{stat.value}</div>
      <div class="text-[11px] font-bold text-{stat.trendColor} uppercase tracking-wider">
        {stat.trend} <span class="text-slate-dim font-normal normal-case">vs last period</span>
      </div>
    </div>
  {/each}
</div>

<!-- CHARTS & INSIGHTS ROW -->
<div class="grid lg:grid-cols-3 gap-8 mb-12">
  <!-- Revenue Chart Placeholder -->
  <div class="lg:col-span-2 card p-8 border-white/5 relative overflow-hidden">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-lg font-bold text-white mb-1">Revenue vs Expenses</h3>
        <p class="text-xs text-slate-dim">Monthly · FY 2026 Overview</p>
      </div>
      <div class="flex gap-2">
        <button class="px-3 py-1 rounded-lg bg-emerald/10 border border-emerald/30 text-emerald text-[10px] font-bold uppercase tracking-widest">6M</button>
        <button class="px-3 py-1 rounded-lg bg-white/5 text-slate-dim text-[10px] font-bold uppercase tracking-widest">12M</button>
      </div>
    </div>
    
    <!-- Chart Mockup -->
    <div class="h-[200px] w-full flex items-end gap-3 px-2">
      {#each [40, 65, 55, 80, 75, 95] as height, i}
        <div class="flex-1 flex flex-col items-center gap-2">
          <div class="w-full bg-emerald/20 border-t-2 border-emerald rounded-t-lg transition-all duration-1000" style="height: {height}%"></div>
          <span class="text-[10px] font-mono text-slate-dim uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Insights -->
  <div class="card p-8 border-white/5">
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-lg font-bold text-white">AI Insights</h3>
      <span class="text-[10px] font-bold text-emerald uppercase tracking-widest">Live</span>
    </div>
    <div class="flex flex-col gap-6">
      {#each insights as insight}
        <div class="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-{insight.color}/30 transition-colors duration-300">
          <div class="w-10 h-10 rounded-lg bg-{insight.color}/10 flex items-center justify-center text-lg flex-shrink-0">
            {insight.icon}
          </div>
          <div>
            <div class="text-[10px] font-bold text-{insight.color} uppercase tracking-widest mb-1">{insight.title}</div>
            <p class="text-xs text-slate leading-relaxed">{insight.message}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- RECENT TRANSACTIONS -->
<div class="card p-8 border-white/5">
  <div class="flex items-center justify-between mb-8">
    <h3 class="text-lg font-bold text-white">Recent Transactions</h3>
    <a href="/dashboard/transactions" class="text-xs font-bold text-emerald uppercase tracking-widest hover:underline underline-offset-4 transition-all">
      View All Transactions →
    </a>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b border-white/5 pb-4">
          <th class="pb-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">Description</th>
          <th class="pb-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">Date</th>
          <th class="pb-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">Amount</th>
          <th class="pb-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest text-right">Status</th>
        </tr>
      </thead>
      <tbody>
        {#each transactions as tx}
          <tr class="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200 group">
            <td class="py-4 flex items-center gap-4">
              <div class="w-8 h-8 rounded-lg bg-{tx.color}/10 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                {tx.icon}
              </div>
              <span class="text-sm font-medium text-white">{tx.name}</span>
            </td>
            <td class="py-4 text-xs text-slate-dim font-mono">{tx.date}</td>
            <td class="py-4 text-sm font-bold {tx.type === 'income' ? 'text-emerald' : 'text-rose'} font-mono">{tx.amount}</td>
            <td class="py-4 text-right">
              <span class="text-[10px] font-bold px-2 py-1 rounded bg-emerald/10 text-emerald uppercase tracking-widest">Cleared</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
