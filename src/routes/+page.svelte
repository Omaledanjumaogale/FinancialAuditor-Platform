<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { Users, DollarSign, ShieldCheck, Target } from 'lucide-svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import StatCard from '$lib/components/ui/StatCard.svelte';
  import FeatureCard from '$lib/components/ui/FeatureCard.svelte';
  import Accordion from '$lib/components/ui/Accordion.svelte';
  import PricingCard from '$lib/components/ui/PricingCard.svelte';

  // ── Stats ──────────────────────────────────────────────
  const stats = [
    { label: 'Businesses Served', value: '50,000+', change: '22%', trend: 'up' as const, icon: Users },
    { label: 'Value Audited',     value: '₦2.1B+',  change: '18%', trend: 'up' as const, icon: DollarSign },
    { label: 'Certified Auditors', value: '500+',   change: '12%', trend: 'up' as const, icon: ShieldCheck },
    { label: 'Accuracy Rate',     value: '99.7%',   change: '0.3%', trend: 'up' as const, icon: Target },
  ];

  // ── Features ───────────────────────────────────────────
  const features = [
    {
      title: 'AI Audit Engine',
      description: 'Multimodal AI using document scan, text analysis, and machine learning extracts, categorizes, and audits 100+ document formats. Detects fraudulent activity, duplicate payments, and tax discrepancies in real time.',
      emoji: '🧠',
      tags: ['OCR', 'Fraud Detection', 'Auto-Reconcile'],
    },
    {
      title: 'Predictive Analytics',
      description: 'AI delivers performance advisory — revenue forecasting, cost optimization suggestions, and earnings projections based on your historical data patterns.',
      emoji: '📊',
      tags: ['Forecasting', 'KPI Tracking', 'Benchmarks'],
    },
    {
      title: 'FIRS & CAC Compliance',
      description: 'Generates FIRS-ready tax filings, VAT calculations, and CAC-compliant financial statements for 3, 6, or 12-month periods. State revenue compliant.',
      emoji: '📜',
      tags: ['FIRS Ready', 'VAT/Tax', 'CAC Reports'],
    },
    {
      title: 'Auditor Marketplace',
      description: 'Connect with 500+ ICAN-certified professional auditors. Bid-based system ensures competitive pricing. Platform takes just 5% — auditors earn 95% of every engagement.',
      emoji: '🤝',
      tags: ['ICAN Certified', 'Bid System', 'Vetted'],
    },
    {
      title: 'Smart Document Upload',
      description: 'Drag-and-drop interface supports invoices, receipts, bank statements, contracts. AI auto-classifies and extracts data. Blockchain-secured audit trail for every file.',
      emoji: '☁️',
      tags: ['Drag & Drop', '100+ Formats', 'Blockchain Trail'],
    },
    {
      title: 'Results Advisory Engine',
      description: 'Results-as-a-Service. AI simulates business scenarios, delivers monthly growth plans with actionable guides, tracks return on investment, and guarantees measurable outcomes.',
      emoji: '⚡',
      tags: ['Growth Plans', 'ROI Tracking', 'Guaranteed'],
    },
  ];

  // ── How It Works ───────────────────────────────────────
  const steps = [
    {
      number: '1',
      title: 'Sign Up & Set Up',
      description: 'Create your account, verify your business details, and choose a subscription plan.',
      color: 'from-emerald to-emerald-deep',
      glow: 'rgba(0,200,150,0.4)',
    },
    {
      number: '2',
      title: 'Upload Documents',
      description: 'Drag & drop invoices, receipts, bank statements. AI auto-classifies everything instantly.',
      color: 'from-[#7C3AED] to-[#5B21B6]',
      glow: 'rgba(124,58,237,0.4)',
    },
    {
      number: '3',
      title: 'AI Audits & Analyses',
      description: 'AI engine processes documents, detects unusual activity, reconciles accounts, and flags issues.',
      color: 'from-gold to-[#e8921a]',
      glow: 'rgba(245,166,35,0.4)',
    },
    {
      number: '4',
      title: 'Get Compliance Reports',
      description: 'Download FIRS-ready income statements, balance sheets, and CAC-compliant statements instantly.',
      color: 'from-[#00B4D8] to-[#0077B6]',
      glow: 'rgba(0,180,216,0.4)',
    },
  ];

  // ── Pricing ────────────────────────────────────────────
  let billingPeriod = $state<'annual' | 'monthly'>('annual');

  const plans = [
    {
      name: 'Starter',
      emoji: '🌱',
      priceAnnual: '₦20K',
      priceMonthly: '₦2.5K',
      description: 'For freelancers, sole traders & small businesses starting their audit journey.',
      features: [
        'Basic AI auditing & document analysis',
        '3, 6 & 12-month reports (Income & Balance Sheet)',
        'FIRS-compliant statements',
        '1-year perpetual financial record',
        '5GB secure document storage',
        '1 user account',
      ],
      isPopular: false,
      ctaText: 'Get Started Free',
    },
    {
      name: 'Pro',
      emoji: '🚀',
      priceAnnual: '₦50K',
      priceMonthly: '₦6K',
      description: 'For growing businesses, non-profits, and businesses serious about financial intelligence.',
      features: [
        'Everything in Starter, plus:',
        'Unlimited AI audits & document uploads',
        'Predictive analytics & cash flow forecasting',
        'Paystack & Flutterwave bank reconciliation',
        'Auditor marketplace access',
        'Monthly Growth Plan advisory (₦5K value)',
        '50GB storage + 5 team users',
        'CAC & corporate document services',
      ],
      isPopular: true,
      ctaText: 'Start Pro Trial',
    },
    {
      name: 'Enterprise',
      emoji: '🏛️',
      priceAnnual: '₦150K+',
      priceMonthly: '₦18K+',
      description: 'For corporations, foundations, and accounting firms that need full customization.',
      features: [
        'Everything in Pro, plus:',
        'Custom AI model fine-tuning',
        'White-label branded dashboards',
        'Dedicated account manager',
        'ERP/CRM integrations (Odoo, Zoho)',
        'Unlimited users & storage',
        'Guaranteed 10% cost savings or refund',
        'Priority ICAN auditor assignments',
      ],
      isPopular: false,
      ctaText: 'Contact Sales',
    },
  ];

  // ── Services ────────────────────────────────────────────
  const services = [
    {
      title: 'Company Registration (CAC)',
      description: 'Full CAC company formation service. Business name, limited liability, or PLC registration handled end-to-end.',
      emoji: '🏢',
      color: 'text-emerald border-emerald/25 bg-emerald/10',
    },
    {
      title: 'Foundation/NGO Registration',
      description: 'Register your foundation, NGO, or non-profit with CAC. Includes trust deed drafting and compliance filing.',
      emoji: '❤️',
      color: 'text-gold border-gold/25 bg-gold/10',
    },
    {
      title: 'Corporate Document Drafting',
      description: 'Memoranda, articles of association, shareholder agreements, board resolutions, and formal corporate correspondence.',
      emoji: '📄',
      color: 'text-[#9B8EF0] border-[#6C5CE7]/25 bg-[#6C5CE7]/10',
    },
    {
      title: 'FIRS Tax Filing',
      description: 'Annual returns, CIT, VAT, PAYE, withholding tax filings. Our certified tax consultants ensure full FIRS compliance.',
      emoji: '💳',
      color: 'text-[#00B4D8] border-[#00B4D8]/25 bg-[#00B4D8]/10',
    },
  ];

  // ── Testimonials ────────────────────────────────────────
  const testimonials = [
    {
      quote: '"FinancialAuditor saved our Lagos business over ₦1.8M in the first quarter alone. The AI flagged duplicate supplier payments we\'d missed for 2 years. Worth every kobo."',
      name: 'Adaeze Okonkwo',
      role: 'CEO, AgroFresh Nigeria Ltd',
      initials: 'AO',
      gradient: 'from-emerald to-emerald-deep',
    },
    {
      quote: '"As an ICAN auditor, I closed 12 new clients in 3 months through the marketplace. The AI does the heavy work — I focus on analysis and guidance. My income tripled."',
      name: 'Emmanuel Ihejirika',
      role: 'ICAN, FCA — Lagos Practice',
      initials: 'EI',
      gradient: 'from-gold to-[#e8921a]',
    },
    {
      quote: '"Our foundation\'s FIRS compliance was a nightmare. FinancialAuditor generated our annual returns automatically and handled our CAC registration. 10/10 recommend."',
      name: 'Ngozi Kalu',
      role: 'Director, Hope Foundation Abuja',
      initials: 'NK',
      gradient: 'from-[#6C5CE7] to-[#5A4BD1]',
    },
  ];

  // ── FAQ ─────────────────────────────────────────────────
  const faqItems = [
    {
      question: 'How secure is my financial data?',
      answer: 'We use enterprise-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your data is stored in ISO 27001 compliant data centers with regular third-party security audits.',
      emoji: '🔒',
    },
    {
      question: 'Does it support Nigerian Tax Laws?',
      answer: 'Yes, our AI models are specifically trained on FIRS guidelines and current Nigerian financial regulations to ensure 100% compliance with CIT, VAT, PAYE, and withholding tax requirements.',
      emoji: '🇳🇬',
    },
    {
      question: 'Can I invite my existing auditor?',
      answer: 'Absolutely. You can invite your auditor to join the platform as a collaborator, giving them secure, role-based access to your audited records and working documents.',
      emoji: '👨‍💼',
    },
    {
      question: 'What document formats are supported?',
      answer: 'We support 100+ formats including PDF, Excel, CSV, images (JPEG/PNG), Word documents, bank statement exports, and direct Paystack/Flutterwave transaction feeds.',
      emoji: '📁',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All plans come with a 30-day free trial with full feature access. No credit card required to get started. Cancel anytime with no penalties.',
      emoji: '🎁',
    },
  ];

  // ── Ticker content ──────────────────────────────────────
  const tickerItems = [
    '🇳🇬 FIRS Compliant Reports',
    'AI-Powered Document Analysis',
    'Certified ICAN Auditor Marketplace',
    'CAC Registration Services',
    'Income Statement · Balance Sheet · Cash Flow',
    'Blockchain Audit Trail',
    'Paystack · Flutterwave Integration',
    'Real-Time Compliance Monitoring',
  ];

  // ── Scroll progress ─────────────────────────────────────
  let scrollProgress = $state(0);
  onMount(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = total > 0 ? (window.scrollY / total) * 100 : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>FinancialAuditor – AI-Powered Financial Auditing & Compliance | Nigeria</title>
  <meta name="description" content="Nigeria's #1 AI-powered financial auditing platform. FIRS-compliant reports, CAC-ready statements, auditor marketplace, and predictive advisory for businesses and enterprises. Start free today." />
</svelte:head>

<!-- Scroll Progress Indicator -->
<div
  class="fixed top-0 left-0 z-[200] h-[3px] bg-gradient-to-r from-emerald to-gold pointer-events-none transition-all"
  style="width: {scrollProgress}%"
  role="progressbar"
  aria-valuenow={scrollProgress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Page scroll progress"
></div>

<Header />

<main id="main-content">
  <!-- ==================== HERO SECTION ==================== -->
  <section
    id="home"
    class="hero-bg grid-pattern relative min-h-screen flex flex-col justify-center overflow-hidden pt-[68px]"
    aria-label="Hero section"
  >
    <!-- Decorative orbs -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,200,150,0.08)_0%,transparent_70%)]"></div>
      <div class="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.06)_0%,transparent_70%)]"></div>
    </div>

    <div class="container-custom relative z-10 py-16 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Copy -->
        <div in:fly={{ y: 30, duration: 800 }}>
          <div class="badge mb-6" aria-label="Platform status">
            <span class="relative flex h-2 w-2 mr-1" aria-hidden="true">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
            </span>
            Nigeria's #1 AI Financial Intelligence Platform
          </div>

          <h1 class="text-[clamp(2.5rem,7vw,4.5rem)] font-heading font-black leading-[1.08] text-white mb-5 tracking-tight">
            Audit Smarter.<br/>
            <span class="grad-text">Grow Faster.</span><br/>
            Comply Effortlessly.
          </h1>

          <p class="text-lg text-slate max-w-[540px] mb-8 leading-relaxed">
            AI-powered financial auditing, real-time compliance, and predictive advisory — purpose-built for Nigerian businesses, small and medium enterprises, corporations, and foundations. FIRS-compliant. CAC-ready. Instant results.
          </p>

          <div class="flex flex-wrap gap-4 mb-10">
            <a href="/auth" class="btn-primary py-4 px-8 text-base shadow-glow group" aria-label="Start your free 30-day trial">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Start Free — 30 Days
            </a>
            <a href="#how-it-works" class="btn-secondary py-4 px-8 text-base group" aria-label="Learn how the platform works">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>
              See How It Works
            </a>
          </div>

          <!-- Trust Badges -->
          <div class="flex flex-wrap items-center gap-6" role="list" aria-label="Trust certifications">
            <div class="flex items-center gap-2 text-sm text-slate-dim" role="listitem">
              <svg width="16" height="16" fill="currentColor" class="text-emerald" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              FIRS Compliant
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-dim" role="listitem">
              <svg width="16" height="16" fill="currentColor" class="text-gold" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Bank-Grade Security
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-dim" role="listitem">
              <svg width="16" height="16" fill="currentColor" class="text-emerald" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              ICAN Certified Auditors
            </div>
          </div>
        </div>

        <!-- Right: Dashboard Mockup -->
        <div class="relative" in:fly={{ y: 30, delay: 300, duration: 800 }}>
          <div class="bg-surface border border-white/10 rounded-2xl p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] max-w-[520px] mx-auto animate-float">
            <!-- Mockup header -->
            <div class="flex items-center gap-3 mb-5">
              <div class="flex gap-1.5" aria-hidden="true">
                <div class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#28CA41]"></div>
              </div>
              <div class="flex-1 bg-white/5 rounded-md px-3 py-1.5 font-mono text-[10px] text-slate-dim">
                app.financialauditor.ng/dashboard
              </div>
            </div>

            <!-- KPI Row -->
            <div class="grid grid-cols-3 gap-3 mb-5" role="list" aria-label="Key performance indicators">
              <div class="bg-emerald/8 border border-emerald/20 rounded-xl p-3" role="listitem">
                <div class="font-mono text-[10px] text-slate-dim mb-1">REVENUE</div>
                <div class="font-heading font-bold text-white text-base">₦4.2M</div>
                <div class="text-[10px] text-emerald">↑ 18.4%</div>
              </div>
              <div class="bg-gold/8 border border-gold/20 rounded-xl p-3" role="listitem">
                <div class="font-mono text-[10px] text-slate-dim mb-1">NET PROFIT</div>
                <div class="font-heading font-bold text-white text-base">₦1.8M</div>
                <div class="text-[10px] text-gold">↑ 12.1%</div>
              </div>
              <div class="bg-danger/8 border border-danger/20 rounded-xl p-3" role="listitem">
                <div class="font-mono text-[10px] text-slate-dim mb-1">EXPENSES</div>
                <div class="font-heading font-bold text-white text-base">₦2.4M</div>
                <div class="text-[10px] text-danger">↓ 5.2%</div>
              </div>
            </div>

            <!-- Chart Mockup -->
            <div class="bg-white/[0.03] rounded-xl p-4 mb-4 h-24 relative overflow-hidden" role="img" aria-label="Cash flow chart for the past 6 months">
              <div class="font-mono text-[10px] text-slate-dim mb-2">CASH FLOW · 6 MONTHS</div>
              <svg viewBox="0 0 300 50" class="w-full h-auto" aria-hidden="true">
                <defs>
                  <linearGradient id="hero-g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="rgba(0,200,150,0.5)"/>
                    <stop offset="100%" stop-color="rgba(0,200,150,0)"/>
                  </linearGradient>
                </defs>
                <path d="M0,40 C30,35 60,20 90,22 S150,35 180,18 S240,8 300,12" stroke="var(--color-emerald)" stroke-width="2" fill="none"/>
                <path d="M0,40 C30,35 60,20 90,22 S150,35 180,18 S240,8 300,12 L300,50 L0,50Z" fill="url(#hero-g1)"/>
              </svg>
            </div>

            <!-- AI Advisory -->
            <div class="bg-emerald/5 border border-emerald/20 rounded-xl p-3 flex items-start gap-3" role="status" aria-label="AI Advisory recommendation">
              <div class="w-7 h-7 bg-gradient-to-br from-emerald to-emerald-deep rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg width="13" height="13" fill="#fff" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div>
                <div class="font-mono font-bold text-[10px] text-emerald mb-0.5">AI ADVISORY</div>
                <div class="text-[11px] text-slate">Cut logistics costs by 12% → Projected ₦216K savings Q3</div>
              </div>
            </div>
          </div>

          <!-- Floating Stat Badges -->
          <div class="stat-float absolute -top-3 -left-4 hidden xl:block" aria-hidden="true" style="animation: float 5s ease-in-out infinite 0.5s;">
            <div class="font-mono text-[10px] text-slate-dim">AUDIT STATUS</div>
            <div class="font-heading font-bold text-emerald text-sm">✓ Completed</div>
          </div>
          <div class="stat-float absolute bottom-2 -right-4 hidden xl:block" aria-hidden="true" style="animation: float 5s ease-in-out infinite 1s;">
            <div class="font-mono text-[10px] text-slate-dim">ISSUES FOUND</div>
            <div class="font-heading font-bold text-gold text-sm">3 Flagged</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticker -->
    <div class="border-t border-b border-white/6 py-3 bg-black/20 overflow-hidden" aria-hidden="true">
      <div class="ticker-content gap-0 whitespace-nowrap">
        <div class="inline-flex gap-12 pr-12">
          {#each tickerItems as item (item)}
            <span class="font-mono text-[11px] text-slate-dim">{item}</span>
            <span class="text-emerald">◆</span>
          {/each}
        </div>
        <div class="inline-flex gap-12 pr-12" aria-hidden="true">
          {#each tickerItems as item (item)}
            <span class="font-mono text-[11px] text-slate-dim">{item}</span>
            <span class="text-emerald">◆</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== STATS SECTION ==================== -->
  <section class="py-16 bg-navy-mid" aria-labelledby="stats-heading">
    <h2 id="stats-heading" class="sr-only">Platform statistics</h2>
    <div class="container-custom">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {#each stats as stat, i (stat.label)}
          <StatCard {...stat} delay={i * 100} />
        {/each}
      </div>
    </div>
  </section>

  <!-- ==================== FEATURES SECTION ==================== -->
  <section id="features" class="py-24 lg:py-32 bg-navy" aria-labelledby="features-heading">
    <div class="container-custom">
      <div class="text-center mb-14 max-w-2xl mx-auto" data-animate>
        <div class="badge mb-4">Platform Features</div>
        <h2 id="features-heading" class="text-white mb-4">
          Everything Your Business Needs<br/>to <span class="grad-text">Stay Audit-Ready</span>
        </h2>
        <p class="text-slate-dim text-lg">From AI-powered document analysis to FIRS-compliant reporting — one platform handles it all.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each features as feature, i (feature.title)}
          <FeatureCard {...feature} delay={i * 80} />
        {/each}
      </div>
    </div>
  </section>

  <!-- ==================== HOW IT WORKS ==================== -->
  <section id="how-it-works" class="py-24 lg:py-32 bg-navy-mid" aria-labelledby="how-it-works-heading">
    <div class="container-custom">
      <div class="text-center mb-14 max-w-2xl mx-auto">
        <div class="badge mb-4">Simple Process</div>
        <h2 id="how-it-works-heading" class="text-white mb-4">
          From Upload to <span class="grad-text">Insight in Minutes</span>
        </h2>
        <p class="text-slate-dim text-lg">No accounting expertise needed. Our AI does the heavy lifting.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <!-- Connector line desktop -->
        <div class="hidden lg:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald to-gold opacity-30 z-0 pointer-events-none" aria-hidden="true"></div>

        {#each steps as step, i (step.number)}
          <div class="text-center relative z-10" in:fly={{ y: 20, delay: i * 100, duration: 600 }}>
            <div
              class="w-14 h-14 rounded-full bg-gradient-to-br {step.color} flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_{step.glow}]"
              role="img"
              aria-label="Step {step.number}"
            >
              <span class="font-heading font-black text-white text-xl">{step.number}</span>
            </div>
            <h3 class="text-lg font-heading font-black text-white mb-2">{step.title}</h3>
            <p class="text-sm text-slate-dim leading-relaxed">{step.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ==================== PRICING SECTION ==================== -->
  <section id="pricing" class="py-24 lg:py-32 bg-navy" aria-labelledby="pricing-heading">
    <div class="container-custom">
      <div class="text-center mb-14 max-w-2xl mx-auto">
        <div class="badge mb-4">Transparent Pricing</div>
        <h2 id="pricing-heading" class="text-white mb-4">
          Plans That <span class="grad-text">Scale With You</span>
        </h2>
        <p class="text-slate-dim text-lg">All prices in Nigerian Naira. Cancel anytime.</p>
      </div>

      <!-- Billing Toggle -->
      <div class="flex justify-center mb-12" role="group" aria-label="Billing period selection">
        <div class="bg-surface border border-white/10 rounded-full p-1 flex gap-1">
          <button
            onclick={() => billingPeriod = 'annual'}
            class="px-6 py-2 rounded-full text-sm font-heading font-semibold transition-all {billingPeriod === 'annual' ? 'bg-emerald text-white' : 'text-slate-dim hover:text-white'}"
            aria-pressed={billingPeriod === 'annual'}
          >Annual</button>
          <button
            onclick={() => billingPeriod = 'monthly'}
            class="px-6 py-2 rounded-full text-sm font-heading font-semibold transition-all {billingPeriod === 'monthly' ? 'bg-emerald text-white' : 'text-slate-dim hover:text-white'}"
            aria-pressed={billingPeriod === 'monthly'}
          >Monthly</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {#each plans as plan, i (plan.name)}
          <PricingCard
            name={plan.name}
            emoji={plan.emoji}
            price={billingPeriod === 'annual' ? plan.priceAnnual : plan.priceMonthly}
            period={billingPeriod === 'annual' ? 'yr' : 'mo'}
            description={plan.description}
            features={plan.features}
            isPopular={plan.isPopular}
            ctaText={plan.ctaText}
            delay={i * 100}
          />
        {/each}
      </div>

      <!-- Add-ons -->
      <div class="mt-12 card-premium p-8" data-animate>
        <div class="text-center mb-8">
          <h3 class="text-xl font-heading font-black text-white mb-2">Available Add-Ons</h3>
          <p class="text-slate-dim text-sm">Enhance any plan with powerful extras</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4" role="list" aria-label="Available add-ons">
          {#each [
            { name: 'Custom AI Training', desc: 'Train AI on your industry data', price: '₦10,000', color: 'text-emerald' },
            { name: 'QuickBooks Sync', desc: 'Two-way data synchronization', price: '₦15,000/yr', color: 'text-emerald' },
            { name: 'Monthly Growth Plan', desc: 'AI-guided advisory plans', price: '₦5K–20K/mo', color: 'text-gold' },
            { name: 'Free Trial Extension', desc: '1-month full access free', price: '₦0', color: 'text-emerald' },
          ] as addon (addon.name)}
            <div class="bg-white/3 border border-white/8 rounded-xl p-4" role="listitem">
              <div class="font-semibold text-white mb-1 text-sm">{addon.name}</div>
              <div class="text-xs text-slate-dim mb-2">{addon.desc}</div>
              <div class="font-heading font-bold {addon.color}">{addon.price}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== AUDITORS SECTION ==================== -->
  <section id="auditors" class="py-24 lg:py-32 bg-gradient-to-br from-navy-mid to-navy" aria-labelledby="auditors-heading">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div in:fly={{ x: -30, duration: 700 }}>
          <div class="badge badge-gold mb-5">For Certified Auditors</div>
          <h2 id="auditors-heading" class="text-white mb-5">
            Join Nigeria's Largest <span class="text-gold">Auditor Marketplace</span>
          </h2>
          <p class="text-slate text-lg leading-relaxed mb-8">
            As an ICAN/ANAN/CPA-certified professional, sign up for free and earn 95% of every client
            engagement. Use our AI-assisted tools to complete audits 10× faster while maintaining professional standards.
          </p>

          <ul class="flex flex-col gap-4 mb-10" aria-label="Auditor benefits">
            {#each [
              'Sign up free — no joining fee ever',
              'Earn 95% of every client fee — we take just 5%',
              'AI-assisted workflows — complete audits 10× faster',
              'Build your reputation through verified client reviews',
            ] as benefit (benefit)}
              <li class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg width="16" height="16" fill="var(--color-gold)" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="text-slate">{benefit}</span>
              </li>
            {/each}
          </ul>

          <a href="/auth" class="btn-primary py-4 px-8 text-base" style="background: linear-gradient(135deg, var(--color-gold), #e8921a);" aria-label="Join the platform as a certified auditor">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
            Join as an Auditor
          </a>
        </div>

        <div class="flex flex-col gap-5" in:fly={{ x: 30, duration: 700 }}>
          <!-- Earnings Card -->
          <div class="card-premium card-gold p-6">
            <div class="flex justify-between items-center mb-5">
              <div class="font-mono text-xs text-gold-light">AUDITOR EARNINGS — Q1 2025</div>
              <div class="badge badge-gold text-[10px] py-0.5 px-2">LIVE</div>
            </div>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <div class="text-3xl font-heading font-black text-white">₦2.4M</div>
                <div class="text-xs text-slate-dim mt-1">Avg. auditor earnings/yr</div>
              </div>
              <div>
                <div class="text-3xl font-heading font-black text-gold">847</div>
                <div class="text-xs text-slate-dim mt-1">Active job listings</div>
              </div>
            </div>
          </div>

          <!-- Requirements Card -->
          <div class="card-premium p-6">
            <div class="font-mono text-xs text-slate-dim mb-5 uppercase tracking-widest">Certification Requirements</div>
            <ul class="flex flex-col gap-3" aria-label="Required certifications">
              {#each [
                'ICAN (Institute of Chartered Accountants of Nigeria)',
                'ANAN (Association of National Accountants)',
                'CPA or equivalent international certification',
                'Valid NIN & professional practice license',
              ] as req (req)}
                <li class="flex items-center gap-3 text-sm text-slate">
                  <div class="w-2 h-2 rounded-full bg-emerald flex-shrink-0" aria-hidden="true"></div>
                  {req}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== SERVICES SECTION ==================== -->
  <section id="services" class="py-24 lg:py-32 bg-navy" aria-labelledby="services-heading">
    <div class="container-custom">
      <div class="text-center mb-14 max-w-2xl mx-auto">
        <div class="badge mb-4">Corporate Services</div>
        <h2 id="services-heading" class="text-white mb-4">
          Beyond Auditing — <span class="grad-text">Complete Business Support</span>
        </h2>
        <p class="text-slate-dim text-lg">Professional corporate services delivered by our expert team through the platform.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each services as service, i (service.title)}
          <div
            class="card-premium p-6 flex flex-col group"
            in:fly={{ y: 20, delay: i * 80, duration: 600 }}
          >
            <div class="w-12 h-12 rounded-xl border flex items-center justify-center mb-5 text-2xl {service.color}">
              {service.emoji}
            </div>
            <h3 class="text-base font-heading font-black text-white mb-2 group-hover:text-emerald transition-colors">{service.title}</h3>
            <p class="text-xs text-slate-dim leading-relaxed flex-1 mb-4">{service.description}</p>
            <button class="text-xs font-heading font-bold text-emerald flex items-center gap-1 hover:gap-2 transition-all" aria-label="Request {service.title} service">
              Request Service <span aria-hidden="true">→</span>
            </button>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ==================== TESTIMONIALS ==================== -->
  <section class="py-24 lg:py-32 bg-navy-mid" aria-labelledby="testimonials-heading">
    <div class="container-custom">
      <div class="text-center mb-14">
        <div class="badge mb-4">Testimonials</div>
        <h2 id="testimonials-heading" class="text-white">What Our Clients Say</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Customer testimonials">
        {#each testimonials as t, i (t.name)}
          <div class="card-premium p-8 flex flex-col" role="listitem" in:fly={{ y: 20, delay: i * 100, duration: 600 }}>
            <div class="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
              {#each [1,2,3,4,5] as star (star)}
                <svg width="16" height="16" fill="var(--color-gold)" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {/each}
            </div>
            <blockquote class="text-sm text-slate leading-relaxed flex-1 italic mb-6">{t.quote}</blockquote>
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-linear-to-br {t.gradient} flex items-center justify-center font-heading font-bold text-white text-sm"
                aria-hidden="true"
              >{t.initials}</div>
              <div>
                <div class="text-sm font-semibold text-white">{t.name}</div>
                <div class="text-xs text-slate-dim">{t.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ==================== FAQ SECTION ==================== -->
  <section class="py-24 lg:py-32 bg-navy relative overflow-hidden" aria-labelledby="faq-heading">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,166,35,0.05)_0%,transparent_50%)] pointer-events-none" aria-hidden="true"></div>

    <div class="container-custom relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div class="inline-block px-4 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest mb-6">
            Expert Support
          </div>
          <h2 id="faq-heading" class="text-white mb-4">
            Frequently Asked <span class="text-gold">Questions</span>
          </h2>
          <p class="text-slate text-lg leading-relaxed mb-10">
            Everything you need to know about the platform and how it helps your business grow securely.
          </p>

          <div class="card-premium p-6 bg-gold/5 border-gold/10 flex items-center gap-5 group cursor-pointer hover:bg-gold/10 transition-all duration-300" role="button" tabindex="0" aria-label="Contact our support team">
            <div class="text-3xl group-hover:scale-110 transition-transform" aria-hidden="true">💬</div>
            <div class="flex-1">
              <div class="text-white font-bold mb-1">Still have questions?</div>
              <div class="text-slate text-sm">Our expert team is available 24/7.</div>
            </div>
            <div class="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:translate-x-1 transition-transform" aria-hidden="true">→</div>
          </div>
        </div>

        <div>
          <Accordion items={faqItems} />
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== CTA SECTION ==================== -->
  <section class="py-20 lg:py-28 bg-navy relative overflow-hidden" aria-labelledby="cta-heading">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,200,150,0.08),transparent)] pointer-events-none" aria-hidden="true"></div>

    <div class="container-custom relative z-10">
      <div class="card-premium p-12 lg:p-20 bg-gradient-to-br from-emerald/15 to-navy-light/40 border-emerald/25 relative overflow-hidden text-center">
        <div class="absolute top-0 left-0 p-16 opacity-[0.04] pointer-events-none select-none" aria-hidden="true">
          <span class="text-[200px]">💎</span>
        </div>

        <div class="relative z-10 max-w-2xl mx-auto">
          <div class="badge mb-6 mx-auto inline-flex">Get Started Today</div>
          <h2 id="cta-heading" class="text-white mb-4">
            Ready to Transform Your <span class="grad-text">Financial Operations?</span>
          </h2>
          <p class="text-slate text-lg mb-10 leading-relaxed">
            Join 50,000+ Nigerian businesses already using FinancialAuditor. Free 30-day trial. No credit card required.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/auth" class="btn-primary py-4 px-10 text-lg w-full sm:w-auto shadow-glow" aria-label="Start your free 30-day trial, no credit card required">
              Start Free Trial — 30 Days 🚀
            </a>
            <a href="/marketplace" class="btn-secondary py-4 px-10 text-lg w-full sm:w-auto" aria-label="Browse the auditor marketplace">
              Find an Auditor 👨‍💼
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
  .hero-bg {
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,200,150,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 90% 60%, rgba(245,166,35,0.08) 0%, transparent 60%),
      var(--color-navy);
  }
  .stat-float {
    background: rgba(15, 32, 64, 0.9);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-xl);
    backdrop-filter: blur(20px);
    padding: 0.65rem 1rem;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.9rem;
    background: rgba(0,200,150,0.1);
    border: 1px solid rgba(0,200,150,0.3);
    border-radius: 999px;
    font-size: 0.72rem;
    font-family: var(--font-heading);
    font-weight: 700;
    color: var(--color-emerald);
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
  .badge-gold {
    background: rgba(245,166,35,0.1);
    border-color: rgba(245,166,35,0.3);
    color: var(--color-gold);
  }
  .card-gold {
    background: linear-gradient(135deg, rgba(245,166,35,0.12), rgba(245,166,35,0.04));
    border: 1px solid rgba(245,166,35,0.25);
  }
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
</style>
