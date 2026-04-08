<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { 
    TrendingUp, Users, ShieldAlert, FileText, 
    ArrowUpRight, ArrowDownRight, Search, Filter, 
    MoreHorizontal, Sparkles, Activity, Clock,
    CheckCircle2, AlertTriangle, Briefcase, 
    LayoutGrid, ShieldCheck, Zap, Calendar,
    ArrowRight
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import StatCard from '$lib/components/ui/StatCard.svelte';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery, useConvexClient } from "convex-svelte";
  import { api } from "$convex/_generated/api";
  import { executeAIAnalysis } from '$lib/services/ai';

  // Get current user from Convex
  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  
  const currentUser = $derived(userQuery?.data);
  
  const client = useConvexClient();

  // Fetch Analytics
  const analyticsQuery = $derived(
    currentUser ? useQuery(api.analytics.getLatest, { userId: currentUser._id }) : null
  );
  
  const analytics = $derived(analyticsQuery?.data);

  // Fetch Notifications/Recent Activities
  const notificationsQuery = $derived(
    currentUser ? useQuery(api.notifications.getRecent, { userId: currentUser._id, limit: 4 }) : null
  );
  
  const recentActivitiesFromConvex = $derived(notificationsQuery?.data || []);

  const stats = $derived([
    { label: 'Platform Audits', value: analytics?.metrics?.totalAudits || '0', change: '12.5%', trend: 'up' as const, emoji: '📂' },
    { label: 'Active Personnel', value: analytics?.metrics?.activePersonnel || '0', change: '5.2%', trend: 'up' as const, emoji: '👥' },
    { label: 'Detected Anomalies', value: analytics?.metrics?.anomalies || '0', change: '2.4%', trend: 'down' as const, emoji: '⚠️' },
    { label: 'Projected Growth', value: `₦${(analytics?.revenue || 0) / 1000000}M`, change: '18.4%', trend: 'up' as const, emoji: '📈' }
  ]);

  const recentActivities = $derived(recentActivitiesFromConvex.map(notif => ({
    id: notif._id,
    title: notif.title,
    type: notif.type.toUpperCase(),
    time: new Date(notif.createdAt).toLocaleTimeString(),
    status: notif.read ? 'Read' : 'New',
    emoji: notif.emoji
  })));

  // AI Audit Execution
  let isAuditing = $state(false);

  async function handleAIAudit() {
    if (isAuditing || !currentUser) return;
    isAuditing = true;
    
    try {
      // Create a starting notification
      await client.mutation(api.notifications.create, {
        userId: currentUser._id,
        title: "AI Audit Initiated",
        content: "Scanning system for compliance anomalies...",
        type: "audit",
        read: false
      });

      const result = await executeAIAnalysis({
        url: window.location.origin,
        context: "Dashboard overview scan"
      });

      // Notify completion
      await client.mutation(api.notifications.create, {
        userId: currentUser._id,
        title: "Audit Complete",
        content: `Scan finished with ${result.anomalies || 0} anomalies found.`,
        type: "audit",
        read: false
      });
    } catch (err) {
      await client.mutation(api.notifications.create, {
        userId: currentUser._id,
        title: "Audit Failed",
        content: "There was an error executing the AI audit.",
        type: "audit",
        read: false
      });
    } finally {
      isAuditing = false;
    }
  }
</script>

<div class="space-y-10 pb-20 relative z-10 w-full" in:fade>
  <!-- Welcome Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div class="space-y-2">
      <div class="flex items-center gap-3 text-[10px] font-black text-emerald uppercase tracking-[0.3em] mb-1">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
        </span>
        Live Intelligence Console
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">Enterprise Overview</h1>
      <p class="text-slate text-lg font-medium">Welcome back, <span class="text-white font-bold">{currentUser?.name || authState.user?.displayName || 'User'}</span>. Your system is <span class="text-emerald underline decoration-emerald/30 underline-offset-4">{currentUser?.isVerified ? 'fully compliant' : 'pending verification'}</span>.</p>
    </div>
    
    <div class="flex flex-wrap items-center gap-4">
      <button class="btn-secondary py-3 px-6 text-xs flex items-center gap-3 group">
        <span class="text-lg group-hover:rotate-12 transition-transform duration-300">📅</span>
        Fiscal Year 2026
      </button>
      <button 
        onclick={handleAIAudit}
        disabled={isAuditing}
        class="btn-primary py-3 px-8 text-xs flex items-center gap-3 shadow-glow group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class={cn("text-lg transition-transform duration-300", isAuditing ? "animate-spin" : "group-hover:scale-125")}>
          {isAuditing ? '⏳' : '✨'}
        </span>
        {isAuditing ? 'Analyzing...' : 'Execute AI Audit'}
      </button>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stats as stat, i}
      <StatCard {...stat} delay={100 + (i * 100)} />
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Main Performance View -->
    <div class="lg:col-span-2 space-y-8">
      <div class="card-premium p-8 bg-surface/50 relative overflow-hidden group">
        <!-- Background Decoration -->
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald/10 transition-all duration-700"></div>
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
          <div class="space-y-1">
            <h3 class="text-2xl font-heading font-black text-white flex items-center gap-3">
              <span class="text-3xl">📊</span>
              Financial Growth Trajectory
            </h3>
            <p class="text-sm text-slate font-medium">Real-time revenue vs projected benchmarks.</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald"></div>
                <span class="text-[10px] font-black text-white uppercase tracking-wider">Revenue</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-white/20"></div>
                <span class="text-[10px] font-black text-slate-dim uppercase tracking-wider">Target</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="h-80 flex items-end gap-3 relative group px-2 mb-4">
          {#each Array(12) as _, i}
            <div class="flex-1 flex flex-col items-center gap-3 group/bar relative">
              <div 
                class="w-full bg-emerald/10 rounded-t-xl group-hover/bar:bg-emerald/30 transition-all duration-700 relative overflow-hidden"
                style="height: {30 + Math.random() * 60}%"
              >
                <div class="absolute inset-0 bg-gradient-to-t from-emerald/40 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span class="text-[10px] font-black text-slate-dim uppercase tracking-tighter group-hover/bar:text-white transition-colors">
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Compliance Health -->
      <div class="grid sm:grid-cols-2 gap-8">
        <div class="card-premium p-8 flex flex-col gap-6 group hover:border-gold/30 transition-all duration-500">
          <div class="flex items-center justify-between">
            <div class="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
              🛡️
            </div>
            <div class="text-[10px] font-black text-gold border border-gold/20 px-3 py-1 rounded-full uppercase tracking-widest bg-gold/5">
              Secure
            </div>
          </div>
          <div class="space-y-1">
            <h4 class="text-xl font-heading font-black text-white group-hover:text-gold transition-colors">System Integrity</h4>
            <p class="text-sm text-slate">All auditing nodes are operational and synchronized with FIRS database.</p>
          </div>
          <button class="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 group/btn mt-2">
            View Details <ArrowRight size={14} class="text-gold group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>

        <div class="card-premium p-8 flex flex-col gap-6 group hover:border-emerald/30 transition-all duration-500">
          <div class="flex items-center justify-between">
            <div class="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
              📜
            </div>
            <div class="text-[10px] font-black text-emerald border border-emerald/20 px-3 py-1 rounded-full uppercase tracking-widest bg-emerald/5">
              Verified
            </div>
          </div>
          <div class="space-y-1">
            <h4 class="text-xl font-heading font-black text-white group-hover:text-emerald transition-colors">Tax Compliance</h4>
            <p class="text-sm text-slate">Your current fiscal cycle meets all regulatory requirements for 2026.</p>
          </div>
          <button class="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 group/btn mt-2">
            Download Cert <ArrowRight size={14} class="text-emerald group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebar: Activity & Alerts -->
    <div class="space-y-8">
      <div class="card-premium p-8 flex flex-col h-full bg-surface/50">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-heading font-black text-white flex items-center gap-3">
            <span class="text-2xl">⚡</span>
            Recent Events
          </h3>
          <button class="text-[10px] font-black text-slate-dim hover:text-white uppercase tracking-widest transition-colors">
            Clear All
          </button>
        </div>

        <div class="space-y-4">
          {#each recentActivities as activity}
            <div class="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div class="flex items-start gap-4 relative z-10">
                <div class="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                  {activity.emoji}
                </div>
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-black text-emerald uppercase tracking-widest">{activity.type}</span>
                    <span class="text-[10px] font-bold text-slate-dim">{activity.time}</span>
                  </div>
                  <div class="text-sm font-bold text-white leading-tight group-hover:text-emerald transition-colors">{activity.title}</div>
                  <div class="flex items-center gap-2">
                    <div class={cn(
                      "w-1.5 h-1.5 rounded-full",
                      activity.status === 'Completed' || activity.status === 'Success' ? "bg-emerald" : "bg-gold"
                    )}></div>
                    <span class="text-[10px] font-medium text-slate-dim">{activity.status}</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <button class="w-full mt-8 py-4 rounded-xl border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white/20 transition-all">
          View Audit Logs
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
</style>
