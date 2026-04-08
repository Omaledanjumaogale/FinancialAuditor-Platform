<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    TrendingUp, Users, ShieldAlert, FileText, 
    ArrowUpRight, ArrowDownRight, Search, Filter, 
    MoreHorizontal, Sparkles, Activity, Clock,
    CheckCircle2, AlertTriangle, Briefcase, 
    LayoutGrid, ShieldCheck, Zap
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const stats = [
    { label: 'Platform Audits', value: '1,284', change: '+12.5%', icon: FileText, emoji: '📂' },
    { label: 'Active Personnel', value: '842', change: '+5.2%', icon: Users, emoji: '👥' },
    { label: 'Detected Anomalies', value: '12', change: '-2.4%', icon: ShieldAlert, emoji: '⚠️' },
    { label: 'Projected Growth', value: '₦4.2M', change: '+18.4%', icon: TrendingUp, emoji: '📈' }
  ];

  const recentActivities = [
    { id: 1, title: 'FIRS Audit Report Generated', type: 'Report', time: '2 mins ago', status: 'Completed', emoji: '📄' },
    { id: 2, title: 'Anomalies detected in Logistics', type: 'Alert', time: '15 mins ago', status: 'Warning', emoji: '🚨' },
    { id: 3, title: 'New ICAN Auditor Connected', type: 'User', time: '1 hour ago', status: 'Success', emoji: '🤝' },
    { id: 4, title: 'VAT Calculation Updated', type: 'Tax', time: '3 hours ago', status: 'Completed', emoji: '📊' }
  ];
</script>

<div class="space-y-10 pb-20 relative z-10" in:fade>
  <!-- Welcome Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-[10px] font-black text-emerald uppercase tracking-[0.2em]">
        <Activity size={12} />
        Live Intelligence Console
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter">Enterprise Overview</h1>
      <p class="text-slate font-medium">Welcome back, <span class="text-white font-bold">Adaeze Okonkwo</span>. Your system is <span class="text-emerald">fully compliant</span>.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2.5 px-6 text-xs flex items-center gap-2">
        <Filter size={14} />
        Advanced Filters
      </button>
      <button class="btn-primary py-2.5 px-6 text-xs flex items-center gap-2 shadow-lg shadow-emerald/20">
        <Sparkles size={14} />
        <span>Execute AI Audit</span>
      </button>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stats as stat}
      <div class="card-premium p-6 group relative overflow-hidden bg-surface/50">
        <div class="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500">
          <stat.icon size={80} class="text-emerald" />
        </div>
        <div class="relative z-10 flex flex-col h-full">
          <div class="flex items-center justify-between mb-5">
            <div class="w-10 h-10 rounded-xl bg-navy-light flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
              {stat.emoji}
            </div>
            <div class={cn(
              "text-[10px] font-black px-2 py-1 rounded-lg border",
              stat.change.startsWith('+') 
                ? "bg-emerald/5 text-emerald border-emerald/10" 
                : "bg-danger/5 text-danger border-danger/10"
            )}>
              {stat.change}
            </div>
          </div>
          <div class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em] mb-1">{stat.label}</div>
          <div class="text-3xl font-heading font-black text-white tracking-tight">{stat.value}</div>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Main Performance View -->
    <div class="lg:col-span-2 space-y-8">
      <div class="card-premium p-8 bg-surface/50">
        <div class="flex items-center justify-between mb-10">
          <div class="space-y-1">
            <h3 class="text-xl font-heading font-black text-white flex items-center gap-2">
              <TrendingUp size={20} class="text-emerald" />
              Financial Growth Trajectory
            </h3>
            <p class="text-xs text-slate-dim font-medium">Real-time revenue vs projected benchmarks.</p>
          </div>
          <select class="bg-navy-light border border-white/5 rounded-xl text-[10px] font-black text-slate-dim px-4 py-2 focus:outline-none focus:border-emerald transition-all uppercase tracking-widest outline-none">
            <option>Q1 2026 Analysis</option>
            <option>Last 30 Days</option>
            <option>Fiscal Year 2025</option>
          </select>
        </div>
        
        <div class="h-72 flex items-end gap-2.5 relative group px-2">
          {#each Array(12) as _, i}
            <div 
              class="flex-1 bg-navy-light rounded-t-lg transition-all duration-300 hover:bg-emerald/10 cursor-pointer relative flex items-end"
              style={`height: ${Math.random() * 80 + 20}%`}
            >
              <div class="w-full bg-emerald/20 rounded-t-lg group-hover:bg-emerald/40 transition-colors" style={`height: ${Math.random() * 60 + 20}%`}></div>
              <!-- Hover Tooltip -->
              <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-navy text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">
                ₦{(Math.random() * 500).toFixed(0)}K · {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
              </div>
            </div>
          {/each}
        </div>
        <div class="flex justify-between mt-6 text-[10px] font-mono font-bold text-slate-dim uppercase tracking-[0.3em] border-t border-white/5 pt-6 px-2">
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
        </div>
      </div>

      <!-- Actionable Insights Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card-premium p-8 group cursor-pointer relative overflow-hidden bg-gradient-to-br from-emerald/5 to-transparent border-emerald/10 hover:border-emerald/30">
          <div class="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
            <Sparkles size={100} class="text-emerald" />
          </div>
          <div class="w-12 h-12 rounded-2xl bg-emerald text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald/20">📤</div>
          <h4 class="text-xl font-heading font-black text-white mb-2">Platform Ingestion</h4>
          <p class="text-sm text-slate-dim font-medium mb-6 leading-relaxed">Securely upload invoices, bank statements, or CAC records for instant AI audit processing.</p>
          <div class="text-emerald text-xs font-black flex items-center gap-2 uppercase tracking-widest">
            Deploy Data <ArrowUpRight size={14} />
          </div>
        </div>
        <div class="card-premium p-8 group cursor-pointer relative overflow-hidden bg-gradient-to-br from-gold/5 to-transparent border-gold/10 hover:border-gold/30">
          <div class="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
            <Briefcase size={100} class="text-gold" />
          </div>
          <div class="w-12 h-12 rounded-2xl bg-gold text-navy flex items-center justify-center text-2xl mb-6 shadow-lg shadow-gold/20">🔍</div>
          <h4 class="text-xl font-heading font-black text-white mb-2">Auditor Network</h4>
          <p class="text-sm text-slate-dim font-medium mb-6 leading-relaxed">Connect with ICAN certified professionals to verify your platform findings and sign off reports.</p>
          <div class="text-gold text-xs font-black flex items-center gap-2 uppercase tracking-widest">
            Browse Experts <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>

    <!-- Intelligence Sidebar -->
    <div class="space-y-8">
      <!-- Live Activity Feed -->
      <div class="card-premium p-8 bg-surface/50">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-heading font-black text-white flex items-center gap-2">
            <Clock size={20} class="text-emerald" />
            Platform Pulse
          </h3>
          <button class="text-[10px] font-black text-emerald uppercase tracking-widest hover:text-emerald/70 transition-colors">History</button>
        </div>
        <div class="space-y-7">
          {#each recentActivities as activity}
            <div class="flex gap-4 relative group">
              <div class="w-11 h-11 rounded-2xl bg-navy-light flex items-center justify-center text-xl shrink-0 group-hover:bg-emerald/10 transition-colors duration-300">
                {activity.emoji}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-black text-white truncate group-hover:text-emerald transition-colors">{activity.title}</div>
                <div class="flex items-center gap-2 text-[10px] font-bold text-slate-dim mt-1 uppercase tracking-widest">
                  <span class="text-emerald">{activity.type}</span>
                  <span class="opacity-30">|</span>
                  <span>{activity.time}</span>
                </div>
              </div>
              <button class="text-slate-dim hover:text-white transition-colors p-1">
                <MoreHorizontal size={16} />
              </button>
            </div>
          {/each}
        </div>
        <button class="w-full mt-10 py-4 text-[10px] font-black text-slate-dim hover:text-white border border-white/5 rounded-2xl transition-all hover:bg-navy-light uppercase tracking-[0.2em]">
          Expand Intelligence Feed
        </button>
      </div>

      <!-- AI Advisory Smart Card -->
      <div class="card-premium p-8 bg-emerald text-navy overflow-hidden relative group border-none shadow-glow">
        <div class="absolute -right-6 -bottom-6 text-9xl opacity-[0.1] group-hover:scale-110 transition-transform duration-700">🤖</div>
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            AI Advisory Pro
          </div>
          <h4 class="text-2xl font-heading font-black text-navy mb-4 leading-tight tracking-tight">Optimization Opportunity.</h4>
          <p class="text-sm text-navy/70 font-bold mb-8 leading-relaxed">
            Your logistics expenditure is <span class="text-navy font-black">12.5% higher</span> than the industry average for Lagos-based SMEs.
          </p>
          <button class="w-full py-4 bg-navy text-emerald font-black rounded-2xl text-xs hover:brightness-110 transition-all shadow-xl shadow-navy/20 uppercase tracking-[0.2em]">
            View Optimization Playbook
          </button>
        </div>
      </div>

      <!-- Quick Trust Indicators -->
      <div class="grid grid-cols-2 gap-4">
        <div class="card-premium p-5 flex flex-col items-center text-center bg-surface/50">
          <CheckCircle2 size={24} class="text-emerald mb-3" />
          <div class="text-[10px] font-black uppercase tracking-widest text-slate-dim">FIRS Status</div>
          <div class="text-xs font-black text-white mt-1">COMPLIANT</div>
        </div>
        <div class="card-premium p-5 flex flex-col items-center text-center bg-surface/50">
          <AlertTriangle size={24} class="text-gold mb-3" />
          <div class="text-[10px] font-black uppercase tracking-widest text-slate-dim">Audit Health</div>
          <div class="text-xs font-black text-white mt-1">EXCELLENT</div>
        </div>
      </div>
    </div>
  </div>
</div>
