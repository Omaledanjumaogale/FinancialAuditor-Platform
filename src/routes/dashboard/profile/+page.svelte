<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    User, Mail, ShieldCheck, Bell, CreditCard, Lock, 
    ChevronRight, Save, Camera, Smartphone, Globe,
    Sparkles, BadgeCheck, Zap, Activity, Settings
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  let activeTab = $state<'profile' | 'security' | 'billing' | 'notifications'>('profile');
  let isSaving = $state(false);

  function handleSave() {
    isSaving = true;
    setTimeout(() => isSaving = false, 1500);
  }
</script>

<div class="space-y-10 pb-20" in:fade>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
        <Settings size={12} />
        Platform Configuration
      </div>
      <h1 class="text-3xl md:text-4xl font-heading font-black text-foreground tracking-tight">Account Intelligence</h1>
      <p class="text-muted-foreground font-medium">Manage your personal identity and enterprise platform credentials.</p>
    </div>
    <div class="flex items-center gap-3">
      <button 
        class="btn-primary py-3 px-8 flex items-center gap-2 shadow-xl shadow-primary/10 disabled:opacity-50"
        onclick={handleSave}
        disabled={isSaving}
      >
        {#if isSaving}
          <Activity size={18} class="animate-spin" />
          Synchronizing...
        {:else}
          <Save size={18} />
          Save Changes
        {/if}
      </button>
    </div>
  </div>

  <div class="grid lg:grid-cols-4 gap-10">
    <!-- Sophisticated Sidebar Tabs -->
    <div class="lg:col-span-1 space-y-1.5">
      <div class="px-3 mb-4">
        <span class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Settings Menu</span>
      </div>
      <button 
        class={cn(
          "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'profile' ? "bg-primary/5 text-primary border-primary/20 shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent"
        )}
        onclick={() => activeTab = 'profile'}
      >
        <div class="flex items-center gap-3.5">
          <User size={18} />
          <span>Profile Identity</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform", activeTab === 'profile' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>
      <button 
        class={cn(
          "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'security' ? "bg-primary/5 text-primary border-primary/20 shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent"
        )}
        onclick={() => activeTab = 'security'}
      >
        <div class="flex items-center gap-3.5">
          <ShieldCheck size={18} />
          <span>Security & Privacy</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform", activeTab === 'security' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>
      <button 
        class={cn(
          "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'billing' ? "bg-primary/5 text-primary border-primary/20 shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent"
        )}
        onclick={() => activeTab = 'billing'}
      >
        <div class="flex items-center gap-3.5">
          <CreditCard size={18} />
          <span>Billing Hub</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform", activeTab === 'billing' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>
      <button 
        class={cn(
          "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'notifications' ? "bg-primary/5 text-primary border-primary/20 shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent"
        )}
        onclick={() => activeTab = 'notifications'}
      >
        <div class="flex items-center gap-3.5">
          <Bell size={18} />
          <span>Alert Preferences</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform", activeTab === 'notifications' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>
    </div>

    <!-- Main Content Console -->
    <div class="lg:col-span-3">
      <div class="card-premium p-10 bg-background/50 backdrop-blur-xl border-border/50 shadow-2xl shadow-black/[0.02]">
        {#if activeTab === 'profile'}
          <div class="space-y-10" in:fly={{ y: 10, duration: 400 }}>
            <!-- Avatar Section -->
            <div class="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-border">
              <div class="relative group">
                <div class="w-28 h-28 rounded-[36px] bg-muted flex items-center justify-center text-4xl font-black text-primary border-2 border-transparent group-hover:border-primary transition-all duration-500 shadow-xl shadow-black/[0.02] overflow-hidden">
                  AO
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={24} class="text-primary" />
                  </div>
                </div>
                <button class="absolute -bottom-2 -right-2 p-2.5 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                  <Camera size={18} />
                </button>
              </div>
              <div class="text-center md:text-left space-y-2">
                <h3 class="text-2xl font-heading font-black text-foreground tracking-tight">Adaeze Okonkwo</h3>
                <p class="text-muted-foreground font-semibold">CEO & Founder at E-WIN Applications · Lagos, Nigeria</p>
                <div class="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                  <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
                    Pro Enterprise Plan <Sparkles size={10} />
                  </span>
                  <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border">UID: AUD-8429-NG</span>
                </div>
              </div>
            </div>

            <!-- Form Fields -->
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-2.5">
                <label for="full-name" class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Legal Identity</label>
                <input 
                  id="full-name"
                  type="text" 
                  value="Adaeze Okonkwo"
                  class="w-full bg-muted/50 border border-transparent rounded-2xl py-4 px-5 text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all"
                />
              </div>
              <div class="space-y-2.5">
                <label for="email" class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Platform Email</label>
                <input 
                  id="email"
                  type="email" 
                  value="adaeze@ewinproject.org"
                  class="w-full bg-muted/50 border border-transparent rounded-2xl py-4 px-5 text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all"
                />
              </div>
              <div class="space-y-2.5">
                <label for="company" class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Enterprise Name</label>
                <input 
                  id="company"
                  type="text" 
                  value="E-WIN Applications Limited"
                  class="w-full bg-muted/50 border border-transparent rounded-2xl py-4 px-5 text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all"
                />
              </div>
              <div class="space-y-2.5">
                <label for="phone" class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Contact Terminal</label>
                <input 
                  id="phone"
                  type="text" 
                  value="+234 810 000 0000"
                  class="w-full bg-muted/50 border border-transparent rounded-2xl py-4 px-5 text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30 transition-all"
                />
              </div>
            </div>

            <!-- Enterprise Capabilities -->
            <div class="pt-10 border-t border-border">
              <div class="flex items-center gap-3 mb-6">
                <BadgeCheck size={20} class="text-primary" />
                <h4 class="text-sm font-black uppercase tracking-widest">Platform Privileges</h4>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 bg-muted/30 rounded-3xl border border-transparent hover:border-border transition-all space-y-4 group">
                  <div class="flex items-center gap-4 text-foreground font-bold text-sm">
                    <div class="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <Smartphone size={18} />
                    </div>
                    Multi-Terminal Ready 📱
                  </div>
                  <div class="flex items-center gap-4 text-foreground font-bold text-sm">
                    <div class="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <Globe size={18} />
                    </div>
                    Regional Compliance 🌍
                  </div>
                </div>
                <div class="p-6 bg-muted/30 rounded-3xl border border-transparent hover:border-border transition-all space-y-4 group">
                  <div class="flex items-center gap-4 text-foreground font-bold text-sm">
                    <div class="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <ShieldCheck size={18} />
                    </div>
                    Kernel Encryption 🛡️
                  </div>
                  <div class="flex items-center gap-4 text-foreground font-bold text-sm">
                    <div class="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <Lock size={18} />
                    </div>
                    Immutable Audit Trail 📜
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else if activeTab === 'billing'}
          <div class="space-y-10" in:fly={{ y: 10, duration: 400 }}>
            <div class="card-premium p-10 bg-foreground text-background relative overflow-hidden group">
              <div class="absolute -right-12 -bottom-12 text-9xl opacity-[0.05] transform group-hover:scale-110 transition-transform duration-700">💎</div>
              <div class="relative z-10 space-y-6">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                  Active Subscription
                </div>
                <div class="space-y-1">
                  <h3 class="text-4xl font-heading font-black text-white tracking-tight">Enterprise Pro</h3>
                  <p class="text-muted-foreground font-medium">Your next billing cycle executes on <span class="text-white font-black">April 15, 2026</span></p>
                </div>
                <div class="flex gap-4 pt-4">
                  <button class="btn-primary py-4 px-10 text-sm bg-white text-foreground hover:bg-white/90 shadow-2xl shadow-black/20 font-black uppercase tracking-widest">Manage Billing</button>
                  <button class="btn-secondary py-4 px-10 text-sm border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest">Upgrade Tier</button>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <h4 class="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Payment Infrastructure</h4>
              <div class="p-6 bg-muted/30 rounded-[32px] border border-border flex items-center justify-between group hover:border-primary/20 transition-all">
                <div class="flex items-center gap-6">
                  <div class="w-16 h-10 bg-background rounded-xl flex items-center justify-center font-black text-xs text-muted-foreground border border-border shadow-sm group-hover:text-primary group-hover:border-primary/30 transition-all tracking-tighter">VISA</div>
                  <div>
                    <div class="text-sm font-black text-foreground">Corporate Visa · Ending 4242</div>
                    <div class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Authorized Exp: 12/26</div>
                  </div>
                </div>
                <button class="text-xs font-black text-primary uppercase tracking-[0.2em] hover:text-primary/70 transition-colors">Edit Card</button>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
