<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { User, Mail, ShieldCheck, Bell, CreditCard, Lock, ChevronRight, Save, Camera, Smartphone, Globe } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  let activeTab = $state<'profile' | 'security' | 'billing' | 'notifications'>('profile');
</script>

<div class="space-y-8" in:fade>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-heading font-black text-white">Account Settings 👤</h1>
      <p class="text-slate-dim">Manage your profile, security, and enterprise subscription.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-primary py-2.5 px-6 flex items-center gap-2">
        <Save size={18} />
        Save Changes
      </button>
    </div>
  </div>

  <div class="grid lg:grid-cols-4 gap-8">
    <!-- Sidebar Tabs -->
    <div class="lg:col-span-1 space-y-2">
      <button 
        class={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm border border-transparent",
          activeTab === 'profile' ? "bg-emerald/10 text-white border-emerald/20 shadow-lg shadow-emerald/5" : "text-slate-dim hover:bg-white/5 hover:text-white"
        )}
        onclick={() => activeTab = 'profile'}
      >
        <span>👤 Profile Information</span>
      </button>
      <button 
        class={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm border border-transparent",
          activeTab === 'security' ? "bg-emerald/10 text-white border-emerald/20 shadow-lg shadow-emerald/5" : "text-slate-dim hover:bg-white/5 hover:text-white"
        )}
        onclick={() => activeTab = 'security'}
      >
        <span>🛡️ Security & Privacy</span>
      </button>
      <button 
        class={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm border border-transparent",
          activeTab === 'billing' ? "bg-emerald/10 text-white border-emerald/20 shadow-lg shadow-emerald/5" : "text-slate-dim hover:bg-white/5 hover:text-white"
        )}
        onclick={() => activeTab = 'billing'}
      >
        <span>💳 Billing & Subscription</span>
      </button>
      <button 
        class={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm border border-transparent",
          activeTab === 'notifications' ? "bg-emerald/10 text-white border-emerald/20 shadow-lg shadow-emerald/5" : "text-slate-dim hover:bg-white/5 hover:text-white"
        )}
        onclick={() => activeTab = 'notifications'}
      >
        <span>🔔 Notification Preferences</span>
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="lg:col-span-3">
      <div class="card-premium p-8 bg-navy-mid/50 backdrop-blur-xl">
        {#if activeTab === 'profile'}
          <div class="space-y-8" in:fade>
            <div class="flex items-center gap-6 pb-8 border-b border-white/5">
              <div class="relative group">
                <div class="w-24 h-24 rounded-3xl bg-emerald/20 text-emerald flex items-center justify-center text-4xl font-bold border-2 border-emerald/20 group-hover:border-emerald transition-all shadow-xl shadow-emerald/10">
                  AO
                </div>
                <button class="absolute -bottom-2 -right-2 p-2 bg-emerald text-navy rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 class="text-xl font-heading font-bold text-white mb-1">Adaeze Okonkwo</h3>
                <p class="text-sm text-slate-dim mb-2">CEO at E-WIN Applications · Lagos, Nigeria</p>
                <div class="flex gap-2">
                  <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg bg-emerald text-navy">Pro Plan Member 💎</span>
                  <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg bg-white/5 text-slate-dim border border-white/10">ID: AUD-8429-NG</span>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 pt-4">
              <div class="space-y-2">
                <label for="full-name" class="text-xs font-bold text-slate-dim uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  id="full-name"
                  type="text" 
                  value="Adaeze Okonkwo"
                  class="w-full bg-navy border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50"
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="text-xs font-bold text-slate-dim uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  value="adaeze@ewinproject.org"
                  class="w-full bg-navy border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50"
                />
              </div>
              <div class="space-y-2">
                <label for="company" class="text-xs font-bold text-slate-dim uppercase tracking-widest ml-1">Company Name</label>
                <input 
                  id="company"
                  type="text" 
                  value="E-WIN Applications"
                  class="w-full bg-navy border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50"
                />
              </div>
              <div class="space-y-2">
                <label for="phone" class="text-xs font-bold text-slate-dim uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  id="phone"
                  type="text" 
                  value="+234 810 000 0000"
                  class="w-full bg-navy border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald/50"
                />
              </div>
            </div>

            <div class="pt-8 border-t border-white/5">
              <h4 class="text-lg font-heading font-bold text-white mb-4">Enterprise Details</h4>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="p-4 bg-navy rounded-2xl border border-white/5 space-y-4">
                  <div class="flex items-center gap-3 text-slate-dim text-sm">
                    <Smartphone size={18} class="text-emerald" /> Mobile-Ready Platform 📱
                  </div>
                  <div class="flex items-center gap-3 text-slate-dim text-sm">
                    <Globe size={18} class="text-emerald" /> Multi-Region Compliance 🌍
                  </div>
                </div>
                <div class="p-4 bg-navy rounded-2xl border border-white/5 space-y-4">
                  <div class="flex items-center gap-3 text-slate-dim text-sm">
                    <ShieldCheck size={18} class="text-emerald" /> Enterprise Data Security 🛡️
                  </div>
                  <div class="flex items-center gap-3 text-slate-dim text-sm">
                    <Lock size={18} class="text-emerald" /> Immutable Audit Trail 📜
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else if activeTab === 'billing'}
          <div class="space-y-8" in:fade>
            <div class="card-premium p-8 bg-linear-to-br from-emerald/20 to-navy border-emerald/20 relative overflow-hidden group">
              <div class="absolute -right-12 -bottom-12 text-9xl opacity-10 transform group-hover:scale-110 transition-transform">💎</div>
              <div class="relative z-10">
                <div class="text-xs font-heading font-bold text-emerald mb-2 uppercase tracking-widest">Current Subscription</div>
                <h3 class="text-3xl font-heading font-black text-white mb-2">Pro Plan</h3>
                <p class="text-slate-dim mb-6">Your next billing date is <span class="text-white font-bold">April 15, 2026</span></p>
                <div class="flex gap-4">
                  <button class="btn-primary py-2.5 px-6">Manage Billing</button>
                  <button class="btn-secondary py-2.5 px-6 border-white/20 text-white">Upgrade Plan</button>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-lg font-heading font-bold text-white">Payment Methods</h4>
              <div class="p-6 bg-navy rounded-2xl border border-white/5 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-8 bg-white/5 rounded flex items-center justify-center font-bold text-xs text-slate-dim border border-white/10">VISA</div>
                  <div>
                    <div class="text-sm font-bold text-white">Visa ending in 4242</div>
                    <div class="text-[10px] text-slate-dim uppercase font-bold tracking-widest">Expires 12/26</div>
                  </div>
                </div>
                <button class="text-slate-dim hover:text-white text-xs font-bold uppercase tracking-widest">Edit</button>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
