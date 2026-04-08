<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Users, ShieldCheck, Briefcase, FileText, 
    Settings, Search, Filter, MoreVertical,
    CheckCircle2, XCircle, AlertTriangle, 
    ArrowUpRight, TrendingUp, DollarSign,
    ShieldAlert, Activity, Database
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery, useConvexClient } from "convex-svelte";
  import { api } from "$convex/_generated/api";
  import { goto } from '$app/navigation';

  // Auth Protection
  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  $effect(() => {
    if (currentUser && currentUser.role !== 'admin') {
      goto('/dashboard');
    }
  });

  const client = useConvexClient();

  // Admin Data
  const allUsersQuery = useQuery(api.users.getAll);
  const allAuditorsQuery = useQuery(api.auditors.getAll);
  const allRequestsQuery = useQuery(api.serviceRequests.getAll);
  
  const users = $derived(allUsersQuery.data || []);
  const auditors = $derived(allAuditorsQuery.data || []);
  const requests = $derived(allRequestsQuery.data || []);

  const stats = $derived([
    { label: 'Total Clients', value: users.filter(u => u.role === 'client').length, icon: Users, color: 'text-emerald', bg: 'bg-emerald/10' },
    { label: 'Active Auditors', value: auditors.length, icon: Briefcase, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Pending Requests', value: requests.filter(r => r.status === 'pending').length, icon: FileText, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Platform Revenue', value: '₦4.2M', icon: DollarSign, color: 'text-white', bg: 'bg-white/10' }
  ]);

  let activeTab = $state<'users' | 'auditors' | 'requests' | 'system'>('users');

  async function handleRoleChange(userId: any, newRole: 'client' | 'auditor' | 'admin') {
    await client.mutation(api.users.updateRole, { id: userId, role: newRole });
  }

  async function handleVerifyAuditor(auditorId: any, verified: boolean) {
    await client.mutation(api.auditors.updateVerification, { id: auditorId, isVerified: verified });
  }

  async function handleRequestAction(requestId: any, status: any) {
    await client.mutation(api.serviceRequests.updateStatus, { id: requestId, status });
  }
</script>

<div class="min-h-screen bg-navy text-white p-8 md:p-12 relative overflow-hidden" in:fade>
  <!-- Admin Background -->
  <div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,100,200,0.1)_0%,transparent_70%)]"></div>
    <div class="absolute inset-0 grid-pattern opacity-10"></div>
  </div>

  <div class="relative z-10 max-w-[1400px] mx-auto space-y-10">
    <!-- Admin Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div class="space-y-2">
        <div class="flex items-center gap-3 text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">
          <ShieldAlert size={14} />
          Enterprise Admin Control Plane
        </div>
        <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">System <span class="text-indigo-400">Command</span></h1>
        <p class="text-slate text-lg font-medium max-w-2xl">High-level oversight of platform users, auditor certifications, and service fulfillment.</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-dim uppercase tracking-widest">
          <Activity size={12} class="text-emerald" />
          System Health: Stable
        </div>
        <button class="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-dim hover:text-white transition-all">
          <Settings size={20} />
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      {#each stats as stat}
        <div class="card-premium p-8 bg-surface/50 border-white/5 space-y-4 group hover:border-indigo-400/30 transition-all duration-500">
          <div class="flex items-center justify-between">
            <div class={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <TrendingUp size={16} class="text-emerald opacity-50" />
          </div>
          <div>
            <div class="text-3xl font-heading font-black text-white tracking-tight">{stat.value}</div>
            <p class="text-xs text-slate-dim font-black uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Command Center -->
    <div class="card-premium bg-surface/40 backdrop-blur-xl border-white/10 overflow-hidden">
      <!-- Tabs -->
      <div class="flex border-b border-white/5 overflow-x-auto no-scrollbar bg-white/[0.02]">
        <button 
          onclick={() => activeTab = 'users'}
          class={cn(
            "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
            activeTab === 'users' ? "text-indigo-400" : "text-slate-dim hover:text-white"
          )}
        >
          User Management
          {#if activeTab === 'users'}
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400" in:fly={{ y: 2 }}></div>
          {/if}
        </button>
        <button 
          onclick={() => activeTab = 'auditors'}
          class={cn(
            "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
            activeTab === 'auditors' ? "text-indigo-400" : "text-slate-dim hover:text-white"
          )}
        >
          Auditor Directory
          {#if activeTab === 'auditors'}
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400" in:fly={{ y: 2 }}></div>
          {/if}
        </button>
        <button 
          onclick={() => activeTab = 'requests'}
          class={cn(
            "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
            activeTab === 'requests' ? "text-indigo-400" : "text-slate-dim hover:text-white"
          )}
        >
          Service Requests
          {#if activeTab === 'requests'}
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400" in:fly={{ y: 2 }}></div>
          {/if}
        </button>
        <button 
          onclick={() => activeTab = 'system'}
          class={cn(
            "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
            activeTab === 'system' ? "text-indigo-400" : "text-slate-dim hover:text-white"
          )}
        >
          System Engine
          {#if activeTab === 'system'}
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400" in:fly={{ y: 2 }}></div>
          {/if}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="p-8">
        {#if activeTab === 'users'}
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-heading font-black text-white">Active Platform Users</h3>
              <div class="flex items-center gap-4">
                <div class="relative group">
                  <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dim group-focus-within:text-indigo-400 transition-colors" size={14} />
                  <input type="text" placeholder="Search by name or email..." class="bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white outline-none focus:border-indigo-400/30 transition-all w-64" />
                </div>
              </div>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-white/5">
              <table class="w-full text-left border-collapse">
                <thead class="bg-white/[0.03]">
                  <tr>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">User Entity</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Platform Role</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Account Status</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Verification</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  {#each users as user}
                    <tr class="hover:bg-white/[0.01] transition-colors group">
                      <td class="px-6 py-5">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-xl bg-indigo-400/10 flex items-center justify-center text-lg">
                            {user.name ? user.name.charAt(0) : 'U'}
                          </div>
                          <div>
                            <div class="text-sm font-bold text-white">{user.name || 'Anonymous User'}</div>
                            <div class="text-xs text-slate-dim font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-5">
                        <select 
                          class="bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-indigo-400/30"
                          value={user.role}
                          onchange={(e) => handleRoleChange(user._id, (e.target as HTMLSelectElement).value as any)}
                        >
                          <option value="client">Client</option>
                          <option value="auditor">Auditor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td class="px-6 py-5">
                        <div class="flex items-center gap-2">
                          <div class="w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(0,200,150,0.5)]"></div>
                          <span class="text-[10px] font-black text-white uppercase tracking-widest">Active</span>
                        </div>
                      </td>
                      <td class="px-6 py-5">
                        {#if user.isVerified}
                          <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald/10 text-emerald border border-emerald/20 text-[9px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={10} /> Verified
                          </div>
                        {:else}
                          <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-[9px] font-black uppercase tracking-widest">
                            <AlertTriangle size={10} /> Unverified
                          </div>
                        {/if}
                      </td>
                      <td class="px-6 py-5 text-right">
                        <button class="p-2 hover:bg-white/5 rounded-lg text-slate-dim hover:text-white transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {:else if activeTab === 'auditors'}
          <!-- Auditor Directory Implementation -->
          <div class="space-y-6">
            <h3 class="text-xl font-heading font-black text-white">Certified Professionals</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each auditors as auditor}
                <div class="card-premium p-6 bg-white/[0.02] border-white/5 space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-2xl bg-indigo-400/10 flex items-center justify-center text-2xl">
                        👨‍💼
                      </div>
                      <div>
                        <div class="text-sm font-bold text-white">Verified Auditor</div>
                        <div class="text-[10px] text-slate-dim font-black uppercase tracking-widest">{auditor.specialization}</div>
                      </div>
                    </div>
                    <button 
                      onclick={() => handleVerifyAuditor(auditor._id, !auditor.isVerified)}
                      class={cn(
                        "p-2 rounded-xl transition-all",
                        auditor.isVerified ? "bg-emerald/10 text-emerald" : "bg-danger/10 text-danger"
                      )}
                    >
                      {#if auditor.isVerified}<ShieldCheck size={18} />{:else}<ShieldAlert size={18} />{/if}
                    </button>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div class="text-[9px] font-black text-slate-dim uppercase tracking-widest mb-1">Experience</div>
                      <div class="text-sm font-bold text-white">{auditor.experience} Years</div>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div class="text-[9px] font-black text-slate-dim uppercase tracking-widest mb-1">Rating</div>
                      <div class="text-sm font-bold text-white">⭐ {auditor.rating}</div>
                    </div>
                  </div>
                  <div class="pt-2">
                    <button class="btn-primary w-full py-2.5 text-xs">View Credentials</button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {:else if activeTab === 'requests'}
          <!-- Service Requests Implementation -->
          <div class="space-y-6">
            <h3 class="text-xl font-heading font-black text-white">Pending Platform Requests</h3>
            <div class="overflow-x-auto rounded-2xl border border-white/5">
              <table class="w-full text-left border-collapse">
                <thead class="bg-white/[0.03]">
                  <tr>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Type</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Client</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Priority</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Budget</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest">Status</th>
                    <th class="px-6 py-4 text-[10px] font-black text-slate-dim uppercase tracking-widest text-right">Control</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  {#each requests as request}
                    <tr class="hover:bg-white/[0.01] transition-colors group">
                      <td class="px-6 py-5">
                        <div class="text-sm font-bold text-white uppercase tracking-tight">{request.type}</div>
                      </td>
                      <td class="px-6 py-5">
                        <div class="text-xs text-slate-dim font-medium">Platform Client</div>
                      </td>
                      <td class="px-6 py-5">
                        <div class={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                          request.priority === 'urgent' ? "bg-danger/10 text-danger" : 
                          request.priority === 'high' ? "bg-orange-500/10 text-orange-500" : "bg-indigo-400/10 text-indigo-400"
                        )}>
                          {request.priority}
                        </div>
                      </td>
                      <td class="px-6 py-5 text-sm font-heading font-black text-white">₦{request.budget.toLocaleString()}</td>
                      <td class="px-6 py-5">
                        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest">
                          {request.status}
                        </div>
                      </td>
                      <td class="px-6 py-5 text-right">
                        <div class="flex items-center justify-end gap-2">
                          <button 
                            onclick={() => handleRequestAction(request._id, 'assigned')}
                            class="p-2 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:scale-110 transition-transform"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button 
                            onclick={() => handleRequestAction(request._id, 'cancelled')}
                            class="p-2 rounded-lg bg-danger/10 text-danger border border-danger/20 hover:scale-110 transition-transform"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {:else if activeTab === 'system'}
          <!-- System Engine Implementation -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <h3 class="text-xl font-heading font-black text-white flex items-center gap-3">
                <Database class="text-indigo-400" />
                Infrastructure Metrics
              </h3>
              <div class="space-y-4">
                <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-dim">
                    <span>Database Load</span>
                    <span class="text-emerald">Optimal</span>
                  </div>
                  <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald w-[12%]"></div>
                  </div>
                </div>
                <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-dim">
                    <span>API Latency</span>
                    <span class="text-emerald">12ms</span>
                  </div>
                  <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-400 w-[5%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <h3 class="text-xl font-heading font-black text-white flex items-center gap-3">
                <ShieldCheck class="text-emerald" />
                Security Hardening
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <button class="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:bg-white/5 transition-all group">
                  <div class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Auth Logs</div>
                  <div class="text-sm font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-2">
                    Review Attempts <ArrowUpRight size={14} />
                  </div>
                </button>
                <button class="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:bg-white/5 transition-all group">
                  <div class="text-[10px] font-black text-emerald uppercase tracking-widest mb-2">Firewall</div>
                  <div class="text-sm font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-2">
                    Active Rules <ArrowUpRight size={14} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
