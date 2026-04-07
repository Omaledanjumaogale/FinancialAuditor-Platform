<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SEO from '$lib/components/SEO.svelte';
  import { 
    TrendingUp, 
    TrendingDown, 
    DollarSign, 
    CreditCard, 
    ArrowUpRight, 
    ArrowDownRight,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Bot,
    MoreHorizontal,
    FileText
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: '₦4.2M', trend: '+18.4%', isPositive: true, color: 'brand' },
    { icon: ArrowUpRight, label: 'Net Profit', value: '₦1.8M', trend: '+12.1%', isPositive: true, color: 'accent' },
    { icon: TrendingDown, label: 'Total Expenses', value: '₦2.4M', trend: '-5.2%', isPositive: true, color: 'danger' },
    { icon: CreditCard, label: 'Cash Balance', value: '₦940K', trend: 'Healthy', isPositive: true, color: 'info' }
  ];

  const transactions = [
    { name: 'Sales — Agromart Ltd', date: '15 Jun 2025', amount: '+₦320,000', status: 'Completed', type: 'income' },
    { name: 'Logistics — Swift Cargo', date: '14 Jun 2025', amount: '−₦85,000', status: 'Pending', type: 'expense' },
    { name: 'Wholesale — Lagos Hub', date: '13 Jun 2025', amount: '+₦560,000', status: 'Completed', type: 'income' },
    { name: 'Salaries — June 2025', date: '12 Jun 2025', amount: '−₦210,000', status: 'Completed', type: 'expense' }
  ];

  const insights = [
    { icon: Bot, title: 'Cost Optimization', message: 'Cut logistics 12% → Save ₦216K in Q3. AI found 3 better carrier routes.', color: 'brand', tag: 'Opportunity' },
    { icon: AlertCircle, title: 'Duplicate Payment', message: 'Sunny Electronics ₦45,000 — 10 & 11 Jun. Review recommended.', color: 'danger', tag: 'Anomaly' },
    { icon: Calendar, title: 'Tax Compliance', message: 'VAT filing due in 14 days. Estimated ₦312,000. Auto-file ready.', color: 'accent', tag: 'Reminder' }
  ];
</script>

<SEO title="Client Dashboard" description="Overview of your financial performance and AI-driven audits." />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  {#each stats as stat, i}
    <div 
      class="card-premium p-6 group" 
      in:fly={{ y: 20, delay: 100 * i, duration: 500 }}
    >
      <div class="flex items-center justify-between mb-4">
        <div class="w-10 h-10 rounded-xl bg-surface-50 flex items-center justify-center text-surface-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
          <stat.icon size={20} />
        </div>
        <button class="text-surface-300 hover:text-surface-600 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div class="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1">{stat.label}</div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-surface-900">{stat.value}</span>
        <span class={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
          stat.isPositive ? "bg-brand-50 text-brand-700" : "bg-danger-50 text-danger-700"
        )}>
          {stat.trend}
        </span>
      </div>
    </div>
  {/each}
</div>

<div class="grid lg:grid-cols-3 gap-8 mb-10">
  <!-- Revenue Analytics -->
  <div class="lg:col-span-2 card-premium p-8">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h3 class="text-lg font-bold text-surface-900 mb-1">Revenue vs Expenses</h3>
        <p class="text-xs text-surface-500 font-medium">Performance tracking for FY 2026</p>
      </div>
      <div class="flex bg-surface-50 p-1 rounded-lg border border-surface-200">
        <button class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white shadow-sm border border-surface-200 text-surface-900 transition-all">6 Months</button>
        <button class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-surface-400 hover:text-surface-600 transition-all">1 Year</button>
      </div>
    </div>
    
    <!-- Custom Chart Component Placeholder -->
    <div class="overflow-x-auto pb-4">
      <div class="h-64 min-w-[500px] md:min-w-0 flex items-end justify-between gap-4 px-2">
      {#each [45, 60, 52, 85, 78, 95] as height, i}
        <div class="flex-1 flex flex-col items-center gap-4 group">
          <div class="relative w-full">
            <!-- Background bar -->
            <div class="absolute bottom-0 left-0 right-0 h-64 bg-surface-50 rounded-t-lg"></div>
            <!-- Progress bar -->
            <div 
              class="relative z-10 w-full bg-brand-500 rounded-t-lg transition-all duration-1000 ease-out group-hover:bg-brand-600 group-hover:shadow-lg group-hover:shadow-brand-500/20" 
              style="height: {height * 2.5}px"
            >
              <div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-surface-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl">
                ₦{(height * 100).toLocaleString()}K
              </div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-surface-400 uppercase tracking-widest">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
          </span>
        </div>
      {/each}
    </div>
  </div>

  <!-- AI Insights Feed -->
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between px-2">
      <h3 class="text-lg font-bold text-surface-900">AI Intelligence</h3>
      <span class="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
    </div>
    
    <div class="space-y-4">
      {#each insights as insight}
        <div class="card-premium p-5 group cursor-pointer hover:border-brand-200">
          <div class="flex gap-4">
            <div class={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
              "bg-surface-50 text-surface-600 group-hover:bg-brand-600 group-hover:text-white"
            )}>
              <insight.icon size={20} />
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-surface-400 uppercase tracking-widest">{insight.tag}</span>
                <div class="h-1 w-1 rounded-full bg-surface-200"></div>
                <span class="text-[10px] font-bold text-brand-600 uppercase tracking-widest">{insight.title}</span>
              </div>
              <p class="text-sm text-surface-600 leading-relaxed font-medium">{insight.message}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <button class="btn-secondary w-full py-4 text-xs uppercase tracking-[0.2em] min-h-[44px]">
      View All Insights
    </button>
  </div>
</div>

<!-- Transactions Table -->
<div class="card-premium overflow-hidden">
  <div class="p-8 border-b border-surface-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h3 class="text-lg font-bold text-surface-900">Recent Transactions</h3>
      <p class="text-xs text-surface-500 font-medium">Real-time ledger updates</p>
    </div>
    <div class="flex flex-wrap gap-2">
      <button class="btn-secondary px-4 py-3 text-xs min-h-[44px] flex-1 sm:flex-none">Export CSV</button>
      <button class="btn-primary px-4 py-3 text-xs min-h-[44px] flex-1 sm:flex-none">View Full Ledger</button>
    </div>
  </div>
  
  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="bg-surface-50/50">
          <th class="px-8 py-4 text-[10px] font-bold text-surface-400 uppercase tracking-widest">Transaction Details</th>
          <th class="px-8 py-4 text-[10px] font-bold text-surface-400 uppercase tracking-widest">Date</th>
          <th class="px-8 py-4 text-[10px] font-bold text-surface-400 uppercase tracking-widest">Amount</th>
          <th class="px-8 py-4 text-[10px] font-bold text-surface-400 uppercase tracking-widest text-right">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-surface-100">
        {#each transactions as tx}
          <tr class="group hover:bg-surface-50/50 transition-colors">
            <td class="px-8 py-5">
              <div class="flex items-center gap-4">
                <div class={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                  tx.type === 'income' ? "bg-brand-50 text-brand-600" : "bg-danger-50 text-danger-600"
                )}>
                  {#if tx.type === 'income'}
                    <ArrowUpRight size={18} />
                  {:else}
                    <ArrowDownRight size={18} />
                  {/if}
                </div>
                <div>
                  <div class="text-sm font-bold text-surface-900">{tx.name}</div>
                  <div class="text-[10px] font-bold text-surface-400 uppercase tracking-widest">Financial Audit v2</div>
                </div>
              </div>
            </td>
            <td class="px-8 py-5">
              <div class="text-xs font-semibold text-surface-600">{tx.date}</div>
            </td>
            <td class="px-8 py-5">
              <div class={cn(
                "text-sm font-extrabold font-mono",
                tx.type === 'income' ? "text-brand-600" : "text-surface-900"
              )}>
                {tx.amount}
              </div>
            </td>
            <td class="px-8 py-5 text-right">
              <span class={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                tx.status === 'Completed' ? "bg-brand-50 text-brand-700" : "bg-warning-50 text-warning-700"
              )}>
                {#if tx.status === 'Completed'}
                  <CheckCircle2 size={12} />
                {:else}
                  <AlertCircle size={12} />
                {/if}
                {tx.status}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
