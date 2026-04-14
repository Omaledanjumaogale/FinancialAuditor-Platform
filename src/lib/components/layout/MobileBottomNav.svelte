<script lang="ts">
  import { page } from '$app/state';
  import { 
    LayoutDashboard, 
    ShieldCheck, 
    ShoppingBag, 
    Home,
    BarChart3
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const items = [
    { name: 'Home',    icon: Home,            href: '/' },
    { name: 'Console', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Audit',   icon: ShieldCheck,     href: '/dashboard/audit' },
    { name: 'Market',  icon: ShoppingBag,     href: '/marketplace' },
    { name: 'Reports', icon: BarChart3,        href: '/dashboard/analytics' },
  ];
</script>

<nav
  class="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around shadow-[0_-4px_24px_rgba(0,0,0,0.3)]"
  style="background-color:rgba(15,32,64,0.97); backdrop-filter:blur(20px); border-top:1px solid rgba(255,255,255,0.08); padding-bottom: env(safe-area-inset-bottom, 0px);"
  aria-label="Mobile bottom navigation"
>
  {#each items as item (item.href)}
    {@const isActive = page.url.pathname === item.href}
    <a
      href={item.href}
      class={cn(
        "flex flex-col items-center justify-center gap-1 flex-1 min-h-[56px] px-1 py-2 relative touch-manipulation transition-all duration-200",
        isActive ? "text-emerald" : "text-slate-dim"
      )}
      aria-label={item.name}
      aria-current={isActive ? 'page' : undefined}
    >
      {#if isActive}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
      {/if}
      <div class={cn(
        "p-1 rounded-xl transition-all duration-200",
        isActive && "bg-emerald/10 scale-110"
      )}>
        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
      </div>
      <span class="text-[9px] font-bold uppercase tracking-widest leading-none">{item.name}</span>
    </a>
  {/each}
</nav>
