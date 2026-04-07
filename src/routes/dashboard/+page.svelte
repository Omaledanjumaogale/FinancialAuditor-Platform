<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    TrendingUp, 
    Users, 
    ShieldAlert, 
    FileText, 
    ArrowUpRight, 
    ArrowDownRight,
    Search,
    Filter,
    MoreHorizontal
  } from 'lucide-svelte';

  const stats = [
    { label: 'Total Audits', value: '1,284', change: '+12.5%', icon: FileText, color: 'emerald', emoji: '📂' },
    { label: 'Active Users', value: '842', change: '+5.2%', icon: Users, color: 'gold', emoji: '👥' },
    { label: 'Anomalies', value: '12', change: '-2.4%', icon: ShieldAlert, color: 'danger', emoji: '⚠️' },
    { label: 'Revenue Growth', value: '₦4.2M', change: '+18.4%', icon: TrendingUp, color: 'emerald', emoji: '📈' }
  ];

  const recentActivities = [
    { id: 1, title: 'FIRS Audit Report Generated', type: 'Report', time: '2 mins ago', status: 'Completed', emoji: '📄' },
    { id: 2, title: 'Anomalies detected in Logistics', type: 'Alert', time: '15 mins ago', status: 'Warning', emoji: '🚨' },
    { id: 3, title: 'New ICAN Auditor Connected', type: 'User', time: '1 hour ago', status: 'Success', emoji: '🤝' },
    { id: 4, title: 'VAT Calculation Updated', type: 'Tax', time: '3 hours ago', status: 'Completed', emoji: '📊' }
  ];
</script>

<div class="space-y-8" in:fade>
  <!-- Welcome Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-heading font-black text-white">Dashboard Overview</h1>
      <p class="text-slate-dim">Welcome back, <span class="text-white font-bold">Adaeze Okonkwo</span> 👋. Here's what's happening today.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2 px-4 text-sm border-white/10 text-white hover:bg-white/5 flex items-center gap-2">
        <Filter size={16} />
        Filter
      </button>
      <button class="btn-primary py-2 px-4 text-sm flex items-center gap-2">
        <span>⚡ Run New Audit</span>
      </button>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stats as stat}
      <div class="card-premium p-6 group relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <stat.icon size={64} />
        </div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="text-2xl">{stat.emoji}</div>
            <div class={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-emerald/10 text-emerald' : 'bg-danger/10 text-danger'}`}>
              {stat.change}
            </div>
          </div>
          <div class="text-sm font-bold text-slate-dim uppercase tracking-widest mb-1">{stat.label}</div>
          <div class="text-3xl font-heading font-black text-white">{stat.value}</div>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Chart / Main Content -->
    <div class="lg:col-span-2 space-y-8">
      <div class="card-premium p-6">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-heading font-bold text-white flex items-center gap-2">
            <span>📉</span> Financial Intelligence Trend
          </h3>
          <select class="bg-navy border border-white/10 rounded-lg text-xs text-slate-dim px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 12 Months</option>
          </select>
        </div>
        
        <div class="h-64 flex items-end gap-2 relative">
          {#each Array(12) as _, i}
            <div 
              class="flex-1 bg-linear-to-t from-emerald/40 to-emerald/10 rounded-t-lg transition-all hover:from-emerald hover:to-emerald/50 cursor-pointer group relative"
              style={`height: ${Math.random() * 80 + 20}%`}
            >
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-navy text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ₦{(Math.random() * 500).toFixed(0)}K
              </div>
            </div>
          {/each}
        </div>
        <div class="flex justify-between mt-4 text-[10px] font-mono text-slate-dim uppercase tracking-widest">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card-premium p-6 bg-linear-to-br from-emerald/5 to-transparent border-emerald/10 group cursor-pointer hover:border-emerald/30">
          <div class="text-3xl mb-4 group-hover:scale-110 transition-transform">📤</div>
          <h4 class="text-lg font-heading font-bold text-white mb-2">Upload Documents</h4>
          <p class="text-sm text-slate-dim mb-4">Drag and drop receipts, invoices or bank statements for instant AI analysis.</p>
          <div class="text-emerald text-sm font-bold flex items-center gap-2">
            Get Started <ArrowUpRight size={16} />
          </div>
        </div>
        <div class="card-premium p-6 bg-linear-to-br from-gold/5 to-transparent border-gold/10 group cursor-pointer hover:border-gold/30">
          <div class="text-3xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
          <h4 class="text-lg font-heading font-bold text-white mb-2">Marketplace</h4>
          <p class="text-sm text-slate-dim mb-4">Connect with ICAN certified auditors for professional verification.</p>
          <div class="text-gold text-sm font-bold flex items-center gap-2">
            Browse Auditors <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Content (Recent Activity) -->
    <div class="space-y-8">
      <div class="card-premium p-6">
        <h3 class="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
          <span>🔔</span> Recent Activity
        </h3>
        <div class="space-y-6">
          {#each recentActivities as activity}
            <div class="flex gap-4 relative">
              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg shrink-0">
                {activity.emoji}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-bold text-white truncate">{activity.title}</div>
                <div class="flex items-center gap-2 text-[10px] text-slate-dim mt-1">
                  <span>{activity.type}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
              <button class="text-slate-dim hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          {/each}
        </div>
        <button class="w-full mt-8 py-3 text-xs font-bold text-slate-dim hover:text-white border border-white/10 rounded-xl transition-all hover:bg-white/5">
          View All Activities
        </button>
      </div>

      <!-- AI Advisory Card -->
      <div class="card-premium p-6 bg-linear-to-br from-emerald/20 to-navy border-emerald/20 overflow-hidden relative group">
        <div class="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:scale-110 transition-transform">🤖</div>
        <div class="relative z-10">
          <div class="text-xs font-heading font-bold text-emerald mb-2 uppercase tracking-widest">AI Advisory Pro</div>
          <h4 class="text-lg font-heading font-bold text-white mb-4">Optimization Found!</h4>
          <p class="text-sm text-slate-dim mb-6 leading-relaxed">
            Your logistics expenditure is <span class="text-danger font-bold">12.5%</span> higher than the industry average for Lagos-based SMEs.
          </p>
          <button class="w-full py-3 bg-emerald text-navy font-bold rounded-xl text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald/20">
            View Playbook 📘
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
