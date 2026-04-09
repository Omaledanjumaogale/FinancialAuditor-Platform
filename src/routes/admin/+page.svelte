<script lang="ts">
  import { fly } from 'svelte/transition';
  import {
    Users, ShieldCheck, Activity, Server, Database,
    TrendingUp, AlertTriangle, CheckCircle2, Clock,
    UserCheck, UserX, RefreshCw, BarChart3, Settings,
    Cpu, HardDrive, Globe, Zap
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { useQuery } from 'convex-svelte';
  import { api } from '$convex/_generated/api';

  let activeTab = $state<'overview' | 'users' | 'system'>('overview');
  let isRefreshing = $state(false);

  function refresh() {
    isRefreshing = true;
    setTimeout(() => { isRefreshing = false; }, 1200);
  }

  const usersQuery = useQuery(api.users.list, {});
  const allUsers   = $derived(usersQuery?.data || []);

  type MockUser = { _id: string; name: string; email: string; role: string; plan: string; status: string; createdAt: number };
  const mockUsers: MockUser[] = [
    { _id: '1', name: 'Bello Abubakar',   email: 'bello@example.ng',  role: 'client',  plan: 'pro',     status: 'active',   createdAt: Date.now() - 86400000 * 5  },
    { _id: '2', name: 'Ngozi Eze',        email: 'ngozi@example.ng',  role: 'auditor', plan: 'pro',     status: 'active',   createdAt: Date.now() - 86400000 * 12 },
    { _id: '3', name: 'Tunde Okonkwo',    email: 'tunde@example.ng',  role: 'client',  plan: 'starter', status: 'active',   createdAt: Date.now() - 86400000 * 20 },
    { _id: '4', name: 'Amaka Ihejirika',  email: 'amaka@example.ng',  role: 'client',  plan: 'starter', status: 'inactive', createdAt: Date.now() - 86400000 * 30 },
    { _id: '5', name: 'Emeka Obi',        email: 'emeka@example.ng',  role: 'admin',   plan: 'pro',     status: 'active',   createdAt: Date.now() - 86400000 * 60 },
  ];

  const displayUsers = $derived<MockUser[]>(allUsers.length === 0 ? mockUsers : (allUsers as MockUser[]));

  const totalUsers    = $derived(displayUsers.length);
  const activeUsers   = $derived(displayUsers.filter((u: MockUser) => u.status === 'active').length);
  const proUsers      = $derived(displayUsers.filter((u: MockUser) => u.plan === 'pro').length);
  const auditorCount  = $derived(displayUsers.filter((u: MockUser) => u.role === 'auditor').length);

  function roleStyle(role: string) {
    if (role === 'admin')   return 'background:rgba(239,68,68,0.12);color:#fca5a5';
    if (role === 'auditor') return 'background:rgba(59,130,246,0.12);color:#93c5fd';
    return 'background:rgba(16,185,129,0.12);color:#6ee7b7';
  }
  function planStyle(plan: string) {
    return plan === 'pro'
      ? 'background:rgba(245,158,11,0.12);color:#fcd34d'
      : 'background:rgba(255,255,255,0.06);color:#94a3b8';
  }
  function statusStyle(status: string) {
    return status === 'active'
      ? 'background:rgba(16,185,129,0.12);color:#6ee7b7'
      : 'background:rgba(255,255,255,0.05);color:#64748b';
  }

  // System metrics — static for now (would be from monitoring API)
  const systemMetrics = [
    { label: 'CPU Usage',     value: 34,  unit: '%',  icon: Cpu,       color: '#10b981' },
    { label: 'Memory',        value: 62,  unit: '%',  icon: HardDrive, color: '#60a5fa' },
    { label: 'DB Queries/s',  value: 128, unit: '/s', icon: Database,  color: '#a78bfa' },
    { label: 'API Latency',   value: 48,  unit: 'ms', icon: Zap,       color: '#fbbf24' },
  ];

  const recentActivity = [
    { action: 'New user registration',          user: 'bello@example.ng',  time: '2 min ago',  icon: UserCheck, color: '#10b981' },
    { action: 'Audit completed — Q3 Report',    user: 'System',            time: '15 min ago', icon: CheckCircle2, color: '#10b981' },
    { action: 'Failed login attempt (3x)',      user: 'unknown@ip.ng',     time: '40 min ago', icon: AlertTriangle, color: '#f59e0b' },
    { action: 'Plan upgraded to Pro',           user: 'ngozi@example.ng',  time: '1 hr ago',   icon: TrendingUp, color: '#60a5fa' },
    { action: 'User deactivated',               user: 'amaka@example.ng',  time: '3 hrs ago',  icon: UserX, color: '#f87171' },
  ];
</script>

<svelte:head>
  <title>Admin Console — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-10" in:fly={{ y: 10, duration: 300 }}>

  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
        <ShieldCheck size={22} style="color:#10b981" aria-hidden="true" />
        Admin Console
      </h1>
      <p class="text-sm mt-0.5" style="color:#64748b">Platform control centre — handle with care</p>
    </div>
    <button
      onclick={refresh}
      class="flex items-center gap-2 py-2 px-4 text-sm rounded-xl border font-medium transition-all"
      style="border-color:rgba(255,255,255,0.1); color:#94a3b8; background:rgba(255,255,255,0.03);"
      aria-label="Refresh data"
    >
      <RefreshCw size={14} class={isRefreshing ? 'animate-spin' : ''} aria-hidden="true" />
      Refresh
    </button>
  </div>

  <!-- Top Stat Cards -->
  <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
    {#each [
      { label: 'Total Users',    value: totalUsers,   icon: Users,        iconStyle: 'background:rgba(16,185,129,0.12);color:#10b981' },
      { label: 'Active Users',   value: activeUsers,  icon: UserCheck,    iconStyle: 'background:rgba(59,130,246,0.12);color:#60a5fa' },
      { label: 'Pro Accounts',   value: proUsers,     icon: TrendingUp,   iconStyle: 'background:rgba(245,158,11,0.12);color:#fbbf24' },
      { label: 'Auditors',       value: auditorCount, icon: ShieldCheck,  iconStyle: 'background:rgba(168,85,247,0.12);color:#c4b5fd' },
    ] as stat, i (stat.label)}
      <div class="rounded-2xl p-5 border border-white/8 space-y-3" style="background-color:#111827;" in:fly={{ y: 8, delay: i * 60, duration: 280 }}>
        <div class="flex items-center justify-between">
          <p class="text-xs font-semibold uppercase tracking-wider" style="color:#475569">{stat.label}</p>
          <div class="w-8 h-8 rounded-xl flex items-center justify-center" style={stat.iconStyle} aria-hidden="true">
            <stat.icon size={15} />
          </div>
        </div>
        <p class="text-2xl font-heading font-bold text-white tabular-nums">{stat.value}</p>
      </div>
    {/each}
  </div>

  <!-- Tab Navigation -->
  <div class="flex gap-1 p-1 rounded-xl w-fit" style="background-color:#111827;">
    {#each [
      { key: 'overview', label: 'Overview',    icon: BarChart3  },
      { key: 'users',    label: 'Users',       icon: Users      },
      { key: 'system',   label: 'System',      icon: Server     },
    ] as tab (tab.key)}
      <button
        onclick={() => activeTab = tab.key as any}
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        style={activeTab === tab.key
          ? 'background:rgba(16,185,129,0.15); color:#10b981;'
          : 'color:#64748b;'}
        aria-current={activeTab === tab.key ? 'page' : undefined}
      >
        <tab.icon size={14} aria-hidden="true" />
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- ── OVERVIEW TAB ── -->
  {#if activeTab === 'overview'}
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6" in:fly={{ y: 6, duration: 240 }}>

      <!-- Recent Platform Activity -->
      <div class="rounded-2xl border border-white/8 p-6 space-y-4" style="background-color:#111827;">
        <h2 class="text-sm font-semibold text-white">Recent Platform Activity</h2>
        <div class="space-y-4">
          {#each recentActivity as item (item.action)}
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style="background:rgba(255,255,255,0.05)" aria-hidden="true">
                <item.icon size={14} style="color:{item.color}" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">{item.action}</p>
                <p class="text-xs truncate" style="color:#64748b">{item.user}</p>
              </div>
              <span class="text-[10px] whitespace-nowrap" style="color:#475569">{item.time}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Platform Health -->
      <div class="rounded-2xl border border-white/8 p-6 space-y-4" style="background-color:#111827;">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-white">Platform Health</h2>
          <span class="flex items-center gap-1.5 text-xs font-semibold" style="color:#10b981">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" aria-hidden="true"></div>
            All Systems Operational
          </span>
        </div>
        <div class="space-y-4">
          {#each systemMetrics as metric (metric.label)}
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <metric.icon size={13} style="color:{metric.color}" aria-hidden="true" />
                  <span class="text-xs font-medium" style="color:#94a3b8">{metric.label}</span>
                </div>
                <span class="text-xs font-bold text-white tabular-nums">{metric.value}{metric.unit}</span>
              </div>
              <div class="h-1.5 rounded-full w-full" style="background:rgba(255,255,255,0.06)">
                <div class="h-1.5 rounded-full transition-all duration-700"
                  style="width:{metric.unit === '%' ? metric.value : Math.min(100, metric.value / 2)}%; background:{metric.color}; opacity:0.8"
                ></div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Service Status -->
        <div class="pt-3 border-t border-white/8 space-y-2">
          {#each [
            { service: 'Convex Database',  status: 'Operational' },
            { service: 'Firebase Auth',    status: 'Operational' },
            { service: 'AI Audit Engine',  status: 'Operational' },
            { service: 'Paystack Gateway', status: 'Operational' },
          ] as svc (svc.service)}
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium" style="color:#94a3b8">{svc.service}</span>
              <span class="flex items-center gap-1.5 text-[11px] font-semibold" style="color:#6ee7b7">
                <CheckCircle2 size={11} aria-hidden="true" />
                {svc.status}
              </span>
            </div>
          {/each}
        </div>
      </div>
    </div>

  <!-- ── USERS TAB ── -->
  {:else if activeTab === 'users'}
    <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color:#111827;" in:fly={{ y: 6, duration: 240 }}>
      <div class="px-6 py-4 border-b border-white/8 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-white">User Management</h2>
        <span class="text-xs" style="color:#64748b">{totalUsers} total users</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse" aria-label="User management table">
          <thead>
            <tr style="background-color:#1f2937;">
              <th class="px-6 py-3 text-[10px] font-semibold uppercase tracking-widest" style="color:#475569">User</th>
              <th class="px-6 py-3 text-[10px] font-semibold uppercase tracking-widest" style="color:#475569">Role</th>
              <th class="px-6 py-3 text-[10px] font-semibold uppercase tracking-widest" style="color:#475569">Plan</th>
              <th class="px-6 py-3 text-[10px] font-semibold uppercase tracking-widest" style="color:#475569">Status</th>
              <th class="px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-right" style="color:#475569">Joined</th>
            </tr>
          </thead>
          <tbody>
            {#each displayUsers as user (user._id)}
              <tr class="border-t hover:bg-white/3 transition-colors" style="border-color:rgba(255,255,255,0.06)">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style="background:linear-gradient(135deg,#059669,#0f2040)">
                      {(user.name || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-white">{user.name}</p>
                      <p class="text-xs" style="color:#64748b">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize" style={roleStyle(user.role)}>
                    {user.role}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize" style={planStyle(user.plan)}>
                    {user.plan}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize" style={statusStyle(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td class="px-6 py-4 text-right text-xs" style="color:#64748b">
                  {new Date(user.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  <!-- ── SYSTEM TAB ── -->
  {:else if activeTab === 'system'}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" in:fly={{ y: 6, duration: 240 }}>
      {#each [
        { title: 'Application Version',  value: 'v1.4.2 (stable)',           icon: Globe,    desc: 'SvelteKit + Convex + Firebase' },
        { title: 'Database',             value: 'Convex — Connected',          icon: Database, desc: 'Real-time sync operational' },
        { title: 'Auth Provider',        value: 'Firebase Auth',              icon: ShieldCheck, desc: 'OAuth + Email/Password' },
        { title: 'Hosting',              value: 'Cloudflare Pages (Edge)',     icon: Server,   desc: 'Globally distributed CDN' },
        { title: 'Build System',         value: 'Vite v7.3.2',                icon: Zap,      desc: 'ESBuild + Rollup optimization' },
        { title: 'AI Engine',            value: 'GPT-4o + Custom Fine-Tune',  icon: Cpu,      desc: 'FIRS compliance rules embedded' },
      ] as card (card.title)}
        <div class="rounded-2xl border border-white/8 p-5 flex items-start gap-4" style="background-color:#111827;">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style="background:rgba(16,185,129,0.1)">
            <card.icon size={18} style="color:#10b981" aria-hidden="true" />
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider mb-1" style="color:#475569">{card.title}</p>
            <p class="text-sm font-bold text-white">{card.value}</p>
            <p class="text-xs mt-0.5" style="color:#64748b">{card.desc}</p>
          </div>
        </div>
      {/each}

      <!-- Environment Warning -->
      <div class="sm:col-span-2 rounded-2xl border p-5 flex items-start gap-4" style="background:rgba(245,158,11,0.06); border-color:rgba(245,158,11,0.2);">
        <AlertTriangle size={18} style="color:#f59e0b; flex-shrink:0; margin-top:2px;" aria-hidden="true" />
        <div>
          <p class="text-sm font-semibold" style="color:#fcd34d">Environment Variables Required</p>
          <p class="text-xs mt-1 leading-relaxed" style="color:#92400e; color:#d97706;">
            Replace placeholder values in <code class="font-mono px-1.5 py-0.5 rounded text-xs" style="background:rgba(245,158,11,0.1)">.env</code> with production credentials before deployment.
            Firebase API key, Convex deployment URL, and Paystack secret key must be configured.
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>
