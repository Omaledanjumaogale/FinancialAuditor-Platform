<script lang="ts">
  import { fly } from 'svelte/transition';
  import { CreditCard, TrendingDown, CheckCircle2, Clock, XCircle, Search, Download, ArrowUpRight, DollarSign } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery } from 'convex-svelte';
  import { api } from '$convex/_generated/api';

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const paymentsQuery = $derived(
    currentUser ? useQuery(api.payments.getByUserId, { userId: currentUser._id }) : null
  );
  const payments  = $derived(paymentsQuery?.data || []);
  const isLoading = $derived(!paymentsQuery || paymentsQuery.isLoading);

  let searchQuery = $state('');

  const filtered = $derived(payments.filter(p =>
    !searchQuery ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.reference?.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  const mockPayments = [
    { _id: '1', description: 'Audit Subscription — Pro Plan',  date: Date.now() - 86400000 * 0, amount: 50000,  status: 'completed', reference: 'PAY-2026-001', method: 'Paystack' },
    { _id: '2', description: 'Dr. Chima Eze — Consultation',   date: Date.now() - 86400000 * 3, amount: 85000,  status: 'completed', reference: 'PAY-2026-002', method: 'Bank Transfer' },
    { _id: '3', description: 'AI Audit Credits Top-Up',        date: Date.now() - 86400000 * 7, amount: 20000,  status: 'pending',   reference: 'PAY-2026-003', method: 'Flutterwave' },
    { _id: '4', description: 'Annual Plan Renewal',            date: Date.now() - 86400000 * 14, amount: 200000, status: 'completed', reference: 'PAY-2026-004', method: 'Paystack' },
    { _id: '5', description: 'CAC Filing Support',             date: Date.now() - 86400000 * 21, amount: 15000,  status: 'failed',    reference: 'PAY-2026-005', method: 'Paystack' },
  ];

  const displayPayments = $derived(!isLoading && payments.length === 0 ? mockPayments : filtered);

  const totalSpend     = $derived(displayPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0));
  const pendingCount   = $derived(displayPayments.filter(p => p.status === 'pending').length);
  const completedCount = $derived(displayPayments.filter(p => p.status === 'completed').length);

  function statusIcon(status: string) {
    if (status === 'completed') return CheckCircle2;
    if (status === 'pending') return Clock;
    return XCircle;
  }
  function statusStyle(status: string) {
    if (status === 'completed') return 'background:rgba(16,185,129,0.15);color:#6ee7b7';
    if (status === 'pending')   return 'background:rgba(245,158,11,0.15);color:#fcd34d';
    return 'background:rgba(239,68,68,0.12);color:#fca5a5';
  }
</script>

<svelte:head>
  <title>Payments — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-10" in:fly={{ y: 10, duration: 300 }}>

  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-heading font-bold text-white tracking-tight">Payments</h1>
      <p class="text-sm text-slate-dim mt-0.5">Track all billing activity and transactions</p>
    </div>
    <button class="flex items-center gap-2 py-2 px-4 text-sm rounded-xl border border-white/15 text-slate hover:text-white hover:bg-white/5 transition-all font-medium">
      <Download size={14} aria-hidden="true" />
      Download Statement
    </button>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each [
      { label: 'Total Paid',      value: `₦${(totalSpend/1000).toFixed(0)}K`,  icon: DollarSign,    style: 'background:rgba(16,185,129,0.12);color:#10b981' },
      { label: 'Transactions',    value: String(completedCount),                 icon: CreditCard,    style: 'background:rgba(59,130,246,0.12);color:#60a5fa' },
      { label: 'Pending',         value: String(pendingCount),                   icon: Clock,         style: 'background:rgba(245,158,11,0.12);color:#fbbf24' },
    ] as card, i (card.label)}
      <div class="rounded-2xl p-5 border border-white/8 flex items-center gap-4" style="background-color: #111827;" in:fly={{ y: 8, delay: i * 60, duration: 300 }}>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={card.style} aria-hidden="true">
          <card.icon size={18} />
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-dim uppercase tracking-wider">{card.label}</p>
          <p class="text-xl font-heading font-bold text-white tabular-nums">{card.value}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Search -->
  <div class="relative max-w-sm">
    <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-dim" size={15} aria-hidden="true" />
    <input
      type="search"
      bind:value={searchQuery}
      placeholder="Search payments..."
      class="w-full py-2.5 pl-10 pr-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
      style="background-color: #1f2937;"
      aria-label="Search payments"
    />
  </div>

  <!-- Payments Table -->
  <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color: #111827;">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse" aria-label="Payment history">
        <thead>
          <tr style="background-color:#1f2937;">
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Description</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Date</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Method</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest text-center">Status</th>
            <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {#each displayPayments as pmt (pmt._id)}
            {@const Icon = statusIcon(pmt.status)}
            <tr class="border-t border-white/8 hover:bg-white/3 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm font-medium text-white">{pmt.description}</p>
                <p class="text-xs text-slate-dim mt-0.5">{pmt.reference}</p>
              </td>
              <td class="px-6 py-4 text-xs text-slate-dim">
                {new Date(pmt.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td class="px-6 py-4 text-xs text-slate font-medium">{pmt.method}</td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize" style={statusStyle(pmt.status)}>
                  <Icon size={11} aria-hidden="true" />
                  {pmt.status}
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-bold text-right text-white tabular-nums">
                ₦{pmt.amount.toLocaleString()}
              </td>
            </tr>
          {/each}
          {#if displayPayments.length === 0}
            <tr>
              <td colspan="5" class="px-6 py-14 text-center text-sm text-slate-dim">No payments found.</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
