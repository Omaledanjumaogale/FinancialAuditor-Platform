<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Search, Filter, Download, ChevronLeft, ChevronRight, ArrowUpRight, TrendingUp, TrendingDown, DollarSign, FileText, ShieldCheck } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery } from 'convex-svelte';
  import { api } from '$convex/_generated/api';

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const ledgerQuery = $derived(
    currentUser ? useQuery(api.ledger.getByUserId, { userId: currentUser._id }) : null
  );
  const allEntries = $derived(ledgerQuery?.data || []);
  const isLoading  = $derived(!ledgerQuery || ledgerQuery.isLoading);

  let searchQuery  = $state('');
  let filterType   = $state<'all' | 'credit' | 'debit'>('all');
  let currentPage  = $state(1);
  const PAGE_SIZE  = 10;

  const filtered = $derived(
    allEntries.filter(e => {
      const matchSearch = !searchQuery ||
        e.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || (filterType === 'credit' ? e.amount >= 0 : e.amount < 0);
      return matchSearch && matchType;
    })
  );

  const totalPages    = $derived(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)));
  const paginatedItems = $derived(filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE));

  const summaryCredit = $derived(allEntries.filter(e => e.amount >= 0).reduce((s, e) => s + e.amount, 0));
  const summaryDebit  = $derived(allEntries.filter(e => e.amount < 0).reduce((s, e) => s + e.amount, 0));
  const netBalance    = $derived(summaryCredit + summaryDebit);

  // Mock data when database is empty
  const mockEntries = [
    { _id: '1', description: 'Client Retainer Fee',     date: Date.now() - 86400000 * 0, category: 'Revenue',  amount: 500000  },
    { _id: '2', description: 'Paystack Settlement',      date: Date.now() - 86400000 * 1, category: 'Payment',  amount: 145000  },
    { _id: '3', description: 'FIRS Tax Remittance',      date: Date.now() - 86400000 * 2, category: 'Tax',      amount: -220000 },
    { _id: '4', description: 'Q3 External Audit Fee',    date: Date.now() - 86400000 * 3, category: 'Audit',    amount: -85000  },
    { _id: '5', description: 'Office Lease Payment',     date: Date.now() - 86400000 * 4, category: 'Expense',  amount: -60000  },
    { _id: '6', description: 'Invoice #INV-2024-089',    date: Date.now() - 86400000 * 5, category: 'Revenue',  amount: 320000  },
    { _id: '7', description: 'CAC Filing Fee',           date: Date.now() - 86400000 * 6, category: 'Tax',      amount: -15000  },
    { _id: '8', description: 'Auditor Consultation',     date: Date.now() - 86400000 * 7, category: 'Audit',    amount: -45000  },
  ];

  const displayEntries = $derived(!isLoading && allEntries.length === 0 ? mockEntries : paginatedItems);
</script>

<svelte:head>
  <title>General Ledger — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-10" in:fly={{ y: 10, duration: 300 }}>

  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-heading font-bold text-white tracking-tight">General Ledger</h1>
      <p class="text-sm text-slate-dim mt-0.5">All financial transactions and records</p>
    </div>
    <button class="btn-secondary flex items-center gap-2 py-2 px-4 text-sm rounded-xl border border-white/15 text-slate hover:text-white hover:bg-white/5 transition-all">
      <Download size={14} aria-hidden="true" />
      Export CSV
    </button>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each [
      { label: 'Total Credits', value: `₦${(summaryCredit/1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-emerald', bg: 'rgba(16,185,129,0.12)' },
      { label: 'Total Debits',  value: `₦${(Math.abs(summaryDebit)/1000).toFixed(0)}K`, icon: TrendingDown, color: 'text-red-400', bg: 'rgba(239,68,68,0.12)' },
      { label: 'Net Balance',   value: `₦${(netBalance/1000).toFixed(0)}K`, icon: DollarSign, color: netBalance >= 0 ? 'text-emerald' : 'text-red-400', bg: 'rgba(16,185,129,0.08)' },
    ] as card, i (card.label)}
      <div class="rounded-2xl p-5 border border-white/8 flex items-center gap-4" style="background-color: #111827;" in:fly={{ y: 8, delay: i * 60, duration: 300 }}>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: {card.bg}" aria-hidden="true">
          <card.icon size={18} class={card.color} />
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-dim uppercase tracking-wider">{card.label}</p>
          <p class="{card.color} text-xl font-heading font-bold tabular-nums">{card.value}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Filters Row -->
  <div class="flex flex-col sm:flex-row gap-3">
    <div class="relative flex-1">
      <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-dim" size={15} aria-hidden="true" />
      <input
        type="search"
        bind:value={searchQuery}
        placeholder="Search transactions..."
        class="w-full py-2.5 pl-10 pr-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
        style="background-color: #1f2937;"
        aria-label="Search ledger entries"
      />
    </div>
    <div class="flex gap-2">
      {#each ['all', 'credit', 'debit'] as type (type)}
        <button
          onclick={() => { filterType = type as any; currentPage = 1; }}
          class={cn('px-4 py-2 text-sm rounded-xl border font-medium capitalize transition-all', filterType === type
            ? 'bg-emerald text-white border-emerald'
            : 'border-white/10 text-slate hover:text-white hover:bg-white/5'
          )}
        >
          {type}
        </button>
      {/each}
    </div>
  </div>

  <!-- Ledger Table -->
  <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color: #111827;">
    {#if isLoading}
      <div class="space-y-0">
        {#each [1,2,3,4,5] as _ (_)}
          <div class="px-6 py-4 border-b border-white/8 flex items-center gap-4">
            <div class="h-4 rounded flex-1" style="background: rgba(255,255,255,0.05); animation: shimmer 1.5s ease infinite;"></div>
            <div class="h-4 rounded w-24" style="background: rgba(255,255,255,0.05);"></div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse" aria-label="Ledger entries">
          <thead>
            <tr style="background-color: #1f2937;">
              <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Description</th>
              <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Date</th>
              <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest">Category</th>
              <th class="px-6 py-3 text-[10px] font-semibold text-slate-dim uppercase tracking-widest text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {#each displayEntries as entry (entry._id)}
              <tr class="border-t border-white/8 hover:bg-white/3 transition-colors">
                <td class="px-6 py-4 text-sm text-white font-medium">{entry.description}</td>
                <td class="px-6 py-4 text-xs text-slate-dim">
                  {new Date(entry.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td class="px-6 py-4">
                  <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                    style={entry.amount >= 0 ? 'background:rgba(16,185,129,0.15);color:#6ee7b7' : 'background:rgba(239,68,68,0.12);color:#fca5a5'}>
                    {entry.category}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm font-bold text-right {entry.amount >= 0 ? 'text-emerald' : 'text-red-400'} tabular-nums">
                  {entry.amount >= 0 ? '+' : ''}₦{Math.abs(entry.amount).toLocaleString()}
                </td>
              </tr>
            {/each}
            {#if displayEntries.length === 0}
              <tr>
                <td colspan="4" class="px-6 py-14 text-center text-sm text-slate-dim">
                  <FileText size={32} class="mx-auto mb-3 text-slate-dim opacity-40" aria-hidden="true" />
                  No transactions found.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="px-6 py-4 border-t border-white/8 flex items-center justify-between">
          <p class="text-xs text-slate-dim">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div class="flex items-center gap-2">
            <button onclick={() => currentPage = Math.max(1, currentPage - 1)} disabled={currentPage === 1}
              class="p-1.5 rounded-lg border border-white/10 text-slate hover:text-white hover:bg-white/5 disabled:opacity-40 transition-all" aria-label="Previous page">
              <ChevronLeft size={15} aria-hidden="true" />
            </button>
            <span class="text-xs text-slate font-medium px-2">{currentPage} / {totalPages}</span>
            <button onclick={() => currentPage = Math.min(totalPages, currentPage + 1)} disabled={currentPage === totalPages}
              class="p-1.5 rounded-lg border border-white/10 text-slate hover:text-white hover:bg-white/5 disabled:opacity-40 transition-all" aria-label="Next page">
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>
