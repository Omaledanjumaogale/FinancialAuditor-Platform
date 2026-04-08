<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    BarChart3, TrendingUp, TrendingDown, ArrowUpRight, 
    ArrowDownRight, Calendar, Download, Filter, 
    MoreHorizontal, Activity, PieChart, Target, ArrowRight
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const metrics = [
    { label: 'Platform Revenue', value: '₦4.2M', change: '+18.4%', status: 'up', emoji: '💰', icon: TrendingUp },
    { label: 'Operational Costs', value: '₦2.4M', change: '-5.2%', status: 'down', emoji: '💸', icon: TrendingDown },
    { label: 'Enterprise Profit', value: '₦1.8M', change: '+12.1%', status: 'up', emoji: '💎', icon: Activity },
    { label: 'EBITDA Margin', value: '34.5%', change: '+14.5%', status: 'up', emoji: '📊', icon: Target }
  ];

  const categories = [
    { name: 'Logistics & Supply', amount: '₦450K', percentage: 45, color: 'destructive' },
    { name: 'Human Capital', amount: '₦850K', percentage: 35, color: 'primary' },
    { name: 'Growth Marketing', amount: '₦250K', percentage: 15, color: 'brand' },
    { name: 'Others', amount: '₦150K', percentage: 5, color: 'info' }
  ];
</script>

<div class="space-y-10 pb-20" in:fade>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
        <BarChart3 size={12} />
        Performance Intelligence
      </div>
      <h1 class="text-3xl md:text-4xl font-heading font-black text-foreground tracking-tight">Advanced Analytics</h1>
      <p class="text-muted-foreground font-medium">Deep-dive into enterprise financial metrics and operational efficiency.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2.5 px-6 text-sm flex items-center gap-2">
        <Calendar size={18} />
        Fiscal Period: Q1 2026
      </button>
      <button class="btn-primary py-2.5 px-6 text-sm flex items-center gap-2 shadow-lg shadow-primary/10">
        <Download size={18} />
        Export Dataset
      </button>
    </div>
  </div>

  <!-- Key Metrics Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each metrics as metric}
      <div class="card-premium p-6 group relative overflow-hidden">
        <div class="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
          <metric.icon size={80} />
        </div>
        <div class="relative z-10 space-y-4">
          <div class="flex justify-between items-start">
            <div class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
              {metric.emoji}
            </div>
            <div class={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
              metric.status === 'up' ? "bg-primary/5 text-primary border-primary/10" : "bg-destructive/5 text-destructive border-destructive/10"
            )}>
              {#if metric.status === 'up'}<ArrowUpRight size={12} />{:else}<ArrowDownRight size={12} />{/if}
              {metric.change}
            </div>
          </div>
          <div>
            <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{metric.label}</div>
            <div class="text-3xl font-heading font-black text-foreground tracking-tight">{metric.value}</div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Sophisticated Performance Chart Area -->
    <div class="lg:col-span-2 card-premium p-10">
      <div class="flex items-center justify-between mb-12">
        <div class="space-y-1">
          <h3 class="text-2xl font-heading font-black text-foreground flex items-center gap-3">
            <Activity size={24} class="text-primary" />
            Enterprise Performance Matrix
          </h3>
          <p class="text-xs text-muted-foreground font-medium">Comparative analysis of inflow vs operational outflow.</p>
        </div>
        <div class="flex gap-6">
          <div class="flex items-center gap-2.5 text-[10px] font-black text-primary uppercase tracking-widest">
            <span class="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span> Gross Revenue
          </div>
          <div class="flex items-center gap-2.5 text-[10px] font-black text-destructive uppercase tracking-widest">
            <span class="w-2.5 h-2.5 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.4)]"></span> Operational Burn
          </div>
        </div>
      </div>

      <div class="h-80 relative flex items-end gap-3 px-2 group">
        {#each Array(12) as _, i}
          <div class="flex-1 flex flex-col items-center gap-1.5 relative group/bar">
            <!-- Revenue Bar -->
            <div 
              class="w-full bg-primary/10 border border-primary/20 rounded-t-lg transition-all duration-500 group-hover/bar:bg-primary/30 group-hover/bar:border-primary group-hover/bar:shadow-glow"
              style={`height: ${Math.random() * 60 + 30}%`}
            ></div>
            <!-- Expense Bar -->
            <div 
              class="w-full bg-destructive/10 border border-destructive/20 rounded-t-lg transition-all duration-500 group-hover/bar:bg-destructive/30 group-hover/bar:border-destructive"
              style={`height: ${Math.random() * 30 + 10}%`}
            ></div>
            <!-- Tooltip -->
            <div class="absolute -top-14 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-4 py-2 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-2xl">
              <div class="text-primary mb-0.5">IN: ₦{(Math.random() * 500 + 300).toFixed(0)}K</div>
              <div class="text-destructive">OUT: ₦{(Math.random() * 200 + 100).toFixed(0)}K</div>
            </div>
          </div>
        {/each}
      </div>
      <div class="flex justify-between mt-8 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.3em] border-t border-border pt-6 px-2">
        <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
      </div>
    </div>

    <!-- Enhanced Expense Breakdown -->
    <div class="card-premium p-10 flex flex-col">
      <div class="flex items-center justify-between mb-10">
        <h3 class="text-2xl font-heading font-black text-foreground flex items-center gap-3">
          <PieChart size={24} class="text-primary" />
          Burn Analysis
        </h3>
        <button class="p-2 hover:bg-muted rounded-lg transition-colors"><MoreHorizontal size={20} /></button>
      </div>

      <div class="space-y-10 flex-1">
        {#each categories as cat}
          <div class="space-y-4 group">
            <div class="flex justify-between items-end">
              <div class="space-y-0.5">
                <span class="text-sm font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{cat.name}</span>
                <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{cat.amount} · {cat.percentage}% Contribution</div>
              </div>
              <ArrowUpRight size={16} class="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div class="h-3 w-full bg-muted rounded-full overflow-hidden border border-border/50">
              <div 
                class={cn("h-full rounded-full transition-all duration-[1500ms] ease-out shadow-sm", 
                  cat.color === 'primary' ? "bg-primary" : 
                  cat.color === 'destructive' ? "bg-destructive" : 
                  cat.color === 'brand' ? "bg-brand-500" : "bg-info")} 
                style={`width: ${cat.percentage}%`}
              ></div>
            </div>
          </div>
        {/each}
      </div>

      <!-- AI Smart Insight Widget -->
      <div class="mt-12 p-8 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-[32px] relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 text-7xl opacity-[0.05] group-hover:scale-110 transition-transform duration-700">💡</div>
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
            Intelligence Alert
          </div>
          <p class="text-sm text-foreground font-semibold leading-relaxed">
            Consolidating your personnel payments through <span class="text-primary font-black">FinancialAuditor Pay</span> could reduce transaction latency by 45% and save ₦42K monthly.
          </p>
          <button class="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all">
            Execute Optimization <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
