<script lang="ts">
  import { page } from '$app/state';
  import { LayoutDashboard, ShoppingBag, ShieldCheck, User } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const bottomNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Marketplace', icon: ShoppingBag, href: '/marketplace' },
    { name: 'AI Audit', icon: ShieldCheck, href: '/dashboard/audit' },
    { name: 'Profile', icon: User, href: '/dashboard/profile' },
  ];
</script>

<nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-surface-200 z-50 flex items-center justify-around px-2 h-16 pb-safe">
  {#each bottomNavItems as item}
    <a 
      href={item.href}
      class={cn(
        "flex flex-col items-center justify-center flex-1 gap-1 transition-all min-h-[44px] min-w-[44px]",
        page.url.pathname === item.href ? "text-brand-600" : "text-surface-400"
      )}
    >
      <item.icon size={20} class={cn(page.url.pathname === item.href && "animate-in zoom-in duration-300")} />
      <span class="text-[0.6rem] font-bold uppercase tracking-tighter">{item.name}</span>
    </a>
  {/each}
</nav>
