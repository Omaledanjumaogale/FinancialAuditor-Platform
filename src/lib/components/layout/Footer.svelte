<script lang="ts">
  import { Globe, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-svelte';

  const footerLinks = {
    platform: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Auditor Marketplace', href: '/marketplace' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Admin Hub', href: '/admin' }
    ],
    services: [
      { name: 'CAC Registration', href: '/services/cac' },
      { name: 'FIRS Tax Filing', href: '/services/tax' },
      { name: 'Foundation Setup', href: '/services/ngo' },
      { name: 'Corporate Documents', href: '/services/docs' },
      { name: 'RaaS Advisory', href: '/services/raas' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };
</script>

<footer class="bg-surface-50 border-t border-surface-200 pt-20 pb-10 px-6">
  <div class="container-custom">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
      <!-- Brand & Description -->
      <div class="lg:col-span-2">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white text-xl font-bold shadow-sm">
            FA
          </div>
          <div class="flex flex-col">
            <span class="text-surface-900 font-bold text-lg leading-tight tracking-tight font-heading">FinancialAuditor</span>
            <span class="text-brand-600 text-[0.65rem] font-bold uppercase tracking-[0.2em]">Enterprise AI</span>
          </div>
        </div>
        <p class="text-surface-500 text-sm leading-relaxed max-w-sm mb-8">
          Nigeria's premier AI-powered financial auditing and compliance platform. We help businesses stay audit-ready and compliant with FIRS and CAC regulations.
        </p>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3 text-surface-600 text-sm">
            <div class="w-8 h-8 rounded-lg bg-white border border-surface-200 flex items-center justify-center text-brand-600">
              <Mail size={16} />
            </div>
            hello@financialauditor.ewinproject.org
          </div>
          <div class="flex items-center gap-3 text-surface-600 text-sm">
            <div class="w-8 h-8 rounded-lg bg-white border border-surface-200 flex items-center justify-center text-brand-600">
              <Phone size={16} />
            </div>
            +234 800 FIN AUDIT
          </div>
        </div>
      </div>

      <!-- Links Column 1 -->
      <div>
        <h4 class="text-surface-900 font-bold text-xs uppercase tracking-widest mb-6">Platform</h4>
        <ul class="flex flex-col gap-4">
          {#each footerLinks.platform as link}
            <li>
              <a href={link.href} class="text-surface-500 text-sm hover:text-brand-600 transition-colors inline-flex items-center gap-1 group">
                {link.name}
                <ArrowUpRight size={12} class="opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links Column 2 -->
      <div>
        <h4 class="text-surface-900 font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
        <ul class="flex flex-col gap-4">
          {#each footerLinks.services as link}
            <li>
              <a href={link.href} class="text-surface-500 text-sm hover:text-brand-600 transition-colors inline-flex items-center gap-1 group">
                {link.name}
                <ArrowUpRight size={12} class="opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links Column 3 -->
      <div>
        <h4 class="text-surface-900 font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
        <ul class="flex flex-col gap-4">
          {#each footerLinks.company as link}
            <li>
              <a href={link.href} class="text-surface-500 text-sm hover:text-brand-600 transition-colors inline-flex items-center gap-1 group">
                {link.name}
                <ArrowUpRight size={12} class="opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="pt-10 border-t border-surface-200 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="text-xs text-surface-400 font-medium">
        © 2026 FinancialAuditor Nigeria. All rights reserved. RC: 1234567
      </div>
      <div class="flex items-center gap-6">
        <a href="https://financialauditor.ewinproject.org" class="text-surface-400 hover:text-brand-600 transition-colors">
          <Globe size={18} />
        </a>
        <div class="h-4 w-px bg-surface-200"></div>
        <div class="text-[10px] font-bold text-surface-400 uppercase tracking-[0.2em]">
          Built for Nigeria 🇳🇬
        </div>
      </div>
    </div>
  </div>
</footer>
