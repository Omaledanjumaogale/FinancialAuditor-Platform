<script lang="ts">
  import { page } from '$app/state';
  import { Home, LayoutDashboard, ShieldCheck, ShoppingBag } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const items = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Console', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Audit', icon: ShieldCheck, href: '/dashboard/audit' },
    { name: 'Market', icon: ShoppingBag, href: '/marketplace' },
  ];
</script>

<div class="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-xl border-t border-white/10 px-6 pb-6 pt-3 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.2)]">
  {#each items as item}
    <a 
      href={item.href} 
      class={cn(
        "flex flex-col items-center gap-1.5 transition-all duration-300 relative",
        page.url.pathname === item.href ? "text-emerald" : "text-slate-dim hover:text-white"
      )}
    >
      {#if page.url.pathname === item.href}
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald rounded-full shadow-[0_0_8px_rgba(0,200,150,0.4)]"></div>
      {/if}
      <div class={cn(
        "p-1 rounded-xl transition-all duration-300",
        page.url.pathname === item.href && "bg-emerald/5 scale-110"
      )}>
        <item.icon size={22} strokeWidth={page.url.pathname === item.href ? 2.5 : 2} />
      </div>
      <span class="text-[10px] font-black uppercase tracking-widest leading-none">{item.name}</span>
    </a>
  {/each}
</div>
