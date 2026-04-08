<script lang="ts">
  import { 
    Menu, Bell, Search, User, LogOut, 
    ChevronRight, Sparkles, Settings, 
    HelpCircle, Globe
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { page } from '$app/state';

  let { onMenuClick } = $props();

  const breadcrumbs = $derived(() => {
    const paths = page.url.pathname.split('/').filter(Boolean);
    return paths.map((path, i) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, i + 1).join('/')
    }));
  });
</script>

<div class="glass-nav sticky top-0 z-40 h-[68px] flex items-center px-4 md:px-8 w-full border-b border-white/5">
  <div class="flex items-center gap-4 flex-1">
    <!-- Mobile Menu Toggle -->
    <button 
      onclick={onMenuClick}
      class="xl:hidden p-2 text-slate-dim hover:text-white transition-colors hover:bg-white/5 rounded-lg"
    >
      <Menu size={22} />
    </button>

    <!-- Breadcrumbs (Desktop) -->
    <div class="hidden md:flex items-center gap-2 text-sm font-medium">
      <span class="text-slate-dim">Console</span>
      {#each breadcrumbs() as crumb}
        <ChevronRight size={14} class="text-slate-dim/30" />
        <a href={crumb.href} class="text-white hover:text-emerald transition-colors">{crumb.name}</a>
      {/each}
    </div>
  </div>

  <!-- Search Bar (Desktop) -->
  <div class="hidden lg:flex items-center flex-1 max-w-md mx-8">
    <div class="relative w-full group">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-emerald transition-colors" size={18} />
      <input 
        type="text" 
        placeholder="Search enterprise records..." 
        class="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-dim/50 outline-none focus:border-emerald/30 focus:bg-emerald/5 transition-all"
      />
    </div>
  </div>

  <!-- Actions -->
  <div class="flex items-center gap-3 md:gap-5">
    <!-- Language/Region -->
    <button class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-dim hover:text-white transition-all">
      <Globe size={16} />
      <span class="text-[10px] font-black uppercase tracking-widest">NGN</span>
    </button>

    <!-- Notifications -->
    <button class="relative p-2.5 text-slate-dim hover:text-white hover:bg-white/5 rounded-xl transition-all group">
      <Bell size={20} />
      <span class="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-navy group-hover:scale-110 transition-transform"></span>
    </button>

    <!-- Fiscal Year Select -->
    <div class="hidden sm:block h-8 w-[1px] bg-white/10 mx-1"></div>
    <select class="hidden sm:block bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white outline-none focus:border-emerald/30 cursor-pointer">
      <option value="2025">FY 2025</option>
      <option value="2024">FY 2024</option>
      <option value="2023">FY 2023</option>
    </select>

    <!-- User Avatar -->
    <button class="flex items-center gap-3 pl-2 group">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-105 transition-transform">
        AO
      </div>
    </button>
  </div>
</div>
