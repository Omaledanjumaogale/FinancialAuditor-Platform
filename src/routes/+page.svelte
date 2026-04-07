<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  // Stats for the landing page
  const stats = [
    { label: 'Businesses Served', value: '50,000+', emoji: '🏢', color: 'emerald' },
    { label: 'Value Audited', value: '₦2.1B+', emoji: '💰', color: 'gold' },
    { label: 'Certified Auditors', value: '500+', emoji: '👨‍💼', color: 'emerald' },
    { label: 'Accuracy Rate', value: '99.7%', emoji: '✅', color: 'gold' }
  ];

  const features = [
    {
      title: 'AI Audit Engine',
      desc: 'Multimodal AI (OCR + NLP + ML) extracts, categorizes, and audits 100+ document formats. Detects fraud and tax discrepancies in real-time.',
      emoji: '🤖',
      tags: ['OCR', 'Fraud Detection', 'Auto-Reconcile'],
      color: 'emerald'
    },
    {
      title: 'Predictive Analytics',
      desc: 'AI delivers performance advisory — revenue forecasting, cost optimization suggestions, and EBITDA projections based on historical data.',
      emoji: '📈',
      tags: ['Forecasting', 'KPI Tracking', 'Benchmarks'],
      color: 'gold'
    },
    {
      title: 'Compliance Engine',
      desc: 'Auto-generates FIRS-ready tax filings, VAT calculations, and CAC-compliant financial statements for any period.',
      emoji: '🛡️',
      tags: ['FIRS Ready', 'VAT/Tax', 'CAC Reports'],
      color: 'info'
    }
  ];
</script>

<Header />

<main class="flex-1">
  <!-- Hero Section -->
  <section class="hero-bg grid-pattern min-h-screen pt-[68px] flex items-center overflow-hidden relative">
    <div class="container-custom py-12 lg:py-24 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <!-- Hero Content -->
        <div class="space-y-8" transition:fade={{ duration: 800 }}>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-bold animate-pulse">
            <span class="w-2 h-2 rounded-full bg-emerald"></span>
            Nigeria's #1 AI Financial Intelligence Platform
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-heading font-black leading-[1.1] text-white tracking-tighter">
            Audit <span class="text-emerald italic">Smarter.</span><br/>
            <span class="grad-text">Grow Faster.</span><br/>
            Comply Effortlessly.
          </h1>

          <p class="text-lg lg:text-xl text-slate-dim max-w-xl leading-relaxed">
            AI-powered financial auditing, real-time compliance, and predictive advisory — purpose-built for Nigerian businesses. FIRS-compliant. CAC-ready. Instant results.
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <button class="btn-primary group text-lg py-4 px-8">
              <span>🚀 Start Free — 30 Days</span>
            </button>
            <button class="btn-secondary text-lg py-4 px-8">
              <span>🎥 See How It Works</span>
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="flex flex-wrap items-center gap-6 pt-8 border-t border-white/5">
            <div class="flex items-center gap-2 text-sm text-slate-dim">
              <span class="text-emerald">✅</span> FIRS Compliant
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-dim">
              <span class="text-gold">🛡️</span> Bank-Grade Security
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-dim">
              <span class="text-emerald">🎓</span> ICAN Certified
            </div>
          </div>
        </div>

        <!-- Hero Preview Mockup -->
        <div class="relative lg:block" transition:fly={{ x: 50, duration: 1000, delay: 200 }}>
          <div class="bg-surface border border-white/10 rounded-[32px] p-6 shadow-2xl shadow-emerald/20 relative z-10 animate-float backdrop-blur-xl">
            <!-- Mockup Window Bar -->
            <div class="flex items-center gap-2 mb-6">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div class="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div class="w-3 h-3 rounded-full bg-[#28CA41]"></div>
              </div>
              <div class="flex-1 bg-white/5 rounded-lg py-1 px-3 text-[10px] font-mono text-slate-dim truncate">
                app.financialauditor.ng/dashboard
              </div>
            </div>

            <!-- KPI Row -->
            <div class="grid grid-cols-3 gap-3 mb-6">
              <div class="bg-emerald/5 border border-emerald/10 rounded-2xl p-4">
                <div class="text-[10px] text-slate-dim font-mono mb-1 uppercase tracking-wider">Revenue</div>
                <div class="text-xl font-heading font-bold text-white">₦4.2M</div>
                <div class="text-[10px] text-emerald mt-1">▲ 18.4%</div>
              </div>
              <div class="bg-gold/5 border border-gold/10 rounded-2xl p-4">
                <div class="text-[10px] text-slate-dim font-mono mb-1 uppercase tracking-wider">Profit</div>
                <div class="text-xl font-heading font-bold text-white">₦1.8M</div>
                <div class="text-[10px] text-gold mt-1">▲ 12.1%</div>
              </div>
              <div class="bg-danger/5 border border-danger/10 rounded-2xl p-4">
                <div class="text-[10px] text-slate-dim font-mono mb-1 uppercase tracking-wider">Burn</div>
                <div class="text-xl font-heading font-bold text-white">₦2.4M</div>
                <div class="text-[10px] text-danger mt-1">▼ 5.2%</div>
              </div>
            </div>

            <!-- Chart Area -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4 h-32 mb-6 relative overflow-hidden">
               <div class="text-[10px] text-slate-dim font-mono mb-2">CASH FLOW · 6 MONTHS</div>
               <div class="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-emerald/20 to-transparent"></div>
               <!-- Simple SVG Path for preview -->
               <svg class="w-full h-full text-emerald" viewBox="0 0 100 40">
                 <path d="M0 35 Q 25 25, 50 30 T 100 10" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" />
               </svg>
            </div>

            <!-- AI Insight -->
            <div class="bg-emerald/10 border border-emerald/20 rounded-2xl p-4 flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald to-emerald-deep flex items-center justify-center shrink-0 shadow-lg shadow-emerald/20">
                <span class="text-lg">🤖</span>
              </div>
              <div>
                <div class="text-xs font-heading font-bold text-emerald mb-1 uppercase tracking-wider">AI ADVISORY</div>
                <p class="text-xs text-slate leading-relaxed">Logistics costs are 12% above average. Use E-WIN logistics for ₦216K projected Q3 savings.</p>
              </div>
            </div>
          </div>

          <!-- Decorative Floating Badges -->
          <div class="absolute -top-6 -left-6 bg-navy/90 border border-white/10 rounded-2xl p-4 backdrop-blur shadow-xl animate-float" style="animation-delay: 1s">
            <div class="text-[10px] text-slate-dim font-mono">AUDIT STATUS</div>
            <div class="text-sm font-bold text-emerald flex items-center gap-2">
              <span>✅</span> Completed
            </div>
          </div>
          <div class="absolute -bottom-6 -right-6 bg-navy/90 border border-white/10 rounded-2xl p-4 backdrop-blur shadow-xl animate-float" style="animation-delay: 2s">
            <div class="text-[10px] text-slate-dim font-mono">ANOMALIES FOUND</div>
            <div class="text-sm font-bold text-gold flex items-center gap-2">
              <span>⚠️</span> 3 Flagged
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Ticker Section -->
  <div class="bg-black/40 border-y border-white/5 py-4 overflow-hidden relative">
    <div class="ticker-content flex gap-12 whitespace-nowrap px-12">
      {#each Array(2) as _}
        <div class="flex items-center gap-12 text-sm font-mono text-slate-dim">
          <span>🇳🇬 FIRS Compliant Reports</span>
          <span class="text-emerald">◆</span>
          <span>AI-Powered OCR Document Analysis</span>
          <span class="text-emerald">◆</span>
          <span>Certified ICAN Auditor Marketplace</span>
          <span class="text-emerald">◆</span>
          <span>CAC Registration Services</span>
          <span class="text-emerald">◆</span>
          <span>Blockchain Audit Trail</span>
          <span class="text-emerald">◆</span>
          <span>Profit & Loss · Balance Sheet · Cash Flow</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Stats Section -->
  <section class="py-24 bg-navy-mid/50 relative overflow-hidden">
    <div class="container-custom">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {#each stats as stat}
          <div class="card-premium p-8 text-center group">
            <div class="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{stat.emoji}</div>
            <div class="text-3xl lg:text-4xl font-heading font-black text-white mb-2">{stat.value}</div>
            <div class="text-sm font-bold text-slate-dim uppercase tracking-widest">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="py-24 relative" id="features">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-block px-4 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-xs font-bold uppercase tracking-widest">Platform Features</div>
        <h2 class="text-4xl lg:text-5xl font-heading font-black text-white">Everything Your Business Needs to <span class="grad-text">Stay Audit-Ready</span></h2>
        <p class="text-lg text-slate-dim">From AI-powered document analysis to FIRS-compliant reporting — one platform handles it all.</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="card-premium p-8 group">
            <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald/10 group-hover:scale-110 transition-all duration-500">
              {feature.emoji}
            </div>
            <h3 class="text-xl font-heading font-bold text-white mb-4">{feature.title}</h3>
            <p class="text-slate-dim leading-relaxed mb-6">{feature.desc}</p>
            <div class="flex flex-wrap gap-2">
              {#each feature.tags as tag}
                <span class="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/5 text-slate-dim border border-white/10 group-hover:border-emerald/20 group-hover:text-emerald transition-colors">{tag}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 relative">
    <div class="container-custom">
      <div class="bg-linear-to-br from-emerald/20 to-navy-mid border border-white/10 rounded-[40px] p-12 lg:p-24 text-center relative overflow-hidden group">
        <div class="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div class="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 class="text-4xl lg:text-6xl font-heading font-black text-white leading-tight">Ready to Automate Your <span class="text-emerald italic">Financial Intelligence?</span></h2>
          <p class="text-xl text-slate-dim">Join 50,000+ Nigerian businesses saving time and ensuring 100% compliance with FinancialAuditor.</p>
          <div class="flex flex-wrap justify-center gap-6">
            <button class="btn-primary py-5 px-10 text-xl">
              <span>🔥 Start Free Trial Now</span>
            </button>
            <button class="btn-secondary py-5 px-10 text-xl border-white/20 text-white hover:bg-white/5">
              <span>📞 Book Enterprise Demo</span>
            </button>
          </div>
          <p class="text-sm text-slate-dim italic">No credit card required. Cancel anytime. FIRS-compliant.</p>
        </div>
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
</style>
