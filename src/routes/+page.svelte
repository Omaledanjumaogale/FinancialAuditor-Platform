<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import StatCard from '$lib/components/ui/StatCard.svelte';
  import FeatureCard from '$lib/components/ui/FeatureCard.svelte';
  import Accordion from '$lib/components/ui/Accordion.svelte';

  const stats = [
    { label: 'Audits Processed', value: '1.2M+', change: '12%', trend: 'up', emoji: '📈' },
    { label: 'Accuracy Rate', value: '99.98%', change: '2%', trend: 'up', emoji: '🎯' },
    { label: 'Time Saved', value: '85%', change: '5%', trend: 'up', emoji: '⚡' },
    { label: 'Active Auditors', value: '450+', change: '24', trend: 'up', emoji: '💼' }
  ];

  const features = [
    {
      title: 'AI Ledger Audit',
      description: 'Automated ingestion of complex financial records with real-time discrepancy detection and compliance mapping.',
      emoji: '🧠',
      tags: ['AUTOMATION', 'AI', 'PRECISION']
    },
    {
      title: 'Smart Compliance',
      description: 'Instant verification against Nigerian tax laws, IFRS, and local enterprise standards with automatic report generation.',
      emoji: '⚖️',
      tags: ['LEGAL', 'COMPLIANCE', 'IFRS']
    },
    {
      title: 'Fraud Detection',
      description: 'Advanced pattern recognition algorithms to identify suspicious activities and protect your organization assets.',
      emoji: '🛡️',
      tags: ['SECURITY', 'HARDENED', 'TRUST']
    },
    {
      title: 'Cloud Marketplace',
      description: 'Connect with certified auditors and financial consultants directly through our secure, transparent marketplace.',
      emoji: '🤝',
      tags: ['NETWORK', 'CERTIFIED', 'CLOUD']
    }
  ];

  const faqItems = [
    {
      question: "How secure is my financial data?",
      answer: "We use enterprise-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your data is stored in ISO 27001 compliant data centers.",
      emoji: "🔒"
    },
    {
      question: "Does it support Nigerian Tax Laws?",
      answer: "Yes, our AI models are specifically trained on FIRS guidelines and current Nigerian financial regulations to ensure 100% compliance.",
      emoji: "🇳🇬"
    },
    {
      question: "Can I invite my existing auditor?",
      answer: "Absolutely. You can invite your auditor to join the platform as a collaborator, giving them secure access to your audited records.",
      emoji: "👨‍💼"
    }
  ];
</script>

<div class="flex flex-col min-h-screen">
  <!-- HERO SECTION -->
  <section class="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
    <!-- Premium Background -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,200,150,0.12)_0%,transparent_70%)]"></div>
      <div class="absolute inset-0 grid-pattern opacity-10"></div>
    </div>

    <div class="container-custom relative z-10">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div 
          class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-[10px] font-black tracking-[0.3em] uppercase mb-4"
          in:fly={{ y: 20, duration: 800 }}
        >
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald"></span>
          </span>
          Enterprise Intelligence for Nigeria
        </div>

        <h1 
          class="text-white leading-[1.1] font-heading font-black tracking-tight"
          in:fly={{ y: 30, delay: 200, duration: 800 }}
        >
          Automate Your <span class="grad-text">Financial Audits</span> with AI
        </h1>

        <p 
          class="text-xl text-slate max-w-2xl mx-auto leading-relaxed"
          in:fly={{ y: 30, delay: 400, duration: 800 }}
        >
          The most advanced AI-powered platform for auditing, compliance, and ledger management designed specifically for Nigerian enterprises.
        </p>

        <div 
          class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          in:fly={{ y: 30, delay: 600, duration: 800 }}
        >
          <a href="/auth" class="btn-primary py-5 px-10 text-lg w-full sm:w-auto shadow-glow group">
            <span class="text-2xl group-hover:scale-125 transition-transform duration-300">🚀</span>
            Start Your Free Trial
          </a>
          <a href="#how-it-works" class="btn-secondary py-5 px-10 text-lg w-full sm:w-auto group">
            <span class="text-2xl group-hover:rotate-12 transition-transform duration-300">📖</span>
            Watch Demo
          </a>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
        {#each stats as stat, i}
          <StatCard {...stat} delay={800 + (i * 100)} />
        {/each}
      </div>
    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section id="features" class="py-32 bg-navy-light/30 relative">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <h4 class="text-emerald text-[10px] font-black uppercase tracking-[0.4em]">The Intelligence Layer</h4>
        <h2 class="text-white font-heading font-black">Everything you need for <span class="text-emerald">compliance</span></h2>
        <p class="text-slate text-lg">Powerful features built to handle the complexities of Nigerian financial regulations and enterprise standards.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each features as feature, i}
          <FeatureCard {...feature} delay={200 + (i * 100)} />
        {/each}
      </div>
    </div>
  </section>

  <!-- FAQ SECTION -->
  <section class="py-32 relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,166,35,0.05)_0%,transparent_50%)]"></div>
    
    <div class="container-custom relative z-10">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <div class="space-y-8">
          <div class="inline-block px-4 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest">
            Expert Support
          </div>
          <h2 class="text-white font-heading font-black text-5xl leading-tight">Frequently Asked <span class="text-gold">Questions</span></h2>
          <p class="text-slate text-xl leading-relaxed">Everything you need to know about the platform and how it helps your business grow securely.</p>
          
          <div class="p-8 card-premium bg-gold/5 border-gold/10 flex items-center gap-6 group cursor-pointer hover:bg-gold/10 transition-all duration-300">
            <div class="text-4xl group-hover:scale-110 transition-transform">💬</div>
            <div>
              <div class="text-white font-bold text-lg mb-1">Still have questions?</div>
              <div class="text-slate text-sm">Our expert team is here to help you 24/7.</div>
            </div>
            <div class="ml-auto w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:translate-x-2 transition-transform">
              →
            </div>
          </div>
        </div>

        <div>
          <Accordion items={faqItems} />
        </div>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="py-24 relative">
    <div class="container-custom">
      <div class="card-premium p-12 md:p-20 bg-gradient-to-br from-emerald/20 to-navy-light/50 border-emerald/30 relative overflow-hidden text-center">
        <div class="absolute top-0 left-0 p-20 opacity-10 pointer-events-none">
          <span class="text-[200px] select-none">💎</span>
        </div>
        
        <div class="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 class="text-white font-heading font-black text-5xl">Ready to transform your <span class="text-emerald">audit cycle?</span></h2>
          <p class="text-slate text-xl">Join hundreds of Nigerian enterprises already using FinancialAuditor to secure their future.</p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/auth" class="btn-primary py-5 px-12 text-xl w-full sm:w-auto shadow-glow">
              Get Started Now 🚀
            </a>
            <a href="/marketplace" class="btn-secondary py-5 px-12 text-xl w-full sm:w-auto">
              Find an Auditor 👨‍💼
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
</style>
