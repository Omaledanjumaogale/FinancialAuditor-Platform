<script lang="ts">
  import { Globe, Mail, Phone, MapPin, ArrowUpRight, Sparkles, MessageSquare, Terminal, Activity } from 'lucide-svelte';

  const footerLinks = {
    platform: [
      { name: 'Console Features', href: '#features' },
      { name: 'Enterprise Pricing', href: '/pricing' },
      { name: 'Auditor Marketplace', href: '/marketplace' },
      { name: 'Intelligence Dashboard', href: '/dashboard' },
      { name: 'Admin Control Hub', href: '/admin' }
    ],
    services: [
      { name: 'CAC Registration', href: '/services/cac' },
      { name: 'FIRS Tax Filing', href: '/services/tax' },
      { name: 'Foundation Setup', href: '/services/ngo' },
      { name: 'Corporate Governance', href: '/services/docs' },
      { name: 'Predictive Advisory', href: '/services/raas' }
    ],
    company: [
      { name: 'Our Mission', href: '/about' },
      { name: 'Contact Center', href: '/contact' },
      { name: 'Privacy Framework', href: '/privacy' },
      { name: 'Service Terms', href: '/terms' }
    ]
  };
</script>

<footer class="bg-muted/30 border-t border-border pt-32 pb-20 px-6 relative overflow-hidden">
  <div class="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none"></div>
  
  <div class="container-custom relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
      <!-- Brand & Mission -->
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-center gap-3 group">
          <div class="w-12 h-12 rounded-[18px] bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles size={24} />
          </div>
          <div class="flex flex-col">
            <span class="text-foreground font-heading font-black text-2xl tracking-tighter leading-none">Financial<span class="text-primary">Auditor</span></span>
            <span class="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mt-1">Enterprise Intelligence</span>
          </div>
        </div>
        <p class="text-muted-foreground font-medium text-base leading-relaxed max-w-sm">
          Nigeria's premier AI-powered financial auditing and compliance platform. We engineer trust and transparency for the modern enterprise through autonomous intelligence.
        </p>
        <div class="flex items-center gap-4">
          <button class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm">
            <MessageSquare size={18} />
          </button>
          <button class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm">
            <Terminal size={18} />
          </button>
          <button class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm">
            <Activity size={18} />
          </button>
        </div>
      </div>

      <!-- Links Column 1 -->
      <div class="space-y-8">
        <h4 class="text-foreground font-black text-xs uppercase tracking-[0.2em]">Platform</h4>
        <ul class="flex flex-col gap-5">
          {#each footerLinks.platform as link}
            <li>
              <a href={link.href} class="text-muted-foreground text-sm font-bold hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                {link.name}
                <ArrowUpRight size={12} class="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links Column 2 -->
      <div class="space-y-8">
        <h4 class="text-foreground font-black text-xs uppercase tracking-[0.2em]">Enterprise</h4>
        <ul class="flex flex-col gap-5">
          {#each footerLinks.services as link}
            <li>
              <a href={link.href} class="text-muted-foreground text-sm font-bold hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                {link.name}
                <ArrowUpRight size={12} class="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links Column 3 -->
      <div class="space-y-8">
        <h4 class="text-foreground font-black text-xs uppercase tracking-[0.2em]">Company</h4>
        <ul class="flex flex-col gap-5">
          {#each footerLinks.company as link}
            <li>
              <a href={link.href} class="text-muted-foreground text-sm font-bold hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                {link.name}
                <ArrowUpRight size={12} class="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Support & Terminal -->
      <div class="lg:col-span-1 space-y-8">
        <h4 class="text-foreground font-black text-xs uppercase tracking-[0.2em]">Regional Hub</h4>
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary shrink-0 shadow-sm">
              <MapPin size={18} />
            </div>
            <div class="text-sm font-bold text-muted-foreground">
              Yaba Intelligence Hub,<br/>
              Lagos, Nigeria.
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary shrink-0 shadow-sm">
              <Mail size={18} />
            </div>
            <div class="text-sm font-bold text-muted-foreground">
              ops@financialauditor.ng
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <span class="text-xs font-black text-muted-foreground uppercase tracking-widest">© 2026 FinancialAuditor Enterprise</span>
        <div class="flex items-center gap-6">
          <a href="/terms" class="text-[10px] font-black text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">Terms of Operations</a>
          <a href="/privacy" class="text-[10px] font-black text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">Privacy Framework</a>
        </div>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-full shadow-sm">
        <div class="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
        <span class="text-[10px] font-black text-foreground uppercase tracking-widest">All Systems Operational</span>
      </div>
    </div>
  </div>
</footer>
