<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SEO from '$lib/components/SEO.svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const features = [
    {
      icon: '🤖',
      title: 'AI Audit Engine',
      description: 'Multimodal AI (OCR + NLP + ML) extracts, categorizes, and audits 100+ document formats. Detects fraud and tax discrepancies.',
      tags: ['OCR', 'Fraud Detection', 'Auto-Reconcile'],
      color: 'emerald'
    },
    {
      icon: '📊',
      title: 'Predictive Analytics',
      description: 'AI delivers performance advisory — revenue forecasting, cost optimization suggestions, and EBITDA projections.',
      tags: ['Forecasting', 'KPI Tracking', 'Benchmarks'],
      color: 'gold'
    },
    {
      icon: '📜',
      title: 'FIRS & CAC Compliance',
      description: 'Auto-generates FIRS-ready tax filings, VAT calculations, and CAC-compliant financial statements instantly.',
      tags: ['FIRS Ready', 'VAT/Tax', 'CAC Reports'],
      color: 'purple'
    },
    {
      icon: '🤝',
      title: 'Auditor Marketplace',
      description: 'Connect with 500+ ICAN-certified professional auditors. Bid-based system ensures competitive pricing.',
      tags: ['ICAN Certified', 'Bid System', 'Vetted'],
      color: 'blue'
    },
    {
      icon: '📁',
      title: 'Smart Document Upload',
      description: 'Drag-and-drop interface supports invoices, receipts, bank statements. AI auto-classifies and extracts data.',
      tags: ['Drag & Drop', '100+ Formats', 'Blockchain Trail'],
      color: 'emerald'
    },
    {
      icon: '💡',
      title: 'RaaS Advisory Engine',
      description: 'Results-as-a-Service. AI simulates business scenarios, delivers Monthly Growth Packs with actionable playbooks.',
      tags: ['Growth Packs', 'ROI Tracking', 'Guaranteed'],
      color: 'rose'
    }
  ];

  const stats = [
    { icon: '🏢', label: 'Businesses Served', value: '50,000+', color: 'emerald' },
    { icon: '💰', label: 'Value Audited', value: '₦2.1B+', color: 'gold' },
    { icon: '👨‍💼', label: 'Certified Auditors', value: '500+', color: 'emerald' },
    { icon: '🎯', label: 'Accuracy Rate', value: '99.7%', color: 'gold' }
  ];
</script>

<SEO 
  title="Home" 
  description="FinancialAuditor - Nigeria's #1 AI-Powered Financial Intelligence Platform for SMEs and Corporations. FIRS-compliant. CAC-ready." 
/>

<!-- HERO SECTION -->
<section class="hero-bg grid-pattern min-h-[90vh] flex flex-col justify-center relative overflow-hidden px-6">
  <!-- Decorative orbs -->
  <div class="absolute top-[20%] -right-[8%] w-[500px] h-[500px] rounded-full bg-emerald/10 blur-[100px] pointer-events-none"></div>
  <div class="absolute bottom-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-gold/5 blur-[80px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto w-full py-12 lg:py-24">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- LEFT -->
      {#if visible}
        <div in:fly={{ y: 30, duration: 800 }}>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/30 text-emerald text-xs font-bold uppercase tracking-wider mb-6">
            <span class="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
            Nigeria's #1 AI Financial Intelligence Platform
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Audit Smarter. <br/>
            <span class="grad-text">Grow Faster.</span> <br/>
            Comply Effortlessly.
          </h1>
          
          <p class="text-slate-dim text-lg lg:text-xl max-w-xl mb-8 leading-relaxed">
            AI-powered financial auditing, real-time compliance, and predictive advisory — purpose-built for Nigerian businesses, SMEs, and corporations. FIRS-compliant. CAC-ready.
          </p>
          
          <div class="flex flex-wrap gap-4 mb-10">
            <a href="/auth/signup" class="btn-primary group">
              <span>🚀</span>
              Start Free — 30 Days
            </a>
            <a href="#how-it-works" class="btn-secondary">
              <span>📈</span>
              See How It Works
            </a>
          </div>
          
          <!-- TRUST BADGES -->
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex items-center gap-2 text-sm text-slate-dim">
              <span class="text-emerald">✅</span>
              FIRS Compliant
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-dim">
              <span class="text-gold">🔒</span>
              Bank-Grade Security
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-dim">
              <span class="text-emerald">⚖️</span>
              ICAN Certified Auditors
            </div>
          </div>
        </div>
      {/if}

      <!-- RIGHT - DASHBOARD PREVIEW -->
      {#if visible}
        <div in:fly={{ y: 50, duration: 1000, delay: 200 }} class="relative">
          <div class="card p-6 border-white/10 shadow-2xl max-w-[520px] mx-auto animate-[float_6s_ease-in-out_infinite]">
            <!-- Mockup header -->
            <div class="flex items-center gap-3 mb-6">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#28CA41]"></div>
              </div>
              <div class="flex-1 bg-white/5 rounded px-3 py-1 text-[10px] font-mono text-slate-dim">
                app.financialauditor.ng/dashboard
              </div>
            </div>

            <!-- KPI row -->
            <div class="grid grid-cols-3 gap-3 mb-6">
              <div class="bg-emerald/5 border border-emerald/20 rounded-xl p-3">
                <div class="text-[10px] text-slate-dim font-mono mb-1 uppercase tracking-wider">Revenue</div>
                <div class="text-lg font-bold text-white">₦4.2M</div>
                <div class="text-[10px] text-emerald font-medium">↑ 18.4%</div>
              </div>
              <div class="bg-gold/5 border border-gold/20 rounded-xl p-3">
                <div class="text-[10px] text-slate-dim font-mono mb-1 uppercase tracking-wider">Profit</div>
                <div class="text-lg font-bold text-white">₦1.8M</div>
                <div class="text-[10px] text-gold font-medium">↑ 12.1%</div>
              </div>
              <div class="bg-rose/5 border border-rose/20 rounded-xl p-3">
                <div class="text-[10px] text-slate-dim font-mono mb-1 uppercase tracking-wider">Expenses</div>
                <div class="text-lg font-bold text-white">₦2.4M</div>
                <div class="text-[10px] text-rose font-medium">↓ 5.2%</div>
              </div>
            </div>

            <!-- AI Insight -->
            <div class="bg-emerald/5 border border-emerald/20 rounded-xl p-4 flex gap-4">
              <div class="w-10 h-10 rounded-lg bg-emerald flex items-center justify-center text-lg shadow-lg shadow-emerald/20">
                🤖
              </div>
              <div>
                <div class="text-xs font-bold text-emerald uppercase mb-1">AI Advisory Insight</div>
                <p class="text-xs text-slate leading-relaxed">
                  Cut logistics costs by 12% → Projected ₦216K savings for Q3.
                </p>
              </div>
            </div>
          </div>

          <!-- Floating Stat Cards -->
          <div class="absolute -top-4 -left-6 bg-navy-mid/90 backdrop-blur border border-white/10 rounded-xl px-4 py-2 shadow-xl animate-[float_5s_ease-in-out_infinite_0.5s]">
            <div class="text-[10px] text-slate-dim font-mono uppercase">Audit Status</div>
            <div class="text-xs font-bold text-emerald">✅ Completed</div>
          </div>
          <div class="absolute bottom-4 -right-6 bg-navy-mid/90 backdrop-blur border border-white/10 rounded-xl px-4 py-2 shadow-xl animate-[float_5s_ease-in-out_infinite_1s]">
            <div class="text-[10px] text-slate-dim font-mono uppercase">Anomalies Found</div>
            <div class="text-xs font-bold text-gold">⚠️ 3 Flagged</div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- TICKER -->
  <div class="border-y border-white/5 py-4 bg-black/20 overflow-hidden">
    <div class="ticker-content flex gap-12 whitespace-nowrap">
      {#each Array(2) as _}
        <div class="flex gap-12 items-center">
          <span class="text-xs font-mono text-slate-dim">🇳🇬 FIRS Compliant Reports</span>
          <span class="text-emerald">◆</span>
          <span class="text-xs font-mono text-slate-dim">AI-Powered OCR Document Analysis</span>
          <span class="text-emerald">◆</span>
          <span class="text-xs font-mono text-slate-dim">Certified ICAN Auditor Marketplace</span>
          <span class="text-emerald">◆</span>
          <span class="text-xs font-mono text-slate-dim">CAC Registration Services</span>
          <span class="text-emerald">◆</span>
          <span class="text-xs font-mono text-slate-dim">Profit & Loss · Balance Sheet · Cash Flow</span>
          <span class="text-emerald">◆</span>
          <span class="text-xs font-mono text-slate-dim">Blockchain Audit Trail</span>
          <span class="text-emerald">◆</span>
          <span class="text-xs font-mono text-slate-dim">Paystack · Flutterwave Integration</span>
          <span class="text-emerald">◆</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- STATS SECTION -->
<section class="py-16 bg-navy-mid px-6">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {#each stats as stat}
        <div class="card p-8 text-center group">
          <div class="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
            {stat.icon}
          </div>
          <div class="text-3xl font-bold font-mono mb-2 text-white">
            {stat.value}
          </div>
          <div class="text-sm text-slate-dim">
            {stat.label}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FEATURES SECTION -->
<section id="features" class="py-24 bg-navy px-6">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <div class="inline-flex items-center px-3 py-1 rounded-full bg-emerald/10 border border-emerald/30 text-emerald text-[10px] font-bold uppercase tracking-widest mb-4">
        Platform Features
      </div>
      <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6">
        Everything Your Business Needs <br/>
        to <span class="grad-text">Stay Audit-Ready</span>
      </h2>
      <p class="text-slate-dim text-lg max-w-2xl mx-auto">
        From AI-powered document analysis to FIRS-compliant reporting — one platform handles it all.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each features as feature}
        <div class="card p-8 group border-white/5 hover:border-emerald/30">
          <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald/10 transition-colors">
            {feature.icon}
          </div>
          <h3 class="text-xl font-bold text-white mb-4">{feature.title}</h3>
          <p class="text-slate-dim text-sm leading-relaxed mb-6">
            {feature.description}
          </p>
          <div class="flex flex-wrap gap-2">
            {#each feature.tags as tag}
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-slate-dim border border-white/5">
                {tag}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
</style>
