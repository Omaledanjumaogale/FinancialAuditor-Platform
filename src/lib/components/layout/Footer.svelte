<script lang="ts">
  const footerLinks = {
    platform: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Auditor Marketplace', href: '/marketplace' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Admin Panel', href: '/admin' }
    ],
    services: [
      { name: 'CAC Registration', href: '/services/cac' },
      { name: 'FIRS Tax Filing', href: '/services/tax' },
      { name: 'Foundation Setup', href: '/services/ngo' },
      { name: 'Corporate Documents', href: '/services/docs' },
      { name: 'RaaS Advisory', href: '/services/raas' }
    ]
  };
</script>

<footer class="bg-navy-mid border-t border-white/5 pt-16 pb-8 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <div class="w-10 h-10 rounded-xl bg-emerald flex items-center justify-center text-white text-xl font-bold">
            FA
          </div>
          <div class="flex flex-col">
            <span class="text-white font-bold text-lg leading-tight">FinancialAuditor</span>
            <span class="text-emerald text-[0.65rem] font-medium uppercase tracking-widest">Enterprise AI</span>
          </div>
        </div>
        <p class="text-slate-dim text-sm leading-relaxed mb-6">
          Nigeria's premier AI-powered financial auditing and compliance platform. FIRS compliant. CAC ready.
        </p>
        <div class="text-[10px] text-slate-dim font-mono uppercase tracking-widest">
          RC: 1234567 · Lagos, Nigeria
        </div>
      </div>

      <!-- Links: Platform -->
      <div>
        <h4 class="text-white font-bold text-xs uppercase tracking-widest mb-6">Platform</h4>
        <ul class="flex flex-col gap-4">
          {#each footerLinks.platform as link}
            <li>
              <a href={link.href} class="text-slate-dim text-sm hover:text-white transition-colors">
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links: Services -->
      <div>
        <h4 class="text-white font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
        <ul class="flex flex-col gap-4">
          {#each footerLinks.services as link}
            <li>
              <a href={link.href} class="text-slate-dim text-sm hover:text-white transition-colors">
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-white font-bold text-xs uppercase tracking-widest mb-6">Contact</h4>
        <ul class="flex flex-col gap-4 text-sm text-slate-dim">
          <li class="flex items-center gap-3">
            <span>📧</span>
            <a href="mailto:hello@financialauditor.ng" class="hover:text-white transition-colors">hello@financialauditor.ng</a>
          </li>
          <li class="flex items-center gap-3">
            <span>📞</span>
            <span>+234 800 FIN AUDIT</span>
          </li>
          <li class="flex items-center gap-3">
            <span>📍</span>
            <span>Victoria Island, Lagos</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-xs text-slate-dim">
        © 2026 FinancialAuditor AI Platform. All rights reserved.
      </div>
      <div class="flex gap-6 text-xs text-slate-dim">
        <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
