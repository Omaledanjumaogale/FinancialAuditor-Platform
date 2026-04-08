<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    BookOpen, Search, Filter, Download, Plus, 
    MoreHorizontal, ArrowUpRight, ArrowDownRight, 
    FileText, CheckCircle2, Clock, ShieldCheck,
    Calendar, LayoutGrid, List
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery } from "convex-svelte";
  import { api } from "$convex/_generated/api";

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const transactionsQuery = $derived(
    currentUser ? useQuery(api.transactions.getByUser, { userId: currentUser._id }) : null
  );
  const transactions = $derived(transactionsQuery?.data || []);

  const income = $derived(transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0));
  const expenses = $derived(transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0));
  const balance = $derived(income - expenses);
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
        Blockchain Secured Ledger
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">Enterprise <span class="text-emerald">Ledger</span></h1>
      <p class="text-slate text-lg font-medium max-w-2xl">Immutable audit trail of all financial interactions and document processing synchronized in real-time.</p>
    </div>
    <div class="flex items-center gap-4">
      <button class="btn-secondary py-3 px-6 text-xs flex items-center gap-3 group">
        <span class="text-lg group-hover:rotate-12 transition-transform duration-300">📥</span>
        Export Audit Log
      </button>
      <button class="btn-primary py-3 px-8 text-xs flex items-center gap-3 shadow-glow group">
        <span class="text-lg group-hover:scale-125 transition-transform duration-300">➕</span>
        Manual Entry
      </button>
    </div>
  </div>

  <!-- Search & View Controls -->
  <div class="flex flex-col lg:flex-row gap-6 items-center">
    <div class="card-premium p-2 flex items-center gap-2 flex-1 w-full bg-white/5 border-white/10 group focus-within:border-emerald/40 transition-all duration-500">
      <div class="relative flex-1 group/input">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within/input:text-emerald transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search by ID, description, or amount..." 
          class="w-full bg-transparent border-none py-3 pl-12 pr-4 text-base text-white placeholder:text-slate-dim focus:outline-none font-medium tracking-tight"
        />
      </div>
      <div class="h-8 w-px bg-white/10 hidden sm:block"></div>
      <button class="btn-ghost py-2.5 px-6 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:text-emerald transition-colors">
        <Filter size={14} /> Filters
      </button>
    </div>
    <div class="flex gap-4 w-full lg:w-auto">
      <div class="card-premium p-1.5 flex gap-1 bg-white/5 border-white/10">
        <button class="p-2.5 bg-emerald/10 shadow-sm rounded-xl text-emerald border border-emerald/20 transition-all"><List size={20} /></button>
        <button class="p-2.5 text-slate-dim hover:text-white hover:bg-white/5 rounded-xl transition-all"><LayoutGrid size={20} /></button>
      </div>
      <button class="card-premium px-6 py-3 bg-white/5 border-white/10 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 flex-1 lg:flex-none justify-center hover:border-emerald/30 transition-all duration-300">
        <Calendar size={16} class="text-emerald" /> Last 30 Days
      </button>
    </div>
  </div>

  <!-- Enterprise Data Table -->
  <div class="card-premium overflow-hidden bg-surface/40 backdrop-blur-sm border-white/10 group/table">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-white/[0.03] border-b border-white/5">
          <tr>
            <th class="px-8 py-6 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em]">Hash / ID</th>
            <th class="px-6 py-6 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em]">Timestamp</th>
            <th class="px-6 py-6 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em]">Transaction / Event</th>
            <th class="px-6 py-6 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em]">Category</th>
            <th class="px-6 py-6 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em] text-right">Value (NGN)</th>
            <th class="px-6 py-6 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em] text-center">Status</th>
            <th class="px-8 py-6 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          {#each transactions as trx, i}
            <tr 
              class="hover:bg-white/[0.02] transition-all duration-300 group/row"
              in:fly={{ y: 10, delay: i * 50 }}
            >
              <td class="px-8 py-7">
                <div class="flex flex-col gap-1.5">
                  <span class="font-mono text-xs text-emerald font-bold tracking-widest">{trx._id.toString().slice(-8).toUpperCase()}</span>
                  <span class="text-[9px] font-black text-slate-dim uppercase tracking-[0.2em] opacity-0 group-hover/row:opacity-100 transition-opacity">Node: NG-AUTH-01</span>
                </div>
              </td>
              <td class="px-6 py-7">
                <div class="flex items-center gap-3 text-sm font-bold text-slate group-hover/row:text-white transition-colors">
                  <Clock size={14} class="text-emerald/60" />
                  {new Date(trx.date).toLocaleDateString()}
                </div>
              </td>
              <td class="px-6 py-7">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover/row:scale-110 transition-transform duration-500 group-hover/row:bg-white/10 shadow-sm">
                    {trx.type === 'credit' ? '💰' : '💸'}
                  </div>
                  <span class="text-sm font-bold text-white tracking-tight leading-none group-hover/row:text-emerald transition-colors">{trx.description}</span>
                </div>
              </td>
              <td class="px-6 py-7">
                <span class={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                  trx.type === 'credit' ? "bg-emerald/5 text-emerald border-emerald/10" : "bg-white/5 text-slate-dim border-white/10"
                )}>
                  {trx.category}
                </span>
              </td>
              <td class="px-6 py-7 text-right">
                <span class={cn(
                  "font-heading font-black text-lg tracking-tight transition-colors",
                  trx.type === 'credit' ? "text-emerald" : "text-white"
                )}>{trx.type === 'credit' ? '+' : '-'}₦{trx.amount.toLocaleString()}</span>
              </td>
              <td class="px-6 py-7">
                <div class="flex items-center justify-center">
                  <div class={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest",
                    trx.status === 'completed' ? "bg-emerald/10 text-emerald border-emerald/20" : 
                    trx.status === 'pending' ? "bg-gold/10 text-gold border-gold/20" : "bg-danger/10 text-danger border-danger/20"
                  )}>
                    <div class={cn("w-1.5 h-1.5 rounded-full", trx.status === 'completed' ? "bg-emerald" : trx.status === 'pending' ? "bg-gold animate-pulse" : "bg-danger")}></div>
                    {trx.status}
                  </div>
                </div>
              </td>
              <td class="px-8 py-7 text-right">
                <button class="p-2.5 rounded-xl hover:bg-white/10 text-slate-dim hover:text-white transition-all duration-300 active:scale-90">
                  <Download size={20} />
                </button>
              </td>
            </tr>
          {/each}
          {#if transactions.length === 0}
            <tr>
              <td colspan="7" class="px-8 py-20 text-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl">📭</div>
                  <div class="space-y-1">
                    <p class="text-white font-bold">No transactions found</p>
                    <p class="text-xs text-slate-dim">Your financial activities will appear here.</p>
                  </div>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
    
    <!-- Table Footer / Pagination -->
    <div class="px-8 py-6 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="text-[10px] font-black text-slate-dim uppercase tracking-[0.2em]">
        Showing <span class="text-white">6</span> of <span class="text-white">1,284</span> Transactions
      </div>
      <div class="flex items-center gap-3">
        <button class="btn-secondary py-2.5 px-5 text-[10px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed">Previous</button>
        <div class="flex items-center gap-1">
          <button class="w-10 h-10 rounded-xl bg-emerald text-white text-[10px] font-black shadow-glow">1</button>
          <button class="w-10 h-10 rounded-xl hover:bg-white/5 text-white text-[10px] font-black transition-all">2</button>
          <button class="w-10 h-10 rounded-xl hover:bg-white/5 text-white text-[10px] font-black transition-all">3</button>
        </div>
        <button class="btn-secondary py-2.5 px-5 text-[10px] font-black uppercase tracking-widest hover:border-emerald/30 transition-all">Next</button>
      </div>
    </div>
  </div>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
</style>
