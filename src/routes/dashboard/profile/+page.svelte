<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    User, Mail, ShieldCheck, Bell, CreditCard, Lock, 
    ChevronRight, Save, Camera, Smartphone, Globe,
    Sparkles, BadgeCheck, Zap, Activity, Settings,
    ArrowRight, Loader2, CheckCircle2, LogOut, Building, Phone
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { auth } from '$lib/firebase';
  import { updateProfile, signOut } from 'firebase/auth';
  import { useQuery, useConvexClient } from "convex-svelte";
  import { api } from "$convex/_generated/api";
  import { goto } from '$app/navigation';

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const client = useConvexClient();

  let name = $state('');
  let email = $state('');
  let isSaving = $state(false);
  let success = $state(false);

  $effect(() => {
    if (currentUser) {
      name = currentUser.name || '';
      email = currentUser.email || '';
    }
  });

  async function handleSave() {
    if (!currentUser || !authState.user) return;
    isSaving = true;
    success = false;

    try {
      // Update Firebase Profile
      await updateProfile(authState.user, { displayName: name });
      
      // Update Convex
      await client.mutation(api.users.store, {
        uid: authState.user.uid,
        email: email,
        name: name,
        role: currentUser.role,
        plan: currentUser.plan,
        isVerified: currentUser.isVerified
      });

      success = true;
      setTimeout(() => success = false, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      isSaving = false;
    }
  }

  async function handleLogout() {
    await signOut(auth);
    goto('/auth');
  }
</script>

<div class="space-y-10 pb-20 relative z-10 w-full" in:fade>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div class="space-y-2">
      <div class="flex items-center gap-3 text-[10px] font-black text-emerald uppercase tracking-[0.3em] mb-1">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
        </span>
        Platform Configuration
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">Account <span class="text-emerald">Intelligence</span></h1>
      <p class="text-slate text-lg font-medium max-w-2xl">Manage your personal identity and enterprise platform credentials.</p>
    </div>
    <div class="flex items-center gap-4">
      <button 
        class="btn-primary py-3.5 px-10 text-xs flex items-center gap-3 shadow-glow group disabled:opacity-50 active:scale-95 transition-all"
        onclick={handleSave}
        disabled={isSaving}
      >
        {#if isSaving}
          <Activity size={18} class="animate-spin" />
          Synchronizing...
        {:else}
          <span class="text-lg group-hover:scale-125 transition-transform duration-300">💾</span>
          Save Changes
        {/if}
      </button>
    </div>
  </div>

  <div class="grid lg:grid-cols-4 gap-10">
    <!-- Sophisticated Sidebar Tabs -->
    <div class="lg:col-span-1 space-y-2">
      <div class="px-4 mb-4">
        <span class="text-[10px] font-black text-slate-dim uppercase tracking-[0.3em]">Settings Menu</span>
      </div>
      
      <button 
        class={cn(
          "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'profile' ? "bg-emerald/10 text-emerald border-emerald/20 shadow-sm" : "text-slate-dim hover:bg-white/5 hover:text-white border-transparent"
        )}
        onclick={() => activeTab = 'profile'}
      >
        <div class="flex items-center gap-4">
          <span class="text-xl group-hover:scale-110 transition-transform">👤</span>
          <span>Profile Identity</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform duration-300", activeTab === 'profile' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>

      <button 
        class={cn(
          "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'security' ? "bg-emerald/10 text-emerald border-emerald/20 shadow-sm" : "text-slate-dim hover:bg-white/5 hover:text-white border-transparent"
        )}
        onclick={() => activeTab = 'security'}
      >
        <div class="flex items-center gap-4">
          <span class="text-xl group-hover:scale-110 transition-transform">🛡️</span>
          <span>Security & Privacy</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform duration-300", activeTab === 'security' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>

      <button 
        class={cn(
          "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'billing' ? "bg-emerald/10 text-emerald border-emerald/20 shadow-sm" : "text-slate-dim hover:bg-white/5 hover:text-white border-transparent"
        )}
        onclick={() => activeTab = 'billing'}
      >
        <div class="flex items-center gap-4">
          <span class="text-xl group-hover:scale-110 transition-transform">💳</span>
          <span>Billing Hub</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform duration-300", activeTab === 'billing' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>

      <button 
        class={cn(
          "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm border group",
          activeTab === 'notifications' ? "bg-emerald/10 text-emerald border-emerald/20 shadow-sm" : "text-slate-dim hover:bg-white/5 hover:text-white border-transparent"
        )}
        onclick={() => activeTab = 'notifications'}
      >
        <div class="flex items-center gap-4">
          <span class="text-xl group-hover:scale-110 transition-transform">🔔</span>
          <span>Notifications</span>
        </div>
        <ChevronRight size={14} class={cn("transition-transform duration-300", activeTab === 'notifications' ? "rotate-90" : "opacity-0 group-hover:opacity-100")} />
      </button>
    </div>

    <!-- Content Area -->
    <div class="lg:col-span-3 space-y-8">
      {#if activeTab === 'profile'}
        <div class="card-premium p-10 bg-surface/40 backdrop-blur-sm space-y-12" in:fly={{ y: 20 }}>
          <div class="flex flex-col md:flex-row items-center gap-10">
            <div class="relative group cursor-pointer">
              <div class="w-32 h-32 rounded-[40px] bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-5xl group-hover:bg-white/10 group-hover:border-emerald/40 transition-all duration-500 overflow-hidden">
                👩‍💼
              </div>
              <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald text-white flex items-center justify-center shadow-glow-sm border-4 border-navy group-hover:scale-110 transition-transform">
                <Camera size={18} />
              </div>
            </div>
            <div class="flex-1 space-y-4 text-center md:text-left">
              <h3 class="text-2xl font-heading font-black text-white tracking-tight">Adaeze Okonkwo</h3>
              <p class="text-slate text-sm font-medium">Enterprise Administrator · ICAN Certified Auditor</p>
              <div class="flex flex-wrap justify-center md:justify-start gap-3">
                <span class="px-3 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 text-[10px] font-black uppercase tracking-widest">Verified Expert</span>
                <span class="px-3 py-1 rounded-lg bg-white/5 text-slate-dim border border-white/10 text-[10px] font-black uppercase tracking-widest">Premium Plan</span>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
            <div class="space-y-2">
              <label for="fullName" class="form-label">Full Legal Name</label>
              <input type="text" id="fullName" class="form-input" bind:value={name} />
            </div>
            <div class="space-y-2">
              <label for="professionalRole" class="form-label">Professional Role</label>
              <input type="text" id="professionalRole" class="form-input" value="Senior Financial Auditor" readonly />
            </div>
            <div class="space-y-2">
              <label for="corporateEmail" class="form-label">Corporate Email</label>
              <input type="email" id="corporateEmail" class="form-input" bind:value={email} />
            </div>
            <div class="space-y-2">
              <label for="phoneConnectivity" class="form-label">Phone Connectivity</label>
              <input type="tel" id="phoneConnectivity" class="form-input" value="+234 803 000 0000" />
            </div>
          </div>

          <div class="space-y-4 pt-6">
            <label for="professionalBio" class="form-label">Professional Bio / Intelligence Context</label>
            <textarea id="professionalBio" class="form-input min-h-[140px] resize-none" placeholder="Describe your auditing expertise and enterprise context..."></textarea>
          </div>
        </div>
      {:else if activeTab === 'security'}
        <div class="card-premium p-10 bg-surface/40 backdrop-blur-sm space-y-10" in:fly={{ y: 20 }}>
          <div class="flex items-center gap-4 mb-2">
            <div class="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center text-3xl">
              🛡️
            </div>
            <div>
              <h3 class="text-2xl font-heading font-black text-white tracking-tight leading-tight">Security Hardening</h3>
              <p class="text-sm text-slate font-medium">Protect your enterprise identity and audit records.</p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all cursor-pointer">
              <div class="flex items-center gap-5">
                <div class="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📱
                </div>
                <div>
                  <div class="text-white font-bold mb-1">Two-Factor Authentication</div>
                  <p class="text-[11px] text-slate-dim font-medium uppercase tracking-widest">Active · Secure via Authenticator App</p>
                </div>
              </div>
              <button class="text-[10px] font-black text-emerald uppercase tracking-[0.2em] border border-emerald/20 px-4 py-2 rounded-lg hover:bg-emerald/10 transition-all">Configure</button>
            </div>

            <div class="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all cursor-pointer">
              <div class="flex items-center gap-5">
                <div class="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🔑
                </div>
                <div>
                  <div class="text-white font-bold mb-1">Account Password</div>
                  <p class="text-[11px] text-slate-dim font-medium uppercase tracking-widest">Last updated 45 days ago</p>
                </div>
              </div>
              <button class="text-[10px] font-black text-white uppercase tracking-[0.2em] border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-all">Update</button>
            </div>

            <div class="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all cursor-pointer">
              <div class="flex items-center gap-5">
                <div class="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💻
                </div>
                <div>
                  <div class="text-white font-bold mb-1">Active Sessions</div>
                  <p class="text-[11px] text-slate-dim font-medium uppercase tracking-widest">2 Sessions in Lagos, NG</p>
                </div>
              </div>
              <button 
                onclick={handleLogout}
                class="flex items-center gap-3 px-6 py-3 rounded-xl bg-danger/10 text-danger border border-danger/20 font-black text-[10px] uppercase tracking-widest hover:bg-danger hover:text-white transition-all duration-500"
              >
                <LogOut size={16} />
                Terminate Session
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
  .shadow-glow-sm {
    box-shadow: 0 0 15px -2px rgba(0, 200, 150, 0.3);
  }
</style>
