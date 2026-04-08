<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    CreditCard, Download, Search, Filter, 
    ArrowUpRight, ArrowDownRight, Clock,
    ShieldCheck, Zap, Wallet, Calendar
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery } from "convex-svelte";
  import { api } from "$convex/_generated/api";

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const paymentsQuery = $derived(
    currentUser ? useQuery(api.payments.getByUser, { userId: currentUser._id }) : null
  );
  const payments = $derived(paymentsQuery?.data || []);

  const totalSpent = $derived(
    payments
      .filter(p => p.status === 'completed')
      .reduce((acc, p) => acc + p.amount, 0)
  );
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
        Enterprise Billing Console
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">Payment <span class="text-emerald">History</span></h1>
      <p class="text-slate text-lg font-medium max-w-2xl">Secure transaction ledger for all platform subscriptions and professional service fees.</p>
    </div>
    <div class="flex items-center gap-4">
      <button class="btn-secondary py-3 px-6 text-xs flex items-center gap-3 group">
        <span class="text-lg group-hover:rotate-12 transition-transform duration-300">📊</span>
        Tax Invoice
      </button>
      <button class="btn-primary py-3 px-8 text-xs flex items-center gap-3 shadow-glow group">
        <span class="text-lg group-hover:scale-125 transition-transform duration-300">💳</span>
        Add Payment Method
      </button>
    </div>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card-premium p-8 bg-surface/50 border-white/5 space-y-4 group">
      <div class="flex items-center justify-between">
        <div class="w-12 h-12 rounded-2xl bg-emerald/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          💰
        </div>
        <span class="text-[10px] font-black text-emerald uppercase tracking-widest">Total Investment</span>
      </div>
      <div>
        <div class="text-3xl font-heading font-black text-white tracking-tight">₦{totalSpent.toLocaleString()}</div>
        <p class="text-xs text-slate-dim font-medium mt-1">Life-time platform spend</p>
      </div>
    </div>

    <div class="card-premium p-8 bg-surface/50 border-white/5 space-y-4 group">
      <div class="flex items-center justify-between">
        <div class="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          📅
        </div>
        <span class="text-[10px] font-black text-gold uppercase tracking-widest">Next Billing</span>
      </div>
      <div>
        <div class="text-3xl font-heading font-black text-white tracking-tight">Apr 24, 2026</div>
        <p class="text-xs text-slate-dim font-medium mt-1">Pro Enterprise Renewal</p>
      </div>
    </div>

    <div class="card-premium p-8 bg-surface/50 border-white/5 space-y-4 group">
      <div class="flex items-center justify-between">
        <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          🛡️
        </div>
        <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Payment Security</span>
      </div>
      <div>
        <div class="text-3xl font-heading font-black text-white tracking-tight">PCI-DSS L1</div>
        <p class="text-xs text-slate-dim font-medium mt-1">Bank-grade encryption active</p>
      </div>
    </div>
  </div>

  <!-- Transactions Table -->
  <div class="card-premium overflow-hidden bg-surface/40 backdrop-blur-sm border-white/10">
    <div class="px-8 py-6 border-b border-white/5 flex items-center justify-between">
      <h3 class="text-lg font-heading font-black text-white tracking-tight">Recent Transactions</h3>
      <div class="flex items-center gap-4">
        <div class="relative group">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={14} />
          <input type="text" placeholder="Search ref..." class="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-xs text-white outline-none focus:border-emerald/30 transition-all" />
        </div>
        <button class="p-2 hover:bg-white/5 rounded-lg text-slate-dim hover:text-white transition-all">
          <Filter size={16} />
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-white/[0.02]">
          <tr>
            <th class="px-8 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Reference</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Date</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Description</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Amount</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Provider</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Status</th>
            <th class="px-8 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest text-right">Invoice</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          {#each payments as payment}
            <tr class="hover:bg-white/[0.01] transition-colors group/row">
              <td class="px-8 py-5">
                <span class="font-mono text-xs text-emerald font-bold">{payment.reference}</span>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2 text-xs font-bold text-slate">
                  <Clock size={12} class="text-slate-dim" />
                  {new Date(payment.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="text-xs font-bold text-white capitalize">{payment.type.replace('_', ' ')}</div>
              </td>
              <td class="px-6 py-5">
                <div class="text-sm font-heading font-black text-white">₦{payment.amount.toLocaleString()}</div>
              </td>
              <td class="px-6 py-5">
                <span class="text-[10px] font-black text-slate-dim uppercase tracking-widest">{payment.provider}</span>
              </td>
              <td class="px-6 py-5">
                <div class={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest",
                  payment.status === 'completed' ? "bg-emerald/10 text-emerald border-emerald/20" : 
                  payment.status === 'pending' ? "bg-gold/10 text-gold border-gold/20" : "bg-danger/10 text-danger border-danger/20"
                )}>
                  <div class={cn("w-1 h-1 rounded-full", payment.status === 'completed' ? "bg-emerald" : payment.status === 'pending' ? "bg-gold animate-pulse" : "bg-danger")}></div>
                  {payment.status}
                </div>
              </td>
              <td class="px-8 py-5 text-right">
                <button class="p-2 rounded-lg hover:bg-emerald/10 text-slate-dim hover:text-emerald transition-all group/btn">
                  <Download size={16} class="group-hover/btn:scale-110 transition-transform" />
                </button>
              </td>
            </tr>
          {/each}
          {#if payments.length === 0}
            <tr>
              <td colspan="7" class="px-8 py-20 text-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl">📭</div>
                  <div class="space-y-1">
                    <p class="text-white font-bold">No transactions found</p>
                    <p class="text-xs text-slate-dim">Your platform payments will appear here.</p>
                  </div>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
