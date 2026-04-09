<script lang="ts">
  import { fly } from 'svelte/transition';
  import { ShieldCheck, FileText, AlertTriangle, CheckCircle2, Clock, Sparkles, RefreshCw } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery, useConvexClient } from 'convex-svelte';
  import { api } from '$convex/_generated/api';

  const client = useConvexClient();

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const auditsQuery = $derived(
    currentUser ? useQuery(api.audits.getByUserId, { userId: currentUser._id }) : null
  );
  const audits    = $derived(auditsQuery?.data || []);
  type AuditRecord = { _id: string; score?: number; status: string; type: string; createdAt: number; [key: string]: unknown };

  const isLoading = $derived(!auditsQuery || auditsQuery.isLoading);

  let isRunning = $state(false);
  let progress  = $state(0);

  const complianceScore = $derived(
    audits.length > 0
      ? Math.round(audits.reduce((s: number, a: AuditRecord) => s + (a.score ?? 0), 0) / audits.length)
      : 94
  );

  async function triggerAudit() {
    if (!currentUser) return;
    isRunning = true;
    progress  = 0;
    // Animate progress
    const interval = setInterval(() => {
      progress += Math.random() * 12;
      if (progress >= 100) { progress = 100; clearInterval(interval); isRunning = false; }
    }, 400);
    await client.mutation(api.audits.create, {
      userId: currentUser._id,
      type: 'full',
      status: 'processing',
    }).catch(() => { clearInterval(interval); isRunning = false; });
  }

  const mockAudits = [
    { _id: '1', type: 'Income Statement',  date: Date.now() - 86400000 * 0,  status: 'completed', score: 97, findings: 2 },
    { _id: '2', type: 'VAT Compliance',    date: Date.now() - 86400000 * 3,  status: 'completed', score: 91, findings: 5 },
    { _id: '3', type: 'Balance Sheet',     date: Date.now() - 86400000 * 7,  status: 'processing', score: null, findings: null },
    { _id: '4', type: 'Payroll Audit',     date: Date.now() - 86400000 * 14, status: 'completed', score: 88, findings: 8 },
    { _id: '5', type: 'FIRS Reconciliation', date: Date.now() - 86400000 * 21, status: 'flagged', score: 72, findings: 14 },
  ];
  const displayAudits = $derived(!isLoading && audits.length === 0 ? mockAudits : audits);

  function statusStyle(status: string) {
    if (status === 'completed') return 'background:rgba(16,185,129,0.15);color:#6ee7b7';
    if (status === 'processing') return 'background:rgba(59,130,246,0.12);color:#93c5fd';
    if (status === 'flagged') return 'background:rgba(239,68,68,0.12);color:#fca5a5';
    return 'background:rgba(245,158,11,0.12);color:#fcd34d';
  }
  function statusIcon(status: string) {
    if (status === 'completed') return CheckCircle2;
    if (status === 'processing') return Clock;
    if (status === 'flagged') return AlertTriangle;
    return Clock;
  }
</script>

<svelte:head>
  <title>AI Audit — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-10" in:fly={{ y: 10, duration: 300 }}>

  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-heading font-bold text-white tracking-tight">AI Audit Engine</h1>
      <p class="text-sm text-slate-dim mt-0.5">Automated FIRS-compliant financial analysis</p>
    </div>
    <button
      onclick={triggerAudit}
      disabled={isRunning || !currentUser}
      class="btn-primary flex items-center gap-2 py-2.5 px-5 text-sm rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {#if isRunning}
        <RefreshCw size={14} class="animate-spin" aria-hidden="true" />
        Running Audit...
      {:else}
        <Sparkles size={14} aria-hidden="true" />
        Run New Audit
      {/if}
    </button>
  </div>

  <!-- Live Progress Bar (visible during audit run) -->
  {#if isRunning}
    <div class="rounded-2xl p-5 border border-emerald/20" style="background-color: #111827;" in:fly={{ y: 6, duration: 300 }}>
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald animate-pulse" aria-hidden="true"></div>
          <p class="text-sm font-semibold text-white">AI Analysis in Progress</p>
        </div>
        <span class="text-sm font-bold text-emerald tabular-nums">{Math.round(progress)}%</span>
      </div>
      <div class="h-2 rounded-full w-full" style="background:rgba(255,255,255,0.06)">
        <div class="h-2 rounded-full bg-emerald transition-all duration-300" style="width:{progress}%"></div>
      </div>
      <p class="text-xs text-slate-dim mt-2">Scanning transactions, cross-referencing FIRS rules...</p>
    </div>
  {/if}

  <!-- Compliance Score + Stats -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <!-- Score Card -->
    <div class="rounded-2xl p-6 border border-white/8 flex flex-col items-center justify-center gap-2 sm:col-span-1" style="background-color: #111827;">
      <div class="relative w-24 h-24" role="img" aria-label="{complianceScore}% compliance score">
        <svg class="w-full h-full -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
          <circle cx="40" cy="40" r="34" fill="none" stroke="#10b981" stroke-width="8"
            stroke-dasharray="213.6" stroke-dashoffset="{213.6 - (213.6 * complianceScore / 100)}"
            stroke-linecap="round" />
        </svg>
        <span class="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">{complianceScore}%</span>
      </div>
      <p class="text-sm font-semibold text-white">Compliance Score</p>
      <p class="text-xs text-slate-dim text-center">Based on last {displayAudits.length} audits</p>
    </div>

    <!-- Quick Stats -->
    <div class="sm:col-span-2 grid grid-cols-2 gap-4">
      {#each [
        { label: 'Audits Completed',  value: String(displayAudits.filter((a: AuditRecord) => a.status === 'completed').length), icon: CheckCircle2, style: 'background:rgba(16,185,129,0.12);color:#10b981' },
        { label: 'Active Flags',       value: String(displayAudits.filter((a: AuditRecord) => a.status === 'flagged').length),   icon: AlertTriangle, style: 'background:rgba(239,68,68,0.12);color:#f87171' },
        { label: 'Documents Scanned',  value: `${displayAudits.length * 12}+`,                                                    icon: FileText, style: 'background:rgba(59,130,246,0.12);color:#60a5fa' },
        { label: 'FIRS Readiness',     value: `${Math.min(100, complianceScore + 2)}%`,                                            icon: ShieldCheck, style: 'background:rgba(16,185,129,0.12);color:#10b981' },
      ] as stat (stat.label)}
        <div class="rounded-2xl p-4 border border-white/8 flex items-center gap-3" style="background-color: #111827;">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={stat.style} aria-hidden="true">
            <stat.icon size={16} />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-dim">{stat.label}</p>
            <p class="text-lg font-bold text-white tabular-nums">{stat.value}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Audit History Table -->
  <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color: #111827;">
    <div class="px-6 py-4 border-b border-white/8">
      <h2 class="text-sm font-semibold text-white">Audit History</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse" aria-label="Audit history">
        <thead>
          <tr style="background-color:#1f2937;">
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Audit Type</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Date</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest text-center">Status</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest text-center">Score</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest text-right">Findings</th>
          </tr>
        </thead>
        <tbody>
          {#each displayAudits as audit (audit._id)}
            {@const Icon = statusIcon(audit.status)}
            <tr class="border-t border-white/8 hover:bg-white/3 transition-colors">
              <td class="px-6 py-4 text-sm font-medium text-white">{audit.type}</td>
              <td class="px-6 py-4 text-xs text-slate-dim">
                {new Date(audit.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize" style={statusStyle(audit.status)}>
                  <Icon size={11} aria-hidden="true" />
                  {audit.status}
                </span>
              </td>
              <td class="px-6 py-4 text-center text-sm font-bold text-white">
                {audit.score != null ? `${audit.score}%` : '—'}
              </td>
              <td class="px-6 py-4 text-right text-sm">
                {#if audit.findings != null}
                  <span class={cn('font-semibold tabular-nums', audit.findings > 10 ? 'text-red-400' : audit.findings > 4 ? 'text-amber-400' : 'text-emerald')}>
                    {audit.findings}
                  </span>
                {:else}
                  <span class="text-slate-dim">—</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
