<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { Search, Filter, ShoppingBag, ShieldCheck, Star, ArrowRight } from 'lucide-svelte';

  const auditors = [
    { name: 'Chidi Okafor', role: 'Senior Tax Auditor', rating: 4.9, reviews: 128, price: '₦15,000/hr', emoji: '👨‍💼', tags: ['FIRS Expert', 'SME Audit'] },
    { name: 'Oluwaseun Bakare', role: 'Corporate Auditor', rating: 5.0, reviews: 245, price: '₦25,000/hr', emoji: '👩‍💼', tags: ['CAC Expert', 'Enterprise'] },
    { name: 'Fatima Ibrahim', role: 'NGO Specialist', rating: 4.8, reviews: 89, price: '₦12,500/hr', emoji: '🧕', tags: ['Grant Audit', 'Compliance'] },
    { name: 'Ifeanyi Uzor', role: 'Forensic Auditor', rating: 4.9, reviews: 156, price: '₦35,000/hr', emoji: '👨‍🔬', tags: ['Fraud Detection', 'Legal'] },
  ];
</script>

<div class="space-y-8" in:fade>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-heading font-black text-white">Auditor Marketplace 🛒</h1>
      <p class="text-slate-dim">Connect with ICAN-certified professional auditors for your business.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-primary py-2 px-4 text-sm flex items-center gap-2">
        <span>👨‍💼 Join as Auditor</span>
      </button>
    </div>
  </div>

  <!-- Search & Filters -->
  <div class="card-premium p-4 flex flex-col md:flex-row gap-4 items-center">
    <div class="relative flex-1 w-full">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dim" size={18} />
      <input 
        type="text" 
        placeholder="Search by name, expertise, or location..." 
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

  <!-- Auditor Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {#each auditors as auditor}
      <div class="card-premium p-6 group">
        <div class="flex justify-between items-start mb-4">
          <div class="text-5xl group-hover:scale-110 transition-transform duration-500">{auditor.emoji}</div>
          <div class="flex items-center gap-1 bg-gold/10 text-gold px-2 py-1 rounded-lg text-xs font-bold">
            <Star size={12} fill="currentColor" /> {auditor.rating}
          </div>
        </div>
        
        <h3 class="text-xl font-heading font-bold text-white mb-1">{auditor.name}</h3>
        <p class="text-sm text-slate-dim mb-4">{auditor.role}</p>

        <div class="flex flex-wrap gap-2 mb-6">
          {#each auditor.tags as tag}
            <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20">{tag}</span>
          {/each}
        </div>

        <div class="flex items-center justify-between pt-6 border-t border-white/5">
          <div class="text-lg font-bold text-white">{auditor.price}</div>
          <button class="text-emerald hover:text-white transition-colors flex items-center gap-1 font-bold text-sm">
            Hire <ArrowRight size={16} />
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
