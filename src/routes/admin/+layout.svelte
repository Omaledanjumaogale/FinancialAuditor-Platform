<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { Shield, Bell, Send, Settings, Search, LayoutDashboard, LogOut, ChevronRight } from 'lucide-svelte';
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

<div class="flex min-h-screen bg-navy overflow-hidden">
  <Sidebar />
  
  <div class="flex-1 flex flex-col md:pl-72 w-full">
    <Header />
    
    <main class="flex-1 pt-[68px] overflow-y-auto w-full">
      <div class="container-custom py-8">
        <!-- Admin Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10" in:fade>
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-danger bg-danger/10 px-3 py-1 rounded-lg border border-danger/20">
                Admin Console 🛡️
              </span>
              <div class="h-1 w-1 rounded-full bg-white/20"></div>
              <span class="text-xs font-bold text-slate-dim uppercase tracking-widest">{admin.role}</span>
            </div>
            <h1 class="text-4xl font-heading font-black text-white tracking-tight">
              Platform Intelligence Hub <span class="text-danger animate-pulse inline-block italic">Secure</span>
            </h1>
            <p class="text-slate-dim mt-2">Managing 50,000+ Nigerian businesses and 500+ certified auditors.</p>
          </div>

          <div class="flex items-center gap-3">
            <button class="btn-secondary py-3 px-6 gap-2 border-danger/20 text-danger hover:bg-danger/10 transition-all">
              <Bell size={18} />
              <span>System Alerts</span>
            </button>
            <button class="btn-primary py-3 px-6 gap-2 bg-white text-navy hover:bg-white/90 font-black shadow-xl shadow-white/10">
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
