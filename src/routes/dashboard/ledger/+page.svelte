<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { BookOpen, Search, Filter, Download, Plus, MoreHorizontal, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const transactions = [
    { id: 'TRX-8429', date: 'Mar 15, 2024', description: 'Logistics - Lagos Delivery', category: 'Expense', amount: '₦45,000', status: 'verified', emoji: '🚚' },
    { id: 'TRX-8430', date: 'Mar 14, 2024', description: 'Client Payment - E-WIN Project', category: 'Income', amount: '₦850,000', status: 'verified', emoji: '💰' },
    { id: 'TRX-8431', date: 'Mar 14, 2024', description: 'Cloud Subscription - AWS', category: 'Expense', amount: '₦12,500', status: 'pending', emoji: '☁️' },
    { id: 'TRX-8432', date: 'Mar 13, 2024', description: 'Office Supplies - Yaba Hub', category: 'Expense', amount: '₦8,400', status: 'verified', emoji: '📦' },
    { id: 'TRX-8433', date: 'Mar 12, 2024', description: 'FIRS VAT Payment Q1', category: 'Tax', amount: '₦125,000', status: 'verified', emoji: '🏛️' },
    { id: 'TRX-8434', date: 'Mar 12, 2024', description: 'Consultation Fee - Tech Firm', category: 'Income', amount: '₦250,000', status: 'verified', emoji: '🤝' }
  ];
</script>

<div class="space-y-8" in:fade>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-heading font-black text-white">Digital Ledger 📚</h1>
      <p class="text-slate-dim">Your immutable blockchain-secured audit trail of all transactions.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2.5 px-6 border-white/10 text-white flex items-center gap-2">
        <Download size={18} />
        Export CSV
      </button>
      <button class="btn-primary py-2.5 px-6 flex items-center gap-2">
        <Plus size={18} />
        Add Entry
      </button>
    </div>
  </div>

  <!-- Search & Filters -->
  <div class="card-premium p-4 flex flex-col md:flex-row gap-4 items-center">
    <div class="relative flex-1 w-full">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dim" size={18} />
      <input 
        type="text" 
        placeholder="Search transactions by description, ID or amount..." 
        class="w-full bg-navy border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50"
      />
    </div>
    <div class="flex gap-2 w-full md:w-auto">
      <button class="flex-1 md:flex-none btn-secondary py-3 px-6 flex items-center justify-center gap-2 border-white/10 text-white">
        <Filter size={18} /> Filters
      </button>
      <button class="flex-1 md:flex-none btn-primary py-3 px-6">Search</button>
    </div>
  </div>

  <!-- Transactions Table -->
  <div class="card-premium overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-white/5 border-b border-white/10">
          <tr>
            <th class="px-6 py-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">Transaction ID</th>
            <th class="px-6 py-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">Date</th>
            <th class="px-6 py-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">Description</th>
            <th class="px-6 py-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">Category</th>
            <th class="px-6 py-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest text-right">Amount</th>
            <th class="px-6 py-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest text-center">Status</th>
            <th class="px-6 py-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest text-center">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          {#each transactions as trx}
            <tr class="hover:bg-white/5 transition-all group">
              <td class="px-6 py-4 font-mono text-xs text-emerald font-bold">{trx.id}</td>
              <td class="px-6 py-4 text-xs text-slate-dim">{trx.date}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <span class="text-xl group-hover:scale-110 transition-transform">{trx.emoji}</span>
                  <span class="text-sm font-bold text-white">{trx.description}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg",
                  trx.category === 'Income' ? "bg-emerald/10 text-emerald" : 
                  trx.category === 'Expense' ? "bg-danger/10 text-danger" : "bg-gold/10 text-gold"
                )}>
                  {trx.category}
                </span>
              </td>
              <td class={cn(
                "px-6 py-4 text-sm font-black text-right",
                trx.category === 'Income' ? "text-emerald" : "text-danger"
              )}>
                {trx.category === 'Income' ? '+' : '-'}{trx.amount}
              </td>
              <td class="px-6 py-4 text-center">
                {#if trx.status === 'verified'}
                  <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald bg-emerald/10 px-2 py-1 rounded-lg">
                    ✅ Verified
                  </span>
                {:else}
                  <span class="inline-flex items-center gap-1 text-[10px] font-bold text-gold bg-gold/10 px-2 py-1 rounded-lg animate-pulse">
                    ⏳ Pending
                  </span>
                {/if}
              </td>
              <td class="px-6 py-4 text-center">
                <button class="text-slate-dim hover:text-white transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
      <div class="text-xs text-slate-dim">Showing <span class="text-white font-bold">1-10</span> of <span class="text-white font-bold">1,284</span> entries</div>
      <div class="flex gap-2">
        <button class="btn-secondary py-1.5 px-4 text-xs border-white/10 text-white">Previous</button>
        <button class="btn-primary py-1.5 px-4 text-xs">Next</button>
      </div>
    </div>
  </div>
</div>
