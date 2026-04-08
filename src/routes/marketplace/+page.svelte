<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Search, Filter, ShoppingBag, ShieldCheck, Star, 
    ArrowRight, MapPin, Briefcase, BadgeCheck,
    MessageSquare, Zap, Globe, Sparkles, Loader2
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery, useConvexClient } from "convex-svelte";
  import { api } from "$convex/_generated/api";

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const auditorsQuery = useQuery(api.auditors.getAll);
  const auditors = $derived(auditorsQuery.data || []);

  const client = useConvexClient();
  let loading = $state(false);

  async function handleHire(auditor: any) {
    if (!currentUser) {
      // Redirect to auth if not logged in
      return;
    }
    
    loading = true;
    try {
      await client.mutation(api.serviceRequests.create, {
        clientId: currentUser._id,
        type: auditor.specialization || auditor.role,
        priority: 'medium',
        budget: (parseInt(auditor.price?.replace(/[^0-9]/g, '') || "0")) * 10, // Mock 10 hours
        description: `Audit request for ${auditor.specialization || auditor.role}`
      });
      // Show success toast or redirect
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-navy flex flex-col relative overflow-hidden">
  <!-- Background Decorations -->
  <div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,200,150,0.08)_0%,transparent_70%)]"></div>
    <div class="absolute inset-0 grid-pattern opacity-10"></div>
  </div>

  <Header />

  <main class="flex-1 container-custom py-12 md:py-24 space-y-16 relative z-10">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-10">
      <div class="space-y-3">
        <div class="flex items-center gap-3 text-[10px] font-black text-emerald uppercase tracking-[0.4em] mb-2">
          <span class="w-10 h-px bg-emerald/30"></span>
          Certified Auditor Network
        </div>
        <h1 class="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-tight">Expert <span class="text-emerald">Marketplace</span></h1>
        <p class="text-slate text-lg font-medium max-w-2xl leading-relaxed">Deploy ICAN-certified professionals to verify your enterprise records and sign off on intelligence findings with 100% legal compliance.</p>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <button class="btn-secondary py-4 px-8 text-sm flex items-center gap-3 group">
          <span class="text-xl group-hover:rotate-12 transition-transform duration-300">🌍</span>
          All Regions
        </button>
        <button class="btn-primary py-4 px-8 text-sm flex items-center gap-3 shadow-glow group">
          <span class="text-xl group-hover:scale-125 transition-transform duration-300">⚡</span>
          <span>Apply as Auditor</span>
        </button>
      </div>
    </div>

    <!-- Search & Sophisticated Filters -->
    <div class="grid lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3 card-premium p-3 flex flex-col md:flex-row items-center gap-4 bg-white/5 border-white/10 group focus-within:border-emerald/40 transition-all duration-500">
        <div class="relative flex-1 w-full group/input">
          <Search class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within/input:text-emerald transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="Search by name, expertise, or specific FIRS/CAC requirement..." 
            class="w-full bg-transparent border-none py-5 pl-14 pr-6 text-lg text-white placeholder:text-slate-dim focus:outline-none font-medium tracking-tight"
          />
        </div>
        <div class="h-10 w-px bg-white/10 hidden md:block"></div>
        <button class="btn-primary py-4 px-12 text-xs font-black uppercase tracking-[0.2em] w-full md:w-auto shadow-glow">Search Experts</button>
      </div>
      <div class="card-premium p-3 bg-white/5 border-white/10 flex items-center justify-center hover:border-emerald/30 transition-all duration-300 cursor-pointer group">
        <button class="w-full h-full flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-dim group-hover:text-emerald transition-colors">
          <Filter size={18} /> Advanced Filters
        </button>
      </div>
    </div>

    <!-- Auditor Premium Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {#each auditors as auditor, i}
        <div 
          class="card-premium p-8 group relative overflow-hidden flex flex-col h-full hover:border-emerald/40 transition-all duration-500 bg-surface/40 backdrop-blur-sm"
          in:fly={{ y: 30, delay: 100 * i, duration: 600 }}
        >
          <div class="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
            <BadgeCheck size={160} class="text-emerald" />
          </div>
          
          <!-- Card Header -->
          <div class="flex justify-between items-start mb-10 relative z-10">
            <div class="relative">
              <div class="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:bg-emerald/10 group-hover:border-emerald/20 group-hover:shadow-glow-sm">
                {auditor.emoji}
              </div>
              <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald rounded-full border-4 border-navy flex items-center justify-center text-white shadow-lg">
                <BadgeCheck size={16} />
              </div>
            </div>
            <div class="flex flex-col items-end gap-2.5">
              <div class="flex items-center gap-2 bg-gold/10 text-gold px-3.5 py-1.5 rounded-full text-[10px] font-black border border-gold/20 tracking-widest uppercase">
                <Star size={12} class="fill-current" /> {auditor.rating}
              </div>
              <span class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em]">{auditor.reviews} REVIEWS</span>
            </div>
          </div>
          
          <!-- Info -->
          <div class="space-y-3 mb-10 relative z-10 flex-1">
            <h3 class="text-2xl font-heading font-black text-white group-hover:text-emerald transition-colors tracking-tight leading-tight">{auditor.name}</h3>
            <div class="flex flex-col gap-2">
              <p class="text-slate font-semibold flex items-center gap-3">
                <Briefcase size={16} class="text-emerald" />
                {auditor.role}
              </p>
              <p class="text-slate-dim text-sm flex items-center gap-3">
                <MapPin size={16} class="text-emerald/60" />
                {auditor.location}
              </p>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2.5 mb-10 relative z-10">
            {#each auditor.tags as tag}
              <span class="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-dim uppercase tracking-widest group-hover:border-emerald/30 group-hover:text-emerald transition-all duration-300">
                {tag}
              </span>
            {/each}
          </div>
          
          <!-- Card Footer -->
          <div class="flex items-center justify-between pt-8 border-t border-white/5 relative z-10 mt-auto">
            <div class="flex flex-col">
              <span class="text-[10px] font-black text-slate-dim uppercase tracking-[0.2em] mb-1">Standard Rate</span>
              <span class="text-2xl font-heading font-black text-white group-hover:text-emerald transition-colors">{auditor.price}</span>
            </div>
            <button 
              onclick={() => handleHire(auditor)}
              disabled={loading}
              class="btn-primary py-3 px-8 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-glow group/btn disabled:opacity-50"
            >
              {#if loading}
                <Loader2 size={14} class="animate-spin" />
              {:else}
                Hire Now
                <ArrowRight size={14} class="group-hover/btn:translate-x-2 transition-transform" />
              {/if}
            </button>
          </div>

          <!-- Decorative Gradient -->
          <div class="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-emerald/[0.03] to-transparent rounded-tl-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      {/each}
    </div>

    <!-- Bottom CTA -->
    <div class="card-premium p-12 md:p-16 bg-gradient-to-br from-emerald/10 to-navy-light/40 border-emerald/20 text-center space-y-8 relative overflow-hidden group">
      <div class="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
        <span class="text-[180px] select-none">💎</span>
      </div>
      <div class="relative z-10 max-w-2xl mx-auto space-y-6">
        <h2 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">Can't find the <span class="text-emerald">right expert?</span></h2>
        <p class="text-slate text-lg">Our matching engine can connect you with the perfect professional based on your specific audit requirements.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button class="btn-primary py-4 px-10 text-sm font-black uppercase tracking-widest w-full sm:w-auto shadow-glow">Start AI Matchmaking</button>
          <button class="btn-secondary py-4 px-10 text-sm font-black uppercase tracking-widest w-full sm:w-auto">Contact Concierge</button>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
</style>
