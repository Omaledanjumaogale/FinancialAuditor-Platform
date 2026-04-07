<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    BookOpen, Search, Filter, Download, Plus, 
    MoreHorizontal, ArrowUpRight, ArrowDownRight, 
    FileText, CheckCircle2, Clock, ShieldCheck,
    Calendar, LayoutGrid, List
  } from 'lucide-svelte';
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

<div class="space-y-10 pb-20" in:fade>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
        <ShieldCheck size={12} />
        Blockchain Secured Ledger
      </div>
      <h1 class="text-3xl md:text-4xl font-heading font-black text-foreground tracking-tight">Enterprise Ledger</h1>
      <p class="text-muted-foreground font-medium">Immutable audit trail of all financial interactions and document processing.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2.5 px-5 text-sm flex items-center gap-2">
        <Download size={18} />
        Export Audit Log
      </button>
      <button class="btn-primary py-2.5 px-5 text-sm flex items-center gap-2 shadow-lg shadow-primary/10">
        <Plus size={18} />
        Manual Entry
      </button>
    </div>
  </div>

  <!-- Search & View Controls -->
  <div class="flex flex-col lg:flex-row gap-4 items-center">
    <div class="card-premium p-2 flex items-center gap-2 flex-1 w-full bg-muted/30">
      <div class="relative flex-1">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input 
          type="text" 
          placeholder="Search by ID, description, or amount..." 
          class="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm text-foreground focus:outline-none font-medium"
        />
      </div>
      <div class="h-8 w-px bg-border hidden sm:block"></div>
      <button class="btn-ghost py-2.5 px-4 text-xs font-black uppercase tracking-widest flex items-center gap-2">
        <Filter size={14} /> Filters
      </button>
    </div>
    <div class="flex gap-2 w-full lg:w-auto">
      <div class="card-premium p-1.5 flex gap-1 bg-muted/30">
        <button class="p-2 bg-background shadow-sm rounded-lg text-primary border border-border/50 transition-all"><List size={18} /></button>
        <button class="p-2 text-muted-foreground hover:text-foreground transition-all"><LayoutGrid size={18} /></button>
      </div>
      <button class="card-premium px-5 py-3 bg-muted/30 text-xs font-black uppercase tracking-widest flex items-center gap-2 flex-1 lg:flex-none justify-center">
        <Calendar size={16} /> Last 30 Days
      </button>
    </div>
  </div>

  <!-- Enterprise Data Table -->
  <div class="card-premium overflow-hidden bg-background">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-muted/50 border-b border-border">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Hash / ID</th>
            <th class="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Timestamp</th>
            <th class="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Transaction / Event</th>
            <th class="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Category</th>
            <th class="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Value (NGN)</th>
            <th class="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">Status</th>
            <th class="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          {#each transactions as trx}
            <tr class="hover:bg-muted/20 transition-all duration-200 group">
              <td class="px-8 py-6">
                <div class="flex flex-col gap-1">
                  <span class="font-mono text-xs text-primary font-bold tracking-tight">{trx.id}</span>
                  <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Node: NG-AUTH-01</span>
                </div>
              </td>
              <td class="px-6 py-6">
                <div class="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <Clock size={14} class="opacity-50" />
                  {trx.date}
                </div>
              </td>
              <td class="px-6 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                    {trx.emoji}
                  </div>
                  <span class="text-sm font-black text-foreground group-hover:text-primary transition-colors">{trx.description}</span>
                </div>
              </td>
              <td class="px-6 py-6">
                <span class={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border",
                  trx.category === 'Income' ? "bg-primary/5 text-primary border-primary/10" : 
                  trx.category === 'Expense' ? "bg-destructive/5 text-destructive border-destructive/10" : "bg-brand-500/5 text-brand-600 border-brand-500/10"
                )}>
                  {trx.category}
                </span>
              </td>
              <td class={cn(
                "px-6 py-6 text-sm font-black text-right tracking-tight",
                trx.category === 'Income' ? "text-primary" : "text-destructive"
              )}>
                {trx.category === 'Income' ? '+' : '-'}{trx.amount}
              </td>
              <td class="px-6 py-6">
                <div class="flex justify-center">
                  {#if trx.status === 'verified'}
                    <span class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                      <CheckCircle2 size={12} />
                      Immutable
                    </span>
                  {:else}
                    <span class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-brand-600 bg-brand-500/5 px-3 py-1.5 rounded-full border border-brand-500/10 animate-pulse">
                      <Clock size={12} />
                      Syncing
                    </span>
                  {/if}
                </div>
              </td>
              <td class="px-8 py-6 text-right">
                <button class="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-lg">
                  <MoreHorizontal size={20} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Sophisticated Pagination -->
    <div class="px-8 py-6 bg-muted/30 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Showing <span class="text-foreground font-black">1-10</span> of <span class="text-foreground font-black">1,284</span> entries
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-ghost py-2 px-4 text-[10px] font-black uppercase tracking-widest disabled:opacity-30" disabled>Previous</button>
        <div class="flex gap-1">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-[10px] font-black shadow-lg shadow-primary/20">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-[10px] font-black transition-all">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-[10px] font-black transition-all">3</button>
          <span class="w-8 h-8 flex items-center justify-center text-muted-foreground">...</span>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-[10px] font-black transition-all">128</button>
        </div>
        <button class="btn-ghost py-2 px-4 text-[10px] font-black uppercase tracking-widest">Next</button>
      </div>
    </div>
  </div>

  <!-- Ledger Security Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card-premium p-6 flex items-center gap-5">
      <div class="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
        <ShieldCheck size={24} />
      </div>
      <div>
        <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Verification Integrity</div>
        <div class="text-lg font-black text-foreground">99.99% SHA-256</div>
      </div>
    </div>
    <div class="card-premium p-6 flex items-center gap-5">
      <div class="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
        <LayoutGrid size={24} />
      </div>
      <div>
        <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Blockchain Nodes</div>
        <div class="text-lg font-black text-foreground">12 Distributed</div>
      </div>
    </div>
    <div class="card-premium p-6 flex items-center gap-5">
      <div class="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
        <FileText size={24} />
      </div>
      <div>
        <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Audit Trail Depth</div>
        <div class="text-lg font-black text-foreground">730 Days Active</div>
      </div>
    </div>
  </div>
</div>
