<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    TrendingUp, Users, ShieldAlert, FileText, 
    ArrowUpRight, ArrowDownRight, Search, Filter, 
    MoreHorizontal, Sparkles, Activity, Clock,
    CheckCircle2, AlertTriangle, Briefcase
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const stats = [
    { label: 'Platform Audits', value: '1,284', change: '+12.5%', icon: FileText, color: 'primary', emoji: '📂' },
    { label: 'Active Personnel', value: '842', change: '+5.2%', icon: Users, color: 'brand', emoji: '👥' },
    { label: 'Detected Anomalies', value: '12', change: '-2.4%', icon: ShieldAlert, color: 'destructive', emoji: '⚠️' },
    { label: 'Projected Growth', value: '₦4.2M', change: '+18.4%', icon: TrendingUp, color: 'primary', emoji: '📈' }
  ];

  const recentActivities = [
    { id: 1, title: 'FIRS Audit Report Generated', type: 'Report', time: '2 mins ago', status: 'Completed', emoji: '📄', color: 'primary' },
    { id: 2, title: 'Anomalies detected in Logistics', type: 'Alert', time: '15 mins ago', status: 'Warning', emoji: '🚨', color: 'brand' },
    { id: 3, title: 'New ICAN Auditor Connected', type: 'User', time: '1 hour ago', status: 'Success', emoji: '🤝', color: 'primary' },
    { id: 4, title: 'VAT Calculation Updated', type: 'Tax', time: '3 hours ago', status: 'Completed', emoji: '📊', color: 'primary' }
  ];
</script>

<div class="space-y-10 pb-20" in:fade>
  <!-- Welcome Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
        <Activity size={12} />
        Live Intelligence Console
      </div>
      <h1 class="text-3xl md:text-4xl font-heading font-black text-foreground tracking-tight">Enterprise Overview</h1>
      <p class="text-muted-foreground font-medium">Welcome back, <span class="text-foreground font-bold">Adaeze Okonkwo</span>. Your system is <span class="text-primary">fully compliant</span>.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2.5 px-5 text-sm flex items-center gap-2">
        <Filter size={16} />
        Advanced Filters
      </button>
      <button class="btn-primary py-2.5 px-5 text-sm flex items-center gap-2 shadow-lg shadow-primary/10">
        <Sparkles size={16} />
        <span>Execute AI Audit</span>
      </button>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stats as stat}
      <div class="card-premium p-6 group relative overflow-hidden">
        <div class="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
          <stat.icon size={80} />
        </div>
        <div class="relative z-10 flex flex-col h-full">
          <div class="flex items-center justify-between mb-5">
            <div class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
              {stat.emoji}
            </div>
            <div class={cn(
              "text-[10px] font-black px-2 py-1 rounded-lg border",
              stat.change.startsWith('+') 
                ? "bg-primary/5 text-primary border-primary/10" 
                : "bg-destructive/5 text-destructive border-destructive/10"
            )}>
              {stat.change}
            </div>
          </div>
          <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</div>
          <div class="text-3xl font-heading font-black text-foreground tracking-tight">{stat.value}</div>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Main Performance View -->
    <div class="lg:col-span-2 space-y-8">
      <div class="card-premium p-8">
        <div class="flex items-center justify-between mb-10">
          <div class="space-y-1">
            <h3 class="text-xl font-heading font-black text-foreground flex items-center gap-2">
              <TrendingUp size={20} class="text-primary" />
              Financial Growth Trajectory
            </h3>
            <p class="text-xs text-muted-foreground font-medium">Real-time revenue vs projected benchmarks.</p>
          </div>
          <select class="bg-muted border border-transparent rounded-xl text-[10px] font-black text-muted-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all uppercase tracking-widest">
            <option>Q1 2026 Analysis</option>
            <option>Last 30 Days</option>
            <option>Fiscal Year 2025</option>
          </select>
        </div>
        
        <div class="h-72 flex items-end gap-2.5 relative group px-2">
          {#each Array(12) as _, i}
            <div 
              class="flex-1 bg-muted rounded-t-lg transition-all duration-300 hover:bg-primary/10 cursor-pointer relative flex items-end"
              style={`height: ${Math.random() * 80 + 20}%`}
            >
              <div class="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary/40 transition-colors" style={`height: ${Math.random() * 60 + 20}%`}></div>
              <!-- Hover Tooltip -->
              <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">
                ₦{(Math.random() * 500).toFixed(0)}K · {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
              </div>
            </div>
          {/each}
        </div>
        <div class="flex justify-between mt-6 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.3em] border-t border-border pt-6 px-2">
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
        </div>
      </div>

      <!-- Actionable Insights Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card-premium p-8 group cursor-pointer relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent border-primary/10 hover:border-primary/30">
          <div class="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
            <Sparkles size={100} />
          </div>
          <div class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-primary/20">📤</div>
          <h4 class="text-xl font-heading font-black text-foreground mb-2">Platform Ingestion</h4>
          <p class="text-sm text-muted-foreground font-medium mb-6 leading-relaxed">Securely upload invoices, bank statements, or CAC records for instant AI audit processing.</p>
          <div class="text-primary text-xs font-black flex items-center gap-2 uppercase tracking-widest">
            Deploy Data <ArrowUpRight size={14} />
          </div>
        </div>
        <div class="card-premium p-8 group cursor-pointer relative overflow-hidden bg-gradient-to-br from-brand-500/5 to-transparent border-brand-500/10 hover:border-brand-500/30">
          <div class="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
            <Briefcase size={100} />
          </div>
          <div class="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-brand-500/20">🔍</div>
          <h4 class="text-xl font-heading font-black text-foreground mb-2">Auditor Network</h4>
          <p class="text-sm text-muted-foreground font-medium mb-6 leading-relaxed">Connect with ICAN certified professionals to verify your platform findings and sign off reports.</p>
          <div class="text-brand-600 text-xs font-black flex items-center gap-2 uppercase tracking-widest">
            Browse Experts <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>

    <!-- Intelligence Sidebar -->
    <div class="space-y-8">
      <!-- Live Activity Feed -->
      <div class="card-premium p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-heading font-black text-foreground flex items-center gap-2">
            <Clock size={20} class="text-primary" />
            Platform Pulse
          </h3>
          <button class="text-[10px] font-black text-primary uppercase tracking-widest hover:text-primary/70 transition-colors">History</button>
        </div>
        <div class="space-y-7">
          {#each recentActivities as activity}
            <div class="flex gap-4 relative group">
              <div class="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center text-xl shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                {activity.emoji}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">{activity.title}</div>
                <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">
                  <span class="text-primary">{activity.type}</span>
                  <span class="opacity-30">|</span>
                  <span>{activity.time}</span>
                </div>
              </div>
              <button class="text-muted-foreground hover:text-foreground transition-colors p-1">
                <MoreHorizontal size={16} />
              </button>
            </div>
          {/each}
        </div>
        <button class="w-full mt-10 py-4 text-[10px] font-black text-muted-foreground hover:text-foreground border border-border rounded-2xl transition-all hover:bg-muted uppercase tracking-[0.2em]">
          Expand Intelligence Feed
        </button>
      </div>

      <!-- AI Advisory Smart Card -->
      <div class="card-premium p-8 bg-foreground text-background overflow-hidden relative group">
        <div class="absolute -right-6 -bottom-6 text-9xl opacity-[0.05] group-hover:scale-110 transition-transform duration-700">🤖</div>
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            AI Advisory Pro
          </div>
          <h4 class="text-2xl font-heading font-black text-white mb-4 leading-tight tracking-tight">Optimization Opportunity.</h4>
          <p class="text-sm text-muted-foreground font-medium mb-8 leading-relaxed">
            Your logistics expenditure is <span class="text-destructive font-black">12.5% higher</span> than the industry average for Lagos-based SMEs.
          </p>
          <button class="w-full py-4 bg-primary text-white font-black rounded-2xl text-xs hover:brightness-110 transition-all shadow-xl shadow-primary/20 uppercase tracking-[0.2em]">
            View Optimization Playbook
          </button>
        </div>
      </div>

      <!-- Quick Trust Indicators -->
      <div class="grid grid-cols-2 gap-4">
        <div class="card-premium p-5 flex flex-col items-center text-center">
          <CheckCircle2 size={24} class="text-primary mb-3" />
          <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">FIRS Status</div>
          <div class="text-xs font-black text-foreground mt-1">COMPLIANT</div>
        </div>
        <div class="card-premium p-5 flex flex-col items-center text-center">
          <AlertTriangle size={24} class="text-brand-500 mb-3" />
          <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Audit Health</div>
          <div class="text-xs font-black text-foreground mt-1">EXCELLENT</div>
        </div>
      </div>
    </div>
  </div>
</div>
