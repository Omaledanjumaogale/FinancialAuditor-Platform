<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Activity, AlertTriangle, Info, CheckCircle2, XCircle, Filter, RefreshCw, Download } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  type LogLevel = 'info' | 'success' | 'warning' | 'error';

  interface LogEntry {
    id: number;
    level: LogLevel;
    action: string;
    detail: string;
    user: string;
    time: string;
    ts: number;
  }

  let filterLevel = $state<LogLevel | 'all'>('all');
  let isRefreshing = $state(false);

  const allLogs: LogEntry[] = [
    { id: 1,  level: 'success', action: 'AI Audit Completed',       detail: 'Q3 Income Statement audit passed — Score: 97%',        user: 'System',        time: '18:42:01', ts: Date.now() - 60000 * 1  },
    { id: 2,  level: 'info',    action: 'User Login',               detail: 'Login from Lagos, NG (Chrome / Windows)',               user: 'you@example.ng', time: '18:41:15', ts: Date.now() - 60000 * 2  },
    { id: 3,  level: 'warning', action: 'VAT Discrepancy Detected', detail: 'July remittance differs by ₦12,400 from declaration',   user: 'System',        time: '18:39:50', ts: Date.now() - 60000 * 5  },
    { id: 4,  level: 'info',    action: 'Ledger Entry Added',       detail: 'New credit: Client Retainer Fee — ₦500,000',           user: 'you@example.ng', time: '18:35:22', ts: Date.now() - 60000 * 10 },
    { id: 5,  level: 'success', action: 'Payment Processed',        detail: 'Paystack settlement ₦145,000 received',                user: 'System',        time: '18:30:09', ts: Date.now() - 60000 * 15 },
    { id: 6,  level: 'error',   action: 'Document Upload Failed',   detail: 'PDF exceeded 10MB limit — upload rejected',            user: 'you@example.ng', time: '18:22:44', ts: Date.now() - 60000 * 22 },
    { id: 7,  level: 'info',    action: 'Auditor Assigned',         detail: 'Dr. Chima Eze assigned to Q4 audit request',          user: 'System',        time: '18:15:31', ts: Date.now() - 60000 * 30 },
    { id: 8,  level: 'warning', action: 'Session Expiry Warning',   detail: 'Session will expire in 15 minutes',                    user: 'System',        time: '18:08:01', ts: Date.now() - 60000 * 37 },
    { id: 9,  level: 'success', action: 'FIRS Return Submitted',    detail: 'Q2 VAT return filed successfully',                     user: 'you@example.ng', time: '17:55:17', ts: Date.now() - 60000 * 50 },
    { id: 10, level: 'info',    action: 'Profile Updated',          detail: 'Business name and CAC number updated',                 user: 'you@example.ng', time: '17:44:22', ts: Date.now() - 60000 * 61 },
    { id: 11, level: 'error',   action: 'Convex Sync Error',        detail: 'Temporary connection timeout — retried successfully',  user: 'System',        time: '17:30:00', ts: Date.now() - 60000 * 75 },
    { id: 12, level: 'success', action: 'Report Downloaded',        detail: 'Annual income statement exported as PDF',              user: 'you@example.ng', time: '17:12:55', ts: Date.now() - 60000 * 93 },
  ];

  const filtered = $derived(
    filterLevel === 'all' ? allLogs : allLogs.filter(l => l.level === filterLevel)
  );

  function levelStyle(level: LogLevel) {
    if (level === 'success') return { badge: 'background:rgba(16,185,129,0.15);color:#6ee7b7', dot: '#10b981', Icon: CheckCircle2 };
    if (level === 'warning') return { badge: 'background:rgba(245,158,11,0.15);color:#fcd34d', dot: '#f59e0b', Icon: AlertTriangle };
    if (level === 'error')   return { badge: 'background:rgba(239,68,68,0.12);color:#fca5a5', dot: '#ef4444', Icon: XCircle };
    return { badge: 'background:rgba(59,130,246,0.12);color:#93c5fd', dot: '#3b82f6', Icon: Info };
  }

  function refresh() {
    isRefreshing = true;
    setTimeout(() => { isRefreshing = false; }, 1200);
  }

  const counts = $derived({
    all:     allLogs.length,
    success: allLogs.filter(l => l.level === 'success').length,
    warning: allLogs.filter(l => l.level === 'warning').length,
    error:   allLogs.filter(l => l.level === 'error').length,
    info:    allLogs.filter(l => l.level === 'info').length,
  });
</script>

<svelte:head>
  <title>System Logs — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-10" in:fly={{ y: 10, duration: 300 }}>

  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-heading font-bold text-white tracking-tight">System Logs</h1>
      <p class="text-sm text-slate-dim mt-0.5">Platform activity and audit trail</p>
    </div>
    <div class="flex items-center gap-2">
      <button onclick={refresh} class="flex items-center gap-1.5 py-2 px-4 text-sm rounded-xl border border-white/10 text-slate hover:text-white hover:bg-white/5 transition-all font-medium" aria-label="Refresh logs">
        <RefreshCw size={14} class={isRefreshing ? 'animate-spin' : ''} aria-hidden="true" />
        Refresh
      </button>
      <button class="flex items-center gap-1.5 py-2 px-4 text-sm rounded-xl border border-white/10 text-slate hover:text-white hover:bg-white/5 transition-all font-medium">
        <Download size={14} aria-hidden="true" />
        Export
      </button>
    </div>
  </div>

  <!-- Summary Chips -->
  <div class="flex flex-wrap gap-2">
    {#each [
      { key: 'all',     label: 'All',      count: counts.all,     style: 'border-white/15; color: #f1f5f9', activeStyle: 'background:rgba(255,255,255,0.1)' },
      { key: 'success', label: 'Success',  count: counts.success, style: 'border-emerald/30; color: #6ee7b7', activeStyle: 'background:rgba(16,185,129,0.15)' },
      { key: 'warning', label: 'Warning',  count: counts.warning, style: 'border-amber-500/30; color: #fcd34d', activeStyle: 'background:rgba(245,158,11,0.15)' },
      { key: 'error',   label: 'Error',    count: counts.error,   style: 'border-red-500/30; color: #fca5a5',  activeStyle: 'background:rgba(239,68,68,0.12)' },
      { key: 'info',    label: 'Info',     count: counts.info,    style: 'border-blue-500/30; color: #93c5fd', activeStyle: 'background:rgba(59,130,246,0.12)' },
    ] as chip (chip.key)}
      <button
        onclick={() => filterLevel = chip.key as any}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
        style="{filterLevel === chip.key ? chip.activeStyle : 'background:rgba(255,255,255,0.03)'};border-color:rgba(255,255,255,0.1);color:{chip.key === 'all' ? '#f1f5f9' : chip.key === 'success' ? '#6ee7b7' : chip.key === 'warning' ? '#fcd34d' : chip.key === 'error' ? '#fca5a5' : '#93c5fd'}"
      >
        {chip.label}
        <span class="opacity-70">({chip.count})</span>
      </button>
    {/each}
  </div>

  <!-- Log Entries -->
  <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color:#0d1117; font-family: var(--font-mono);">
    <!-- Terminal Header -->
    <div class="px-5 py-3 border-b border-white/8 flex items-center gap-2" style="background-color:#161b22;">
      <div class="flex gap-1.5" aria-hidden="true">
        <div class="w-3 h-3 rounded-full bg-red-500/70"></div>
        <div class="w-3 h-3 rounded-full bg-amber-500/70"></div>
        <div class="w-3 h-3 rounded-full bg-emerald/70"></div>
      </div>
      <span class="text-xs text-slate-dim ml-2">audit.log — {filtered.length} entries</span>
      <div class="ml-auto flex items-center gap-1.5 text-xs text-emerald">
        <div class="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" aria-hidden="true"></div>
        Live
      </div>
    </div>

    <!-- Log Body -->
    <div class="divide-y" style="divide-color:rgba(255,255,255,0.04)" role="log" aria-label="System log entries" aria-live="polite">
      {#each filtered as log, i (log.id)}
        {@const ls = levelStyle(log.level)}
        <div class="px-5 py-3.5 hover:bg-white/2 transition-colors flex items-start gap-4 group" in:fly={{ y: 4, delay: i * 20, duration: 200 }}>
          <!-- Time -->
          <span class="text-[11px] text-slate-dim shrink-0 tabular-nums mt-0.5">{log.time}</span>

          <!-- Level dot -->
          <div class="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style="background:{ls.dot}" aria-hidden="true"></div>

          <!-- Content -->
          <div class="flex-1 min-w-0 space-y-0.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm font-semibold text-white">{log.action}</span>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={ls.badge}>{log.level.toUpperCase()}</span>
            </div>
            <p class="text-xs text-slate-dim leading-snug">{log.detail}</p>
          </div>

          <!-- User -->
          <span class="text-[11px] text-slate-dim shrink-0 hidden sm:block">{log.user}</span>
        </div>
      {/each}

      {#if filtered.length === 0}
        <div class="px-5 py-16 text-center">
          <Activity size={32} class="mx-auto mb-3 text-slate-dim opacity-30" aria-hidden="true" />
          <p class="text-sm text-slate-dim">No log entries match this filter.</p>
        </div>
      {/if}
    </div>
  </div>
</div>
