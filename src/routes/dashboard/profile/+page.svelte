<script lang="ts">
  import { fly } from 'svelte/transition';
  import { User, Lock, Bell, CreditCard, Shield, ChevronRight, Camera, LogOut, Trash2 } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery } from 'convex-svelte';
  import { api } from '$convex/_generated/api';

  let activeTab = $state<'profile' | 'security' | 'billing' | 'notifications'>('profile');

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  let name    = $state('');
  let email   = $state('');
  let phone   = $state('');
  let company = $state('');
  let cacNum  = $state('');
  let isSaving = $state(false);

  $effect(() => {
    if (currentUser) {
      name    = currentUser.name || '';
      email   = authState.user?.email || '';
      phone   = currentUser.phone || '';
      company = currentUser.company || '';
      cacNum  = currentUser.cacNumber || '';
    } else {
      email = authState.user?.email || '';
    }
  });

  async function saveProfile() {
    isSaving = true;
    await new Promise(r => setTimeout(r, 800));
    isSaving = false;
  }

  const tabs = [
    { key: 'profile',       icon: User,       label: 'Profile' },
    { key: 'security',      icon: Lock,       label: 'Security' },
    { key: 'billing',       icon: CreditCard, label: 'Billing' },
    { key: 'notifications', icon: Bell,       label: 'Alerts' },
  ] as const;

  let notifications = $state({
    auditComplete: true,
    paymentAlert:  true,
    weeklyReport:  false,
    flaggedItems:  true,
    marketing:     false,
  });
</script>

<svelte:head>
  <title>Account Settings — FinancialAuditor</title>
</svelte:head>

<div class="space-y-6 pb-10" in:fly={{ y: 10, duration: 300 }}>

  <!-- Header -->
  <div>
    <h1 class="text-2xl font-heading font-bold text-white tracking-tight">Account Settings</h1>
    <p class="text-sm text-slate-dim mt-0.5">Manage your profile, security, billing and preferences</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

    <!-- Sidebar Nav -->
    <nav class="lg:col-span-1" aria-label="Settings sections">
      <div class="rounded-2xl border border-white/8 overflow-hidden" style="background-color:#111827;">
        <!-- Avatar -->
        <div class="p-6 border-b border-white/8 flex flex-col items-center gap-3">
          <div class="relative">
            <div class="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white"
              style="background: linear-gradient(135deg, #059669, #0f2040)">
              {(currentUser?.name || authState.user?.email || 'U')[0].toUpperCase()}
            </div>
            <button class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald flex items-center justify-center hover:bg-emerald-deep transition-colors"
              aria-label="Change profile photo">
              <Camera size={12} class="text-white" aria-hidden="true" />
            </button>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-white">{currentUser?.name || 'Your Name'}</p>
            <p class="text-xs text-slate-dim mt-0.5">{authState.user?.email || ''}</p>
          </div>
          <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize"
            style="background:rgba(16,185,129,0.15);color:#6ee7b7;">
            {currentUser?.plan || 'Starter'} Plan
          </span>
        </div>

        <!-- Tab Buttons -->
        <div class="p-2 space-y-1">
          {#each tabs as tab (tab.key)}
            <button
              onclick={() => activeTab = tab.key}
              class={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                activeTab === tab.key
                  ? 'text-emerald'
                  : 'text-slate hover:text-white hover:bg-white/5'
              )}
              style={activeTab === tab.key ? 'background:rgba(16,185,129,0.1);' : ''}
              aria-current={activeTab === tab.key ? 'page' : undefined}
            >
              <tab.icon size={15} aria-hidden="true" />
              {tab.label}
            </button>
          {/each}
        </div>

        <!-- Danger Zone -->
        <div class="p-3 border-t border-white/8 space-y-1">
          <button onclick={() => authState.logout?.()}
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={15} aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>

    <!-- Content Panel -->
    <div class="lg:col-span-3">

      <!-- Profile Tab -->
      {#if activeTab === 'profile'}
        <div class="rounded-2xl border border-white/8 p-6 space-y-6" style="background-color:#111827;" in:fly={{ x: 10, duration: 200 }}>
          <h2 class="text-sm font-semibold text-white">Personal Information</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {#each [
              { label: 'Full Name',    id: 'profile-name',    bind: name,    type: 'text',  placeholder: 'Your full name' },
              { label: 'Email',        id: 'profile-email',   bind: email,   type: 'email', placeholder: 'you@company.ng' },
              { label: 'Phone',        id: 'profile-phone',   bind: phone,   type: 'tel',   placeholder: '+234 800 000 0000' },
              { label: 'Company Name', id: 'profile-company', bind: company, type: 'text',  placeholder: 'Company Ltd.' },
            ] as field (field.id)}
              <div>
                <label for={field.id} class="block text-xs font-semibold text-slate-dim mb-1.5">{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  bind:value={field.bind}
                  placeholder={field.placeholder}
                  class="w-full py-2.5 px-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
                  style="background-color:#1f2937;"
                />
              </div>
            {/each}
            <div class="sm:col-span-2">
              <label for="profile-cac" class="block text-xs font-semibold text-slate-dim mb-1.5">CAC Registration Number</label>
              <input
                id="profile-cac"
                type="text"
                bind:value={cacNum}
                placeholder="RC 000000"
                class="w-full py-2.5 px-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
                style="background-color:#1f2937;"
              />
            </div>
          </div>
          <div class="flex justify-end">
            <button onclick={saveProfile} disabled={isSaving}
              class="btn-primary flex items-center gap-2 py-2.5 px-6 text-sm rounded-xl disabled:opacity-60">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

      <!-- Security Tab -->
      {:else if activeTab === 'security'}
        <div class="space-y-4" in:fly={{ x: 10, duration: 200 }}>
          {#each [
            { title: 'Change Password',           desc: 'Update your account password', icon: Lock,   action: 'Update' },
            { title: 'Two-Factor Authentication', desc: '2FA is currently disabled',    icon: Shield, action: 'Enable' },
          ] as item (item.title)}
            <div class="rounded-2xl border border-white/8 p-5 flex items-center justify-between gap-4" style="background-color:#111827;">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center" aria-hidden="true">
                  <item.icon size={16} class="text-slate" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-white">{item.title}</p>
                  <p class="text-xs text-slate-dim">{item.desc}</p>
                </div>
              </div>
              <button class="flex items-center gap-1.5 py-2 px-4 text-sm rounded-xl border border-white/10 text-slate hover:text-white hover:bg-white/5 transition-all font-medium whitespace-nowrap">
                {item.action}
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>
          {/each}

          <!-- Danger Zone -->
          <div class="rounded-2xl border border-red-500/20 p-5" style="background-color:rgba(239,68,68,0.05)">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p class="text-sm font-semibold" style="color:#fca5a5">Delete Account</p>
                <p class="text-xs text-slate-dim mt-0.5">Permanently remove your account and all associated data</p>
              </div>
              <button class="flex items-center gap-2 py-2 px-4 text-sm rounded-xl border border-red-500/30 font-semibold transition-all whitespace-nowrap"
                style="color:#fca5a5;background:rgba(239,68,68,0.08)" aria-label="Delete account permanently">
                <Trash2 size={14} aria-hidden="true" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

      <!-- Billing Tab -->
      {:else if activeTab === 'billing'}
        <div class="space-y-4" in:fly={{ x: 10, duration: 200 }}>
          <div class="rounded-2xl border border-emerald/20 p-6" style="background: linear-gradient(135deg, rgba(5,150,105,0.1), rgba(4,120,87,0.06)); background-color:#111827">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald/20 text-emerald">CURRENT PLAN</span>
                <p class="text-2xl font-heading font-bold text-white mt-2">{currentUser?.plan === 'pro' ? 'Pro Plan' : 'Starter Plan'}</p>
                <p class="text-sm text-slate-dim mt-1">Renews on May 1, 2026</p>
              </div>
              <p class="text-2xl font-heading font-bold text-white tabular-nums">
                {currentUser?.plan === 'pro' ? '₦50K' : '₦0'}<span class="text-sm text-slate-dim font-normal">/yr</span>
              </p>
            </div>
            <div class="mt-4 pt-4 border-t border-white/8">
              <a href="/marketplace" class="btn-primary flex items-center gap-2 py-2 px-5 text-sm rounded-xl w-fit">
                Upgrade to Pro
              </a>
            </div>
          </div>

          <div class="rounded-2xl border border-white/8 p-5" style="background-color:#111827;">
            <h3 class="text-sm font-semibold text-white mb-4">Payment Method</h3>
            <div class="flex items-center gap-3 p-4 rounded-xl border border-white/8" style="background-color:#1f2937;">
              <CreditCard size={20} class="text-slate" aria-hidden="true" />
              <p class="text-sm text-slate-dim">No payment method saved</p>
              <button class="ml-auto text-xs text-emerald hover:underline font-medium">Add Card</button>
            </div>
          </div>
        </div>

      <!-- Notifications Tab -->
      {:else if activeTab === 'notifications'}
        <div class="rounded-2xl border border-white/8 p-6 space-y-1" style="background-color:#111827;" in:fly={{ x: 10, duration: 200 }}>
          <h2 class="text-sm font-semibold text-white mb-4">Notification Preferences</h2>
          {#each [
            { key: 'auditComplete', label: 'Audit Complete',     desc: 'When an AI audit finishes running' },
            { key: 'paymentAlert',  label: 'Payment Alerts',     desc: 'Payment received or processed' },
            { key: 'weeklyReport',  label: 'Weekly Report',      desc: 'Summary every Monday morning' },
            { key: 'flaggedItems',  label: 'Flagged Issues',     desc: 'When the AI detects anomalies' },
            { key: 'marketing',     label: 'Product Updates',    desc: 'News and feature announcements' },
          ] as item (item.key)}
            <div class="flex items-center justify-between py-4 border-b border-white/8 last:border-0">
              <div>
                <p class="text-sm font-medium text-white">{item.label}</p>
                <p class="text-xs text-slate-dim mt-0.5">{item.desc}</p>
              </div>
              <button
                onclick={() => { (notifications as any)[item.key] = !(notifications as any)[item.key]; }}
                class={cn('w-10 h-6 rounded-full transition-colors relative shrink-0', (notifications as any)[item.key] ? 'bg-emerald' : 'bg-white/10')}
                role="switch"
                aria-checked={(notifications as any)[item.key]}
                aria-label="Toggle {item.label}"
              >
                <span class={cn('absolute top-1 w-4 h-4 rounded-full bg-white transition-transform', (notifications as any)[item.key] ? 'translate-x-5' : 'translate-x-1')}></span>
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
