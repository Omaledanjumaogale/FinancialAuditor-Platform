<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    ShieldCheck, Sparkles, ArrowRight, CheckCircle2, 
    BarChart3, Zap, Globe, Lock, PlayCircle,
    TrendingUp, Users, FileText, BadgeCheck
  } from 'lucide-svelte';

  const stats = [
    { label: 'Active Enterprises', value: '50k+', emoji: '🏢' },
    { label: 'Value Audited', value: '₦2.1B+', emoji: '💰' },
    { label: 'Certified Auditors', value: '500+', emoji: '👨‍💼' },
    { label: 'System Accuracy', value: '99.9%', emoji: '✅' }
  ];
</script>

<SEO />

<div class="min-h-screen">
  <Header />

  <main>
    <!-- HERO SECTION -->
    <section class="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden" id="home">
      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <div in:fly={{ y: 20, duration: 800 }} class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/30 text-emerald text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            Nigeria's Premier AI Financial Intelligence
          </div>
          
          <h1 in:fly={{ y: 20, duration: 800, delay: 100 }} class="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.95] tracking-tighter text-white">
            Audit with <span class="grad-text">Confidence.</span><br/>
            Scale with <span class="text-emerald">Intelligence.</span>
          </h1>

          <p in:fly={{ y: 20, duration: 800, delay: 200 }} class="text-lg md:text-xl text-slate max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform for Nigerian enterprises. Automated auditing, real-time compliance, and predictive financial advisory powered by world-class AI.
          </p>

          <div in:fly={{ y: 20, duration: 800, delay: 300 }} class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="/auth" class="btn-primary py-4 px-10 text-lg shadow-xl shadow-emerald/20 group">
              Get Started Free
              <ArrowRight size={20} class="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <button class="btn-secondary py-4 px-10 text-lg group text-emerald">
              <PlayCircle size={20} class="mr-2" />
              Watch Demo
            </button>
          </div>

          <!-- Trust Badges -->
          <div in:fade={{ delay: 600 }} class="flex flex-wrap items-center justify-center gap-8 pt-12 text-slate-dim opacity-70 hover:opacity-100 transition-all duration-500">
            <div class="flex items-center gap-2 font-bold text-sm">
              <ShieldCheck size={18} /> FIRS COMPLIANT
            </div>
            <div class="flex items-center gap-2 font-bold text-sm">
              <Lock size={18} /> BANK-GRADE SECURITY
            </div>
            <div class="flex items-center gap-2 font-bold text-sm">
              <BadgeCheck size={18} /> ICAN CERTIFIED
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section class="py-20 bg-navy-mid/50 border-y border-white/5">
      <div class="container-custom">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {#each stats as stat}
            <div class="flex flex-col items-center text-center space-y-3 group anim-fade-up">
              <div class="text-4xl mb-2 group-hover:scale-110 transition-transform duration-500">{stat.emoji}</div>
              <div class="text-4xl md:text-5xl font-heading font-black text-white">{stat.value}</div>
              <div class="text-xs font-bold text-slate-dim uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="py-32 relative" id="features">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center mb-20 space-y-5">
          <h2 class="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white">
            Enterprise Intelligence, <span class="grad-text italic">Simplified.</span>
          </h2>
          <p class="text-lg text-slate">
            Everything your finance team needs to manage complex auditing, compliance, and growth in a single, unified interface.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="card-premium p-10 flex flex-col items-start text-left group">
            <div class="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center text-emerald mb-8 group-hover:bg-emerald group-hover:text-white transition-all duration-500 border border-emerald/20">
              <ShieldCheck size={28} />
            </div>
            <h3 class="text-2xl font-heading font-black mb-4 text-white">AI Multi-Modal Audit</h3>
            <p class="text-slate leading-relaxed mb-8 flex-1">
              Advanced OCR and NLP extraction for 100+ document types. Detect anomalies and fraud with enterprise precision.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/30 group-hover:text-emerald transition-colors">OCR Intelligence</span>
              <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/30 group-hover:text-emerald transition-colors">Fraud Detection</span>
            </div>
          </div>

          <div class="card-premium p-10 flex flex-col items-start text-left group">
            <div class="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center text-emerald mb-8 group-hover:bg-emerald group-hover:text-white transition-all duration-500 border border-emerald/20">
              <TrendingUp size={28} />
            </div>
            <h3 class="text-2xl font-heading font-black mb-4 text-white">Predictive Performance</h3>
            <p class="text-slate leading-relaxed mb-8 flex-1">
              Real-time revenue forecasting and EBITDA projections based on historical data patterns and market benchmarks.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/30 group-hover:text-emerald transition-colors">Forecasting</span>
              <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/30 group-hover:text-emerald transition-colors">KPI Benchmarks</span>
            </div>
          </div>

          <div class="card-premium p-10 flex flex-col items-start text-left group">
            <div class="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center text-emerald mb-8 group-hover:bg-emerald group-hover:text-white transition-all duration-500 border border-emerald/20">
              <BadgeCheck size={28} />
            </div>
            <h3 class="text-2xl font-heading font-black mb-4 text-white">Unified Compliance</h3>
            <p class="text-slate leading-relaxed mb-8 flex-1">
              Automated FIRS-ready tax filings and CAC-compliant statements. Stay ahead of regulatory changes effortlessly.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/30 group-hover:text-emerald transition-colors">FIRS Ready</span>
              <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/30 group-hover:text-emerald transition-colors">CAC Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA SECTION -->
    <section class="py-32 relative">
      <div class="container-custom">
        <div class="max-w-5xl mx-auto bg-gradient-to-br from-emerald to-emerald-deep rounded-[48px] p-12 md:p-24 text-center space-y-10 relative overflow-hidden group shadow-2xl shadow-emerald/20">
          <div class="absolute inset-0 grid-pattern opacity-10 invert pointer-events-none"></div>
          
          <div class="relative z-10 space-y-8">
            <h2 class="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none">
              Ready to Modernize Your <br/> <span class="text-white/70 italic">Financial Operations?</span>
            </h2>
            <p class="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              Join 50,000+ Nigerian enterprises building the future of financial intelligence on FinancialAuditor.
            </p>
            <div class="flex flex-wrap justify-center gap-6 pt-6">
              <a href="/auth" class="btn-primary py-5 px-12 text-xl bg-white text-emerald hover:bg-white/90 shadow-2xl group">
                Start Free 30-Day Trial
                <ArrowRight size={24} class="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <p class="text-sm text-white/60 font-bold uppercase tracking-widest">NO CREDIT CARD REQUIRED · FIRS COMPLIANT · ICAN CERTIFIED</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>

<style>
  :global(.grid-pattern) {
    background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0);
    background-size: 32px 32px;
  }
</style>
