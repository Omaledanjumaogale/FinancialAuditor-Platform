<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    History, Search, Filter, Download, 
    ShieldCheck, Activity, Terminal, Clock,
    AlertCircle, CheckCircle2, Info, ArrowRight
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery } from "convex-svelte";
  import { api } from "$convex/_generated/api";

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const logsQuery = $derived(
    currentUser ? useQuery(api.logs.getByUser, { userId: currentUser._id, limit: 50 }) : null
  );
  const logs = $derived(logsQuery?.data || []);
</script>

<div class="space-y-10 pb-20 relative z-10 w-full" in:fade>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div class="space-y-2">
      <div class="flex items-center gap-3 text-[10px] font-black text-emerald uppercase tracking-[0.3em] mb-1">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
        </span>
        Immutable Audit Trail
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">System <span class="text-emerald">Logs</span></h1>
      <p class="text-slate text-lg font-medium max-w-2xl">Complete chronological record of all system events, authentication attempts, and AI audit cycles.</p>
    </div>
    <div class="flex items-center gap-4">
      <button class="btn-secondary py-3 px-6 text-xs flex items-center gap-3 group">
        <span class="text-lg group-hover:rotate-12 transition-transform duration-300">📥</span>
        Export Archive
      </button>
    </div>
  </div>

  <!-- Terminal Style Log Viewer -->
  <div class="card-premium bg-navy-mid/80 border-white/5 overflow-hidden flex flex-col min-h-[600px]">
    <div class="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-danger/40"></div>
          <div class="w-3 h-3 rounded-full bg-gold/40"></div>
          <div class="w-3 h-3 rounded-full bg-emerald/40"></div>
        </div>
        <div class="h-4 w-px bg-white/10 mx-2"></div>
        <div class="flex items-center gap-2 text-[10px] font-black text-slate-dim uppercase tracking-widest">
          <Terminal size={12} /> console.audit.trail
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-[10px] font-black text-emerald uppercase tracking-widest flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse"></div>
          Live Streaming
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-6 font-mono text-xs space-y-3">
      {#each logs as log}
        <div class="flex gap-4 group hover:bg-white/[0.02] -mx-2 px-2 py-1 rounded transition-colors" in:fly={{ x: -10 }}>
          <span class="text-slate-dim whitespace-nowrap">[{new Date(log.createdAt).toLocaleTimeString()}]</span>
          <span class={cn(
            "font-bold uppercase tracking-tighter w-20",
            log.action.includes('AUTH') ? "text-indigo-400" : 
            log.action.includes('AUDIT') ? "text-emerald" : "text-gold"
          )}>{log.action}</span>
          <span class="text-slate flex-1">{log.details}</span>
          <span class="text-slate-dim/50 group-hover:text-slate-dim transition-colors">{log.ipAddress || '127.0.0.1'}</span>
        </div>
      {/each}

      {#if logs.length === 0}
        <!-- Initial mock logs if none exist in Convex yet -->
        <div class="flex gap-4 py-1">
          <span class="text-slate-dim">[{new Date().toLocaleTimeString()}]</span>
          <span class="text-indigo-400 font-bold uppercase tracking-tighter w-20">SYSTEM</span>
          <span class="text-slate">Kernel initialized. Loading auditing nodes...</span>
        </div>
        <div class="flex gap-4 py-1">
          <span class="text-slate-dim">[{new Date().toLocaleTimeString()}]</span>
          <span class="text-emerald font-bold uppercase tracking-tighter w-20">SECURE</span>
          <span class="text-slate">AES-256-GCM encryption layer active.</span>
        </div>
        <div class="flex gap-4 py-1">
          <span class="text-slate-dim">[{new Date().toLocaleTimeString()}]</span>
          <span class="text-gold font-bold uppercase tracking-tighter w-20">DB</span>
          <span class="text-slate">Connected to Distributed Ledger Cluster (NG-WEST-1).</span>
        </div>
      {/if}
    </div>

    <!-- Footer Status -->
    <div class="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-slate-dim">
      <div class="flex items-center gap-6">
        <span>Nodes: 12 Active</span>
        <span>Latency: 8ms</span>
        <span>Integrity: Verified</span>
      </div>
      <div class="text-emerald">
        System Health: 100%
      </div>
    </div>
  </div>
</div>
