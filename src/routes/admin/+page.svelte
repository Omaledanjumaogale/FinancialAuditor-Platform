<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SEO from '$lib/components/SEO.svelte';

  const stats = [
    { icon: '👥', label: 'Total Users', value: '52,841', trend: '↑ 847 new', trendColor: 'emerald', bgColor: 'emerald' },
    { icon: '💰', label: 'Monthly Revenue', value: '₦42.1M', trend: '↑ 23.4%', trendColor: 'gold', bgColor: 'gold' },
    { icon: '⚖️', label: 'Active Auditors', value: '513', trend: '5 pending', trendColor: 'blue', bgColor: 'blue' },
    { icon: '📋', label: 'Open Requests', value: '8', trend: '3 urgent', trendColor: 'rose', bgColor: 'rose' }
  ];

  const signups = [
    { initials: 'TK', name: 'Tayo Kola-Idowu', company: 'TechVentures Ltd', plan: 'Pro', time: '2m', color: 'emerald' },
    { initials: 'FS', name: 'Fatima Suleiman', company: 'Suleiman Foundation', plan: 'Starter', time: '18m', color: 'gold' },
    { initials: 'OA', name: 'Adeyemi Group PLC', company: 'Corporate', plan: 'Enterprise', time: '1h', color: 'purple' },
    { initials: 'MI', name: 'Musa Ibrahim', company: 'Individual', plan: 'Trial', time: '3h', color: 'slate' }
  ];

  const actions = [
    { title: '5 Auditor Applications', desc: 'NIN & certificate check needed', color: 'rose', btn: 'Review' },
    { title: '3 CAC Registration Requests', desc: 'Clients awaiting contact — urgent', color: 'gold', btn: 'Contact' },
    { title: '₦2.1M Auditor Payouts Due', desc: '8 auditors in payment queue', color: 'emerald', btn: 'Process' }
  ];
</script>

<SEO title="Admin Operations" description="Platform-wide operations, financial auditing, and user management." />

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
        {stat.trend} <span class="text-slate-dim font-normal normal-case">this month</span>
      </div>
    </div>
  {/each}
</div>

<!-- CHARTS ROW -->
<div class="grid lg:grid-cols-3 gap-8 mb-12">
  <!-- Revenue Trend -->
  <div class="lg:col-span-2 card p-8 border-white/5">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-lg font-bold text-white mb-1">Platform Revenue 2025</h3>
        <p class="text-xs text-slate-dim">Subscriptions + 5% marketplace commission</p>
      </div>
      <span class="text-[10px] font-bold text-emerald uppercase tracking-widest bg-emerald/10 px-2 py-1 rounded">Jan–Jun</span>
    </div>
    
    <!-- Chart Mockup -->
    <div class="h-[180px] w-full flex items-end gap-3 px-2">
      {#each [30, 45, 40, 60, 55, 75, 100] as height, i}
        <div class="flex-1 flex flex-col items-center gap-2">
          <div class="w-full bg-rose/20 border-t-2 border-rose rounded-t-lg transition-all duration-1000" style="height: {height}%"></div>
          <span class="text-[10px] font-mono text-slate-dim uppercase">W{i+1}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Plan Distribution -->
  <div class="card p-8 border-white/5">
    <h3 class="text-lg font-bold text-white mb-1">Plan Distribution</h3>
    <p class="text-xs text-slate-dim mb-8">52,841 active subscribers</p>
    
    <div class="flex flex-col gap-6">
      {#each [
        { label: 'Enterprise', val: '1,240', color: 'purple', w: '22%' },
        { label: 'Pro', val: '18,600', color: 'rose', w: '60%' },
        { label: 'Starter', val: '28,181', color: 'emerald', w: '90%' },
        { label: 'Free Trial', val: '4,820', color: 'gold', w: '17%' }
      ] as plan}
        <div>
          <div class="flex justify-between text-xs mb-2">
            <span class="text-slate">{plan.label}</span>
            <span class="text-white font-mono">{plan.val}</span>
          </div>
          <div class="h-1 bg-white/5 rounded-full overflow-hidden">
            <div class="h-full bg-{plan.color} rounded-full" style="width: {plan.w}"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- BOTTOM ROW -->
<div class="grid lg:grid-cols-2 gap-8">
  <!-- Recent Signups -->
  <div class="card p-8 border-white/5">
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-lg font-bold text-white">Recent Signups</h3>
      <a href="/admin/clients" class="text-xs font-bold text-emerald uppercase tracking-widest hover:underline">View All →</a>
    </div>

    <div class="flex flex-col gap-4">
      {#each signups as user}
        <div class="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald/30 transition-all">
          <div class="w-10 h-10 rounded-full bg-{user.color}/20 flex items-center justify-center text-sm font-bold text-white">
            {user.initials}
          </div>
          <div class="flex-1">
            <div class="text-sm font-bold text-white">{user.name}</div>
            <div class="text-xs text-slate-dim">{user.company} · {user.plan}</div>
          </div>
          <span class="text-[10px] font-bold text-emerald uppercase tracking-widest">{user.time} ago</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Pending Actions -->
  <div class="card p-8 border-white/5">
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-lg font-bold text-white">Pending Admin Actions</h3>
      <span class="text-[10px] font-bold text-rose uppercase tracking-widest bg-rose/10 px-2 py-1 rounded">11 items</span>
    </div>

    <div class="flex flex-col gap-4">
      {#each actions as action}
        <div class="flex items-center justify-between gap-4 p-5 rounded-xl bg-{action.color}/5 border border-{action.color}/20">
          <div>
            <div class="text-sm font-bold text-white mb-1">{action.title}</div>
            <div class="text-xs text-slate-dim">{action.desc}</div>
          </div>
          <button class="px-4 py-2 rounded-lg bg-{action.color} text-white text-xs font-bold hover:brightness-110 transition-all">
            {action.btn}
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
