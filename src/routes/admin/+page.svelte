<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Users, ShieldCheck, FileText, TrendingUp, Search, Filter, 
    MoreHorizontal, UserCheck, ShieldAlert, Activity, Cpu, 
    Database, Globe, Lock, ArrowUpRight, CheckCircle2,
    Briefcase, Sparkles
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const adminStats = [
    { label: 'Enterprise Revenue', value: '₦42.8M', change: '+24.5%', emoji: '💰', icon: TrendingUp },
    { label: 'Active Personnel', value: '52,108', change: '+8.2%', emoji: '👥', icon: Users },
    { label: 'Verified Auditors', value: '542', change: '+12.4%', emoji: '👨‍💼', icon: UserCheck },
    { label: 'AI Audit Cycles', value: '1,284', change: '+15.2%', emoji: '🤖', icon: Activity }
  ];

  const verificationRequests = [
    { id: 'REQ-482', name: 'Dr. Chima Eze', firm: 'Eze & Partners', date: '2h ago', status: 'pending', emoji: '👨‍💼', expertise: 'Tax Law' },
    { id: 'REQ-483', name: 'Sarah Alabi', firm: 'Alabi Audits', date: '4h ago', status: 'pending', emoji: '👩‍💼', expertise: 'Corporate' },
    { id: 'REQ-484', name: 'Musa Bello', firm: 'Bello & Co', date: '6h ago', status: 'pending', emoji: '👨‍💼', expertise: 'Forensics' }
  ];
</script>

<div class="space-y-10 pb-20" in:fade>
  <!-- Admin Stats Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each adminStats as stat}
      <div class="card-premium p-6 group relative overflow-hidden">
        <div class="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
          <stat.icon size={80} />
        </div>
        <div class="relative z-10 flex flex-col h-full">
          <div class="flex items-center justify-between mb-5">
            <div class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
              {stat.emoji}
            </div>
            <div class="bg-primary/5 text-primary px-2.5 py-1 rounded-full text-[10px] font-black border border-primary/10 tracking-widest">
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
    <!-- Platform Activity & Growth -->
    <div class="lg:col-span-2 space-y-8">
      <div class="card-premium p-8">
        <div class="flex items-center justify-between mb-10">
          <div class="space-y-1">
            <h3 class="text-2xl font-heading font-black text-foreground flex items-center gap-3">
              <Activity size={24} class="text-primary" />
              Global Ingestion Pulse
            </h3>
            <p class="text-xs text-muted-foreground font-medium">Real-time data processing across all enterprise nodes.</p>
          </div>
          <div class="flex gap-6">
            <div class="flex items-center gap-2.5 text-[10px] font-black text-primary uppercase tracking-widest">
              <span class="w-2.5 h-2.5 rounded-full bg-primary shadow-glow"></span> Active Node
            </div>
            <div class="flex items-center gap-2.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <span class="w-2.5 h-2.5 rounded-full bg-border"></span> Standby
            </div>
          </div>
        </div>

        <div class="h-64 flex items-end gap-2 px-2 relative group">
          {#each Array(24) as _, i}
            <div 
              class="flex-1 bg-muted/50 hover:bg-primary/10 transition-all duration-300 rounded-t-sm cursor-pointer relative h-full flex items-end group/bar"
            >
              <div class="w-full bg-primary/30 group-hover/bar:bg-primary rounded-t-sm transition-all duration-500" style={`height: ${Math.random() * 80 + 20}%`}></div>
              <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-black px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                {Math.floor(Math.random() * 100)}% Load
              </div>
            </div>
          {/each}
        </div>
        <div class="flex justify-between mt-6 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.4em] pt-6 border-t border-border px-2">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </div>

      <!-- System Security Matrix -->
      <div class="card-premium p-8">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-2xl font-heading font-black text-foreground flex items-center gap-3">
            <Lock size={24} class="text-destructive" />
            Security Intelligence Matrix
          </h3>
          <button class="text-xs font-black text-primary uppercase tracking-widest hover:text-primary/70 transition-colors">Audit Full Log</button>
        </div>
        <div class="space-y-6">
          <div class="flex items-center justify-between p-6 bg-muted/30 rounded-[28px] border border-transparent hover:border-destructive/20 transition-all group">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 rounded-2xl bg-destructive/5 text-destructive flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm"><ShieldAlert size={24} /></div>
              <div class="space-y-0.5">
                <div class="text-sm font-black text-foreground">Pattern Discrepancy Detected</div>
                <div class="text-[10px] text-muted-foreground font-mono font-bold tracking-widest">IP: 192.168.1.254 · LOCATION: LAGOS_NODE_04</div>
              </div>
            </div>
            <button class="btn-primary py-2.5 px-6 text-[10px] bg-destructive text-white hover:bg-destructive/90 border-none shadow-lg shadow-destructive/20 font-black uppercase tracking-widest">BLOCK NODE</button>
          </div>
          <div class="flex items-center justify-between p-6 bg-muted/30 rounded-[28px] border border-transparent hover:border-primary/20 transition-all group">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm"><UserCheck size={24} /></div>
              <div class="space-y-0.5">
                <div class="text-sm font-black text-foreground">Kernel Environment Update</div>
                <div class="text-[10px] text-muted-foreground font-mono font-bold tracking-widest">v4.2.1-enterprise · REVISION: SHA-256-EF44</div>
              </div>
            </div>
            <span class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <CheckCircle2 size={12} />
              STABLE VERIFIED
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Intelligence Sidebar -->
    <div class="space-y-8">
      <!-- Auditor Verification Queue -->
      <div class="card-premium p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-heading font-black text-foreground flex items-center gap-3">
            <Briefcase size={20} class="text-primary" />
            Expert Verification Queue
          </h3>
          <span class="text-[10px] font-black bg-muted text-foreground px-2.5 py-1 rounded-lg border border-border">3 Pending</span>
        </div>
        <div class="space-y-5">
          {#each verificationRequests as req}
            <div class="space-y-5 p-6 bg-muted/30 rounded-[32px] border border-transparent hover:border-border transition-all group">
              <div class="flex gap-4">
                <div class="w-14 h-14 rounded-2xl bg-background flex items-center justify-center text-3xl shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-border">
                  {req.emoji}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">{req.name}</div>
                  <div class="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">{req.firm}</div>
                  <div class="text-[9px] font-bold text-primary uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                    <Sparkles size={10} /> {req.expertise}
                  </div>
                </div>
              </div>
              <div class="flex gap-2 pt-2">
                <button class="flex-1 py-3 bg-primary text-white text-[10px] font-black rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 uppercase tracking-widest">Approve</button>
                <button class="flex-1 py-3 bg-background text-muted-foreground text-[10px] font-black rounded-xl border border-border hover:text-foreground transition-all uppercase tracking-widest">View Credentials</button>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Infrastructure Config -->
      <div class="card-premium p-8 bg-foreground text-background relative overflow-hidden group">
        <div class="absolute -right-6 -bottom-6 text-8xl opacity-[0.05] group-hover:scale-110 transition-transform duration-700">⚙️</div>
        <div class="relative z-10 space-y-6">
          <div class="flex items-center gap-3 text-primary">
            <Cpu size={20} />
            <h4 class="text-sm font-black uppercase tracking-widest">Platform Infrastructure</h4>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between py-2 border-b border-white/10">
              <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Database size={12} /> Data Engine
              </span>
              <span class="text-[10px] font-mono font-black text-white">v8.4.2-PRO</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-white/10">
              <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} /> Latency
              </span>
              <span class="text-[10px] font-mono font-black text-primary">12ms (OPTIMAL)</span>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Globe size={12} /> Runtime
              </span>
              <span class="text-[10px] font-mono font-black text-white">EDGE_WORKER_NG</span>
            </div>
          </div>
          <button class="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black rounded-2xl border border-white/10 transition-all uppercase tracking-[0.2em]">
            Manage Infrastructure
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
