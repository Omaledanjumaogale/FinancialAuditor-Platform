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
    { label: 'Active Enterprises', value: '50k+', emoji: '🏢', color: 'primary' },
    { label: 'Value Audited', value: '₦2.1B+', emoji: '💰', color: 'brand' },
    { label: 'Certified Auditors', value: '500+', emoji: '👨‍💼', color: 'primary' },
    { label: 'System Accuracy', value: '99.9%', emoji: '✅', color: 'brand' }
  ];

  const features = [
    {
      title: 'AI Multi-Modal Audit',
      desc: 'Advanced OCR and NLP extraction for 100+ document types. Detect anomalies and fraud with enterprise precision.',
      emoji: '🤖',
      tags: ['OCR Intelligence', 'Fraud Detection'],
      icon: ShieldCheck
    },
    {
      title: 'Predictive Performance',
      desc: 'Real-time revenue forecasting and EBITDA projections based on historical data patterns and market benchmarks.',
      emoji: '📈',
      tags: ['Forecasting', 'KPI Benchmarks'],
      icon: TrendingUp
    },
    {
      title: 'Unified Compliance',
      desc: 'Automated FIRS-ready tax filings and CAC-compliant statements. Stay ahead of regulatory changes effortlessly.',
      emoji: '🛡️',
      tags: ['FIRS Ready', 'CAC Compliant'],
      icon: BadgeCheck
    }
  ];
</script>

<SEO />

<div class="min-h-screen bg-background selection:bg-primary/10">
  <Header />

  <main>
    <!-- Hero Section -->
    <section class="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute inset-0 grid-pattern opacity-40 pointer-events-none"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div class="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full animate-pulse-soft"></div>
        <div class="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-brand-200/10 blur-[100px] rounded-full"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <div in:fly={{ y: 20, duration: 800 }} class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            Nigeria's Premier AI Financial Intelligence
          </div>
          
          <h1 in:fly={{ y: 20, duration: 800, delay: 100 }} class="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.95] tracking-tighter text-foreground">
            Audit with <span class="grad-text italic">Confidence.</span><br/>
            Scale with <span class="text-primary">Intelligence.</span>
          </h1>

          <p in:fly={{ y: 20, duration: 800, delay: 200 }} class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform for Nigerian enterprises. Automated auditing, real-time compliance, and predictive financial advisory powered by world-class AI.
          </p>

          <div in:fly={{ y: 20, duration: 800, delay: 300 }} class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="/auth" class="btn-primary py-4 px-10 text-lg shadow-xl shadow-primary/20 group">
              Get Started Free
              <ArrowRight size={20} class="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <button class="btn-secondary py-4 px-10 text-lg group">
              <PlayCircle size={20} class="mr-2" />
              Watch Demo
            </button>
          </div>

          <!-- Trust Badges -->
          <div in:fade={{ delay: 600 }} class="flex flex-wrap items-center justify-center gap-8 pt-12 text-muted-foreground/60 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
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

    <!-- Stats Section -->
    <section class="py-24 bg-muted/30 border-y border-border/50 relative">
      <div class="container-custom">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {#each stats as stat}
            <div class="flex flex-col items-center text-center space-y-3 group">
              <div class="text-4xl mb-2 group-hover:scale-110 transition-transform duration-500">{stat.emoji}</div>
              <div class="text-4xl md:text-5xl font-heading font-black text-foreground">{stat.value}</div>
              <div class="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-32 relative">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center mb-20 space-y-5">
          <h2 class="text-4xl md:text-5xl font-heading font-black tracking-tighter">
            Enterprise Intelligence, <span class="text-primary italic">Simplified.</span>
          </h2>
          <p class="text-lg text-muted-foreground">
            Everything your finance team needs to manage complex auditing, compliance, and growth in a single, unified interface.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          {#each features as feature, i}
            <div class="card-premium p-10 group relative overflow-hidden flex flex-col items-start text-left">
              <div class="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <feature.icon size={120} />
              </div>
              <div class="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-primary/10">
                <feature.icon size={28} />
              </div>
              <h3 class="text-2xl font-heading font-black mb-4">{feature.title}</h3>
              <p class="text-muted-foreground leading-relaxed mb-8 flex-1">
                {feature.desc}
              </p>
              <div class="flex flex-wrap gap-2">
                {#each feature.tags as tag}
                  <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border group-hover:border-primary/20 group-hover:text-primary transition-colors">{tag}</span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Unified Dashboard Preview -->
    <section class="py-24 bg-foreground text-background relative overflow-hidden">
      <div class="absolute inset-0 grid-pattern opacity-5 invert"></div>
      <div class="container-custom relative z-10">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="space-y-8">
            <h2 class="text-4xl md:text-6xl font-heading font-black text-white leading-none tracking-tighter">
              A Unified <span class="text-primary italic">Command Center</span> for Your Finance.
            </h2>
            <div class="space-y-6">
              <div class="flex gap-5">
                <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 class="text-xl font-bold text-white mb-2">Instant OCR Extraction</h4>
                  <p class="text-muted-foreground/80 leading-relaxed">Turn paper mess into digital intelligence in seconds. Our AI handles complex Nigerian invoice formats with ease.</p>
                </div>
              </div>
              <div class="flex gap-5">
                <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 class="text-xl font-bold text-white mb-2">Compliance Everywhere</h4>
                  <p class="text-muted-foreground/80 leading-relaxed">Whether you are in Lagos, Abuja, or Port Harcourt, our system stays updated with the latest FIRS and CAC regulations.</p>
                </div>
              </div>
            </div>
            <button class="btn-primary py-4 px-10 text-lg bg-white text-foreground hover:bg-white/90">
              Explore the Console
            </button>
          </div>

          <!-- Mockup -->
          <div class="relative group">
            <div class="absolute -inset-4 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-all duration-700"></div>
            <div class="relative bg-card border border-border rounded-3xl p-6 shadow-2xl shadow-black/50 overflow-hidden transform group-hover:-rotate-1 transition-transform duration-700">
               <div class="flex items-center gap-2 mb-6 border-b border-border pb-4">
                 <div class="flex gap-1.5">
                   <div class="w-3 h-3 rounded-full bg-destructive/50"></div>
                   <div class="w-3 h-3 rounded-full bg-brand-300"></div>
                   <div class="w-3 h-3 rounded-full bg-primary/50"></div>
                 </div>
                 <div class="ml-4 bg-muted px-4 py-1.5 rounded-full text-[10px] font-mono text-muted-foreground">app.financialauditor.ng/analytics</div>
               </div>
               
               <div class="space-y-6">
                 <div class="grid grid-cols-2 gap-4">
                    <div class="p-5 bg-muted rounded-2xl border border-border">
                      <div class="text-[10px] font-bold text-muted-foreground uppercase mb-1">Revenue Q1</div>
                      <div class="text-3xl font-heading font-black text-foreground">₦4.2M</div>
                    </div>
                    <div class="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                      <div class="text-[10px] font-bold text-primary uppercase mb-1">AI Audit Score</div>
                      <div class="text-3xl font-heading font-black text-primary">98.4%</div>
                    </div>
                 </div>
                 <div class="h-40 w-full bg-muted rounded-2xl border border-border p-4 relative flex items-end gap-2">
                   {#each Array(8) as _, i}
                     <div class="flex-1 bg-primary/20 rounded-t-lg" style={`height: ${Math.random() * 70 + 30}%`}></div>
                   {/each}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 relative">
      <div class="container-custom">
        <div class="max-w-5xl mx-auto bg-primary rounded-[48px] p-12 md:p-24 text-center space-y-10 relative overflow-hidden group">
          <div class="absolute inset-0 grid-pattern opacity-10 invert pointer-events-none"></div>
          <div class="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full"></div>
          
          <div class="relative z-10 space-y-8">
            <h2 class="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none">
              Ready to Modernize Your <br/> <span class="text-white/70 italic">Financial Operations?</span>
            </h2>
            <p class="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              Join 50,000+ Nigerian enterprises building the future of financial intelligence on FinancialAuditor.
            </p>
            <div class="flex flex-wrap justify-center gap-6 pt-6">
              <a href="/auth" class="btn-primary py-5 px-12 text-xl bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20 group">
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
