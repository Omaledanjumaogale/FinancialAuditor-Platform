<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SEO from '$lib/components/SEO.svelte';
  import { 
    Users, 
    BarChart3, 
    ShieldCheck, 
    ClipboardList, 
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    UserPlus,
    Clock,
    MoreHorizontal
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const stats = [
    { icon: Users, label: 'Total Users', value: '52,841', trend: '+847 new', trendColor: 'brand' },
    { icon: BarChart3, label: 'Monthly Revenue', value: '₦42.1M', trend: '+23.4%', trendColor: 'brand' },
    { icon: ShieldCheck, label: 'Active Auditors', value: '513', trend: '5 pending', trendColor: 'info' },
    { icon: ClipboardList, label: 'Open Requests', value: '8', trend: '3 urgent', trendColor: 'danger' }
  ];

  const signups = [
    { name: 'Tayo Kola-Idowu', company: 'TechVentures Ltd', plan: 'Pro', time: '2m ago', initials: 'TK' },
    { name: 'Fatima Suleiman', company: 'Suleiman Foundation', plan: 'Starter', time: '18m ago', initials: 'FS' },
    { name: 'Adeyemi Group PLC', company: 'Corporate', plan: 'Enterprise', time: '1h ago', initials: 'OA' },
    { name: 'Musa Ibrahim', company: 'Individual', plan: 'Trial', time: '3h ago', initials: 'MI' }
  ];

  const actions = [
    { title: 'Auditor Applications', count: 5, urgency: 'medium', desc: 'NIN & certificate verification needed' },
    { title: 'CAC Registration Requests', count: 3, urgency: 'high', desc: 'Awaiting consultant assignment' },
    { title: 'Marketplace Payouts', count: 8, urgency: 'low', desc: '₦2.1M scheduled for Friday' }
  ];
</script>

<SEO title="Admin Console" description="Platform operations and enterprise-level management." />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  {#each stats as stat, i}
    <div 
      class="card-premium p-6 group" 
      in:fly={{ y: 20, delay: 100 * i, duration: 500 }}
    >
      <div class="flex items-center justify-between mb-4">
        <div class="w-10 h-10 rounded-xl bg-surface-50 flex items-center justify-center text-surface-600 group-hover:bg-surface-900 group-hover:text-white transition-all duration-300">
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
          stat.trendColor === 'brand' ? "bg-brand-50 text-brand-700" : 
          stat.trendColor === 'danger' ? "bg-danger-50 text-danger-700" : "bg-info-50 text-info-700"
        )}>
          {stat.trend}
        </span>
      </div>
    </div>
  {/each}
</div>

<div class="grid lg:grid-cols-3 gap-8 mb-10">
  <!-- Revenue Distribution -->
  <div class="lg:col-span-2 card-premium p-8">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h3 class="text-lg font-bold text-surface-900 mb-1">Platform Revenue Trend</h3>
        <p class="text-xs text-surface-500 font-medium">Subscriptions + 5% Marketplace Commission</p>
      </div>
      <div class="text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-1 rounded">2026 Overview</div>
    </div>
    
    <!-- Custom Chart Placeholder -->
    <div class="overflow-x-auto pb-4">
      <div class="h-64 min-w-[500px] md:min-w-0 flex items-end justify-between gap-4 px-2">
      {#each [35, 50, 42, 70, 65, 88, 100] as height, i}
        <div class="flex-1 flex flex-col items-center gap-4 group">
          <div class="relative w-full">
            <div class="absolute bottom-0 left-0 right-0 h-64 bg-surface-50 rounded-t-lg"></div>
            <div 
              class="relative z-10 w-full bg-surface-900 rounded-t-lg transition-all duration-1000 group-hover:bg-black group-hover:shadow-lg" 
              style="height: {height * 2.5}px"
            ></div>
          </div>
          <span class="text-[10px] font-bold text-surface-400 uppercase tracking-widest">W{i+1}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Subscription Plan Split -->
  <div class="card-premium p-8">
    <h3 class="text-lg font-bold text-surface-900 mb-1">Plan Distribution</h3>
    <p class="text-xs text-surface-500 font-medium mb-10">Active subscribers across tiers</p>
    
    <div class="space-y-8">
      {#each [
        { label: 'Enterprise', val: '1,240', p: 22, color: 'bg-surface-900' },
        { label: 'Pro', val: '18,600', p: 60, color: 'bg-brand-500' },
        { label: 'Starter', val: '28,181', p: 90, color: 'bg-brand-400' },
        { label: 'Free Trial', val: '4,820', p: 17, color: 'bg-surface-200' }
      ] as plan}
        <div>
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs font-bold text-surface-700 uppercase tracking-wider">{plan.label}</span>
            <span class="text-sm font-extrabold text-surface-900 font-mono">{plan.val}</span>
          </div>
          <div class="h-1.5 w-full bg-surface-50 rounded-full overflow-hidden">
            <div class={cn("h-full rounded-full transition-all duration-1000 delay-300", plan.color)} style="width: {plan.p}%"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="grid lg:grid-cols-2 gap-8">
  <!-- Recent User Signups -->
  <div class="card-premium p-8">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h3 class="text-lg font-bold text-surface-900">Recent Signups</h3>
        <p class="text-xs text-surface-500 font-medium">New platform registrations</p>
      </div>
      <button class="text-xs font-bold text-brand-600 uppercase tracking-widest hover:underline min-h-[44px]">View Directory</button>
    </div>

    <div class="space-y-4">
      {#each signups as user}
        <div class="flex items-center gap-4 p-4 rounded-xl bg-surface-50 border border-surface-100 hover:border-brand-200 transition-all cursor-pointer group">
          <div class="w-10 h-10 rounded-full bg-white border border-surface-200 flex items-center justify-center text-xs font-bold text-surface-900 shadow-sm group-hover:scale-110 transition-transform">
            {user.initials}
          </div>
          <div class="flex-1">
            <div class="text-sm font-bold text-surface-900">{user.name}</div>
            <div class="text-[10px] font-bold text-surface-400 uppercase tracking-widest">{user.company} · {user.plan}</div>
          </div>
          <div class="flex flex-col items-end gap-1">
            <span class="text-[10px] font-bold text-surface-400 uppercase tracking-widest">{user.time}</span>
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Pending Admin Actions -->
  <div class="card-premium p-8">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h3 class="text-lg font-bold text-surface-900">Action Items</h3>
        <p class="text-xs text-surface-500 font-medium">Pending operational tasks</p>
      </div>
      <div class="h-6 w-6 rounded-full bg-danger/10 text-danger flex items-center justify-center text-[10px] font-bold">
        11
      </div>
    </div>

    <div class="space-y-4">
      {#each actions as action}
        <div class={cn(
          "p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6",
          action.urgency === 'high' ? "bg-danger-50 border-danger-100" : 
          action.urgency === 'medium' ? "bg-warning-50 border-warning-100" : "bg-brand-50 border-brand-100"
        )}>
          <div class="flex gap-4">
            <div class={cn(
              "w-10 h-10 rounded-xl flex shrink-0 items-center justify-center",
              action.urgency === 'high' ? "bg-danger text-white" : 
              action.urgency === 'medium' ? "bg-warning text-white" : "bg-brand text-white"
            )}>
              {#if action.urgency === 'high'}
                <AlertCircle size={20} />
              {:else if action.urgency === 'medium'}
                <Clock size={20} />
              {:else}
                <CheckCircle2 size={20} />
              {/if}
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-bold text-surface-900">{action.title}</span>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-surface-200">{action.count}</span>
              </div>
              <p class="text-xs text-surface-600 font-medium leading-relaxed">{action.desc}</p>
            </div>
          </div>
          <button class="btn-primary py-3 px-6 text-xs whitespace-nowrap shadow-sm w-full sm:w-auto min-h-[44px]">Process</button>
        </div>
      {/each}
    </div>
  </div>
</div>
