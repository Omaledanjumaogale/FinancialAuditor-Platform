<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Search, Filter, ShoppingBag, ShieldCheck, Star, 
    ArrowRight, MapPin, Briefcase, BadgeCheck,
    MessageSquare, Zap, Globe
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  const auditors = [
    { name: 'Chidi Okafor', role: 'Senior Tax Auditor', rating: 4.9, reviews: 128, price: '₦15,000/hr', emoji: '👨‍💼', tags: ['FIRS Expert', 'SME Audit'], location: 'Lagos, NG' },
    { name: 'Oluwaseun Bakare', role: 'Corporate Compliance', rating: 5.0, reviews: 245, price: '₦25,000/hr', emoji: '👩‍💼', tags: ['CAC Expert', 'Enterprise'], location: 'Abuja, NG' },
    { name: 'Fatima Ibrahim', role: 'NGO Specialist', rating: 4.8, reviews: 89, price: '₦12,500/hr', emoji: '🧕', tags: ['Grant Audit', 'Compliance'], location: 'Kano, NG' },
    { name: 'Ifeanyi Uzor', role: 'Forensic Auditor', rating: 4.9, reviews: 156, price: '₦35,000/hr', emoji: '👨‍🔬', tags: ['Fraud Detection', 'Legal'], location: 'Port Harcourt, NG' },
    { name: 'Sarah Alabi', role: 'Financial Strategist', rating: 4.7, reviews: 112, price: '₦20,000/hr', emoji: '👩‍🔬', tags: ['EBITDA Pro', 'Growth'], location: 'Lagos, NG' },
    { name: 'Musa Bello', role: 'Systems Auditor', rating: 4.9, reviews: 203, price: '₦18,000/hr', emoji: '👨‍💻', tags: ['IT Audit', 'ISO 27001'], location: 'Ibadan, NG' },
  ];
</script>

<div class="min-h-screen bg-background flex flex-col">
  <Header />

  <main class="flex-1 container-custom py-12 md:py-20 space-y-12">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
          <ShoppingBag size={12} />
          Certified Auditor Network
        </div>
        <h1 class="text-4xl md:text-5xl font-heading font-black text-foreground tracking-tight">Expert Marketplace</h1>
        <p class="text-muted-foreground font-medium max-w-xl">Deploy ICAN-certified professionals to verify your enterprise records and sign off on intelligence findings.</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="btn-secondary py-3 px-6 text-sm flex items-center gap-2">
          <Globe size={18} />
          All Regions
        </button>
        <button class="btn-primary py-3 px-6 text-sm flex items-center gap-2 shadow-xl shadow-primary/20">
          <Zap size={18} />
          <span>Apply as Auditor</span>
        </button>
      </div>
    </div>

    <!-- Search & Sophisticated Filters -->
    <div class="grid lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3 card-premium p-3 flex flex-col md:flex-row items-center gap-3 bg-muted/30">
        <div class="relative flex-1 w-full group">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, expertise, or specific FIRS/CAC requirement..." 
            class="w-full bg-transparent border-none py-4 pl-12 pr-4 text-base text-foreground focus:outline-none font-medium"
          />
        </div>
        <div class="h-10 w-px bg-border hidden md:block"></div>
        <button class="btn-primary py-4 px-10 text-sm font-black uppercase tracking-widest w-full md:w-auto">Search Experts</button>
      </div>
      <div class="card-premium p-3 bg-muted/30 flex items-center justify-center">
        <button class="w-full h-full flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
          <Filter size={18} /> Advanced Filters
        </button>
      </div>
    </div>

    <!-- Auditor Premium Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {#each auditors as auditor}
        <div class="card-premium p-8 group relative overflow-hidden flex flex-col h-full hover:border-primary/40">
          <div class="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
            <BadgeCheck size={140} />
          </div>
          
          <!-- Card Header -->
          <div class="flex justify-between items-start mb-8 relative z-10">
            <div class="relative">
              <div class="w-20 h-20 rounded-[28px] bg-muted flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5">
                {auditor.emoji}
              </div>
              <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full border-4 border-background flex items-center justify-center text-white shadow-lg">
                <BadgeCheck size={14} />
              </div>
            </div>
            <div class="flex flex-col items-end gap-2">
              <div class="flex items-center gap-1.5 bg-brand-500/10 text-brand-600 px-2.5 py-1 rounded-full text-[10px] font-black border border-brand-500/10">
                <Star size={12} class="fill-current" /> {auditor.rating}
              </div>
              <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{auditor.reviews} Reviews</span>
            </div>
          </div>
          
          <!-- Info -->
          <div class="space-y-2 mb-8 relative z-10 flex-1">
            <h3 class="text-2xl font-heading font-black text-foreground group-hover:text-primary transition-colors tracking-tight">{auditor.name}</h3>
            <p class="text-muted-foreground font-semibold flex items-center gap-2">
              <Briefcase size={14} class="text-primary" />
              {auditor.role}
            </p>
            <div class="flex items-center gap-2 text-xs font-bold text-muted-foreground pt-2">
              <MapPin size={12} /> {auditor.location}
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-10 relative z-10">
            {#each auditor.tags as tag}
              <span class="text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border group-hover:border-primary/20 group-hover:text-primary transition-all">{tag}</span>
            {/each}
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-between pt-8 border-t border-border mt-auto relative z-10">
            <div class="flex flex-col">
              <span class="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rate Card</span>
              <span class="text-xl font-heading font-black text-foreground">{auditor.price}</span>
            </div>
            <div class="flex gap-2">
              <button class="p-3 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl transition-all border border-transparent hover:border-primary/20 shadow-sm" title="Message Auditor">
                <MessageSquare size={20} />
              </button>
              <button class="btn-primary py-3 px-6 text-xs font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                Deploy <ArrowRight size={14} class="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Marketplace Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border/50">
      <div class="flex items-center gap-6">
        <div class="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
          <BadgeCheck size={28} />
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Expert Verification</div>
          <div class="text-xl font-black text-foreground">100% ICAN Certified</div>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <div class="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
          <ShieldCheck size={28} />
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Escrow Protection</div>
          <div class="text-xl font-black text-foreground">Secure Enterprise Pay</div>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <div class="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
          <Zap size={28} />
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Audit Velocity</div>
          <div class="text-xl font-black text-foreground">24h Sign-off Average</div>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</div>
