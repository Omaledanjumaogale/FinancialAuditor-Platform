<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { Shield, Bell, Send, Settings, Search, LayoutDashboard, LogOut, ChevronRight, Sparkles, Activity } from 'lucide-svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import { cn } from '$lib/utils';

  let { children } = $props();

  const admin = {
    name: 'System Admin',
    role: 'Super Admin',
    status: 'Online'
  };
</script>

<div class="flex min-h-screen bg-background overflow-hidden">
  <Sidebar />
  
  <div class="flex-1 flex flex-col xl:pl-[280px] w-full transition-all duration-300">
    <Header />
    
    <main class="flex-1 overflow-y-auto w-full relative">
      <!-- Background Decorations -->
      <div class="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div class="container-custom py-10 md:py-16 relative z-10">
        <!-- Admin Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12" in:fade>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-destructive bg-destructive/5 px-3 py-1.5 rounded-full border border-destructive/10 flex items-center gap-2">
                <Shield size={12} />
                Kernel Console
              </span>
              <div class="h-1 w-1 rounded-full bg-border"></div>
              <span class="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} />
                System Health: Stable
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-heading font-black text-foreground tracking-tight">
              Platform Intelligence <span class="text-primary italic">Hub.</span>
            </h1>
            <p class="text-muted-foreground font-medium max-w-xl">Central command for 50,000+ Nigerian enterprises and verified ICAN auditor network.</p>
          </div>

          <div class="flex items-center gap-3">
            <button class="btn-secondary py-3 px-6 gap-2.5 border-destructive/20 text-destructive hover:bg-destructive/5 transition-all font-black text-xs uppercase tracking-widest group">
              <Bell size={18} class="group-hover:animate-bounce" />
              <span>Priority Alerts</span>
            </button>
            <button class="btn-primary py-3 px-6 gap-2.5 bg-foreground text-background hover:bg-foreground/90 font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10">
              <Send size={18} />
              <span>Broadcast Update</span>
            </button>
          </div>
        </div>

        <!-- Main Admin View -->
        <div in:fly={{ y: 20, duration: 600 }}>
          {@render children()}
        </div>
      </div>
    </main>
  </div>
</div>
