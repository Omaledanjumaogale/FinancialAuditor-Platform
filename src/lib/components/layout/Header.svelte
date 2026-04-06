<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { Menu, X } from 'lucide-svelte';

  let isMenuOpen = $state(false);

  const navLinks = [
    { name: '🏠 Home', href: '/' },
    { name: '📊 Dashboard', href: '/dashboard' },
    { name: '💸 Transactions', href: '/dashboard/transactions' },
    { name: '📤 Upload', href: '/dashboard/upload' },
    { name: '🤖 AI Audit', href: '/dashboard/audit' },
    { name: '📄 Reports', href: '/dashboard/reports' },
    { name: '📚 Ledger', href: '/dashboard/ledger' },
    { name: '📈 Analytics', href: '/dashboard/analytics' },
    { name: '💡 Advisory', href: '/dashboard/advisory' },
    { name: '🤝 Marketplace', href: '/marketplace' },
    { name: '🛡️ Admin', href: '/admin' },
    { name: '👤 Profile', href: '/dashboard/profile' },
    { name: '🚪 Logout', href: '/auth/logout', primary: true }
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

<header class="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
  <!-- Logo -->
  <a href="/" class="flex items-center gap-2 group">
    <div class="w-10 h-10 rounded-xl bg-emerald flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald/20 group-hover:scale-110 transition-transform">
      FA
    </div>
    <div class="flex flex-col">
      <span class="text-white font-bold text-lg leading-tight tracking-tight">FinancialAuditor</span>
      <span class="text-emerald text-[0.65rem] font-medium uppercase tracking-[0.2em]">Enterprise AI</span>
    </div>
  </a>

  <!-- Hamburger Menu Button -->
  <button 
    class="p-2 text-slate hover:text-white transition-colors z-[60]"
    onclick={toggleMenu}
    aria-label="Toggle Menu"
  >
    {#if isMenuOpen}
      <X size={28} />
    {:else}
      <Menu size={28} />
    {/if}
  </button>
</header>

<!-- Mobile/Fullscreen Overlay Menu -->
{#if isMenuOpen}
  <div 
    class="fixed inset-0 bg-navy/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center"
    transition:fade={{ duration: 200 }}
  >
    <nav class="flex flex-col items-center gap-8">
      {#each navLinks as link, i}
        <a 
          href={link.href}
          class="text-3xl font-bold tracking-tight transition-all hover:scale-105 {link.primary ? 'text-emerald' : 'text-slate hover:text-white'}"
          onclick={toggleMenu}
          in:slide={{ delay: 100 * i, duration: 400 }}
        >
          {link.name}
        </a>
      {/each}
    </nav>
    
    <div class="absolute bottom-12 text-slate-dim text-sm font-medium tracking-widest uppercase">
      FinancialAuditor v2.0
    </div>
  </div>
{/if}
