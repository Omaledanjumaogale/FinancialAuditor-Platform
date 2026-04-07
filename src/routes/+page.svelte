<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import SEO from '$lib/components/SEO.svelte';
  import { 
    CheckCircle2, 
    ShieldCheck, 
    ArrowRight, 
    BarChart3, 
    Bot, 
    FileText, 
    Users, 
    Zap,
    Lock,
    Globe
  } from 'lucide-svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const features = [
    {
      icon: Bot,
      title: 'AI Audit Engine',
      description: 'Multimodal AI (OCR + NLP + ML) extracts, categorizes, and audits 100+ document formats with 99.7% accuracy.',
      tags: ['OCR', 'Fraud Detection', 'Auto-Reconcile'],
      color: 'brand'
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'AI delivers performance advisory — revenue forecasting, cost optimization, and EBITDA projections in real-time.',
      tags: ['Forecasting', 'KPI Tracking', 'Benchmarks'],
      color: 'accent'
    },
    {
      icon: FileText,
      title: 'FIRS & CAC Compliance',
      description: 'Auto-generates FIRS-ready tax filings, VAT calculations, and CAC-compliant financial statements instantly.',
      tags: ['FIRS Ready', 'VAT/Tax', 'CAC Reports'],
      color: 'info'
    },
    {
      icon: Users,
      title: 'Auditor Marketplace',
      description: 'Connect with 500+ ICAN-certified professional auditors. Our bid-based system ensures competitive pricing.',
      tags: ['ICAN Certified', 'Bid System', 'Vetted'],
      color: 'info'
    },
    {
      icon: Zap,
      title: 'Smart Document Upload',
      description: 'Drag-and-drop interface supports invoices, receipts, and bank statements. AI auto-classifies and extracts data.',
      tags: ['Drag & Drop', '100+ Formats', 'Blockchain Trail'],
      color: 'brand'
    },
    {
      icon: ShieldCheck,
      title: 'RaaS Advisory Engine',
      description: 'Results-as-a-Service. AI simulates business scenarios and delivers Monthly Growth Packs with playbooks.',
      tags: ['Growth Packs', 'ROI Tracking', 'Guaranteed'],
      color: 'danger'
    }
  ];

  const stats = [
    { label: 'Businesses Served', value: '50,000+', sub: 'Active SMEs' },
    { label: 'Value Audited', value: '₦2.1B+', sub: 'Processed in 2025' },
    { label: 'Certified Auditors', value: '500+', sub: 'ICAN Registered' },
    { label: 'Accuracy Rate', value: '99.7%', sub: 'AI Precision' }
  ];
</script>

<SEO 
  title="Home" 
  description="FinancialAuditor - Nigeria's #1 AI-Powered Financial Intelligence Platform for SMEs and Corporations. FIRS-compliant. CAC-ready." 
/>

<!-- HERO SECTION -->
<section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
  <!-- Background Pattern -->
  <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
    <div class="absolute inset-0" style="background-image: radial-gradient(#059669 1px, transparent 1px); background-size: 40px 40px;"></div>
  </div>

  <div class="container-custom relative z-10">
    <div class="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
      {#if visible}
        <div in:fly={{ y: 20, duration: 600 }}>
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
            </span>
            Nigeria's #1 AI Financial Intelligence Platform
          </div>
          
          <h1 class="mb-8 leading-[1.1]">
            Financial Intelligence <br/>
            <span class="grad-text">Reimagined with AI.</span>
          </h1>
          
          <p class="text-surface-500 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Automate your auditing, ensure 100% compliance, and unlock predictive insights. Purpose-built for the Nigerian business ecosystem.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="/auth/signup" class="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
              Start Free Trial
              <ArrowRight size={20} class="ml-2" />
            </a>
            <a href="#features" class="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
              Explore Features
            </a>
          </div>
          
          <div class="flex flex-wrap items-center justify-center gap-8 text-surface-400">
            <div class="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 size={18} class="text-brand-600" />
              FIRS Compliant
            </div>
            <div class="flex items-center gap-2 text-sm font-medium">
              <Lock size={18} class="text-brand-600" />
              Bank-Grade Security
            </div>
            <div class="flex items-center gap-2 text-sm font-medium">
              <Globe size={18} class="text-brand-600" />
              CAC Integrated
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- DASHBOARD PREVIEW MOCKUP -->
    {#if visible}
      <div in:fly={{ y: 40, delay: 300, duration: 800 }} class="relative max-w-5xl mx-auto">
        <div class="card-premium overflow-hidden p-2 bg-surface-50">
          <div class="bg-white rounded-lg shadow-sm border border-surface-200 overflow-hidden">
            <!-- Mockup Toolbar -->
            <div class="flex items-center gap-2 px-4 py-3 border-b border-surface-100 bg-surface-50/50">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-danger/20"></div>
                <div class="w-3 h-3 rounded-full bg-warning/20"></div>
                <div class="w-3 h-3 rounded-full bg-success/20"></div>
              </div>
              <div class="flex-1 max-w-xs mx-auto bg-white border border-surface-200 rounded px-3 py-1 text-[10px] text-surface-400 font-mono text-center">
                app.financialauditor.ewinproject.org/dashboard
              </div>
            </div>
            <!-- Mockup Content -->
            <div class="p-6 lg:p-10">
              <div class="grid grid-cols-3 gap-6 mb-10">
                {#each Array(3) as _, i}
                  <div class="h-24 rounded-xl bg-surface-50 border border-surface-100 animate-pulse" style="animation-delay: {i * 100}ms"></div>
                {/each}
              </div>
              <div class="h-64 rounded-xl bg-surface-50 border border-surface-100 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="absolute -top-6 -right-6 lg:-right-12 animate-float">
          <div class="bg-white p-4 rounded-2xl shadow-xl border border-surface-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <div class="text-[10px] font-bold text-surface-400 uppercase tracking-widest">AI Insight</div>
              <div class="text-xs font-bold text-surface-900">Optimization Found</div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- STATS SECTION -->
<section class="py-20 border-y border-surface-100 bg-surface-50/30">
  <div class="container-custom">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
      {#each stats as stat}
        <div class="text-center group">
          <div class="text-4xl lg:text-5xl font-heading font-extrabold text-surface-900 mb-2 group-hover:scale-105 transition-transform duration-300">
            {stat.value}
          </div>
          <div class="text-sm font-bold text-brand-600 uppercase tracking-widest mb-1">{stat.label}</div>
          <div class="text-xs text-surface-400 font-medium">{stat.sub}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FEATURES SECTION -->
<section id="features" class="py-24 lg:py-32 bg-white">
  <div class="container-custom">
    <div class="max-w-3xl mb-20">
      <div class="inline-flex items-center px-4 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-bold uppercase tracking-widest mb-6">
        Platform Excellence
      </div>
      <h2 class="mb-6">Everything you need to <span class="grad-text">scale with confidence.</span></h2>
      <p class="text-surface-500 text-lg leading-relaxed">
        We've combined deep financial expertise with state-of-the-art AI to build a platform that handles the complexity of Nigerian business operations.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="card-premium p-8 group flex flex-col h-full">
          <div class="w-14 h-14 rounded-2xl bg-surface-50 flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
            <feature.icon size={32} strokeWidth={1.5} />
          </div>
          <h3 class="text-xl font-bold mb-4">{feature.title}</h3>
          <p class="text-surface-500 text-sm leading-relaxed mb-8 flex-1">
            {feature.description}
          </p>
          <div class="flex flex-wrap gap-2 mt-auto pt-6 border-t border-surface-50">
            {#each feature.tags as tag}
              <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-surface-50 text-surface-500 border border-surface-100">
                {tag}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA SECTION -->
<section class="py-24 lg:py-32">
  <div class="container-custom">
    <div class="relative rounded-[2rem] overflow-hidden bg-surface-900 p-10 lg:p-20 text-center">
      <!-- Decorative circles -->
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl"></div>

      <div class="relative z-10 max-w-2xl mx-auto">
        <h2 class="text-white mb-8">Ready to transform your financial operations?</h2>
        <p class="text-surface-400 text-lg mb-12">
          Join 50,000+ Nigerian businesses already auditing smarter with FinancialAuditor.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/auth/signup" class="btn-primary px-10 py-4 text-lg w-full sm:w-auto bg-brand-500 hover:bg-brand-600">
            Get Started Now
          </a>
          <a href="/contact" class="px-10 py-4 text-white font-semibold hover:text-brand-400 transition-colors w-full sm:w-auto">
            Talk to Sales
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(h1, h2, h3) {
    font-family: 'Syne', sans-serif;
  }
</style>
