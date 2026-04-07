<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { Users, ShieldCheck, FileText, TrendingUp, Search, Filter, MoreHorizontal, UserCheck, ShieldAlert, Activity } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const adminStats = [
    { label: 'Total Revenue', value: '₦42.8M', change: '+24.5%', emoji: '💰', color: 'emerald' },
    { label: 'Platform Users', value: '52,108', change: '+8.2%', emoji: '👥', color: 'info' },
    { label: 'Auditor Verifications', value: '542', change: '+12.4%', emoji: '👨‍💼', color: 'gold' },
    { label: 'Active Audits', value: '1,284', change: '+15.2%', emoji: '🤖', color: 'info' }
  ];

  const verificationRequests = [
    { id: 'REQ-482', name: 'Dr. Chima Eze', firm: 'Eze & Partners', date: '2h ago', status: 'pending', emoji: '👨‍💼' },
    { id: 'REQ-483', name: 'Sarah Alabi', firm: 'Alabi Audits', date: '4h ago', status: 'pending', emoji: '👩‍💼' },
    { id: 'REQ-484', name: 'Musa Bello', firm: 'Bello & Co', date: '6h ago', status: 'pending', emoji: '👨‍💼' }
  ];
</script>

<div class="space-y-8" in:fade>
  <!-- Admin Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each adminStats as stat}
      <div class="card-premium p-6 group">
        <div class="flex justify-between items-start mb-4">
          <div class="text-3xl group-hover:scale-110 transition-transform">{stat.emoji}</div>
          <div class="bg-emerald/10 text-emerald px-2 py-1 rounded-lg text-[10px] font-black">{stat.change}</div>
        </div>
        <div class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em] mb-1">{stat.label}</div>
        <div class="text-2xl font-heading font-black text-white">{stat.value}</div>
      </div>
    {/each}
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Platform Activity -->
    <div class="lg:col-span-2 space-y-8">
      <div class="card-premium p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-heading font-bold text-white flex items-center gap-2">
            <span>📈</span> Platform Growth
          </h3>
          <div class="flex gap-4">
            <div class="flex items-center gap-2 text-xs font-bold text-emerald">
              <span class="w-2 h-2 rounded-full bg-emerald"></span> Active
            </div>
            <div class="flex items-center gap-2 text-xs font-bold text-slate-dim">
              <span class="w-2 h-2 rounded-full bg-white/20"></span> Inactive
            </div>
          </div>
        </div>

        <div class="h-64 flex items-end gap-1.5 px-4 relative">
          {#each Array(24) as _, i}
            <div 
              class="flex-1 bg-white/5 hover:bg-emerald/20 transition-all rounded-t-sm cursor-pointer group relative h-full flex items-end"
            >
              <div class="w-full bg-emerald/40 group-hover:bg-emerald rounded-t-sm" style={`height: ${Math.random() * 80 + 20}%`}></div>
            </div>
          {/each}
        </div>
        <div class="flex justify-between mt-4 text-[9px] font-mono text-slate-dim uppercase tracking-widest pt-4 border-t border-white/5">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </div>

      <div class="card-premium p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-heading font-bold text-white flex items-center gap-2">
            <span>🛡️</span> Security Logs
          </h3>
          <button class="text-xs font-bold text-emerald uppercase tracking-widest hover:text-white transition-colors">View All</button>
        </div>
        <div class="space-y-6">
          <div class="flex items-center justify-between p-4 bg-navy rounded-2xl border border-white/5">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center"><ShieldAlert size={20} /></div>
              <div>
                <div class="text-sm font-bold text-white">Brute-force attack detected</div>
                <div class="text-[10px] text-slate-dim font-mono">IP: 192.168.1.254 · Port: 443</div>
              </div>
            </div>
            <button class="btn-primary py-2 px-4 text-[10px] bg-danger text-white hover:bg-danger/80 border-none">BLOCK IP</button>
          </div>
          <div class="flex items-center justify-between p-4 bg-navy rounded-2xl border border-white/5">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center"><UserCheck size={20} /></div>
              <div>
                <div class="text-sm font-bold text-white">System kernel update successful</div>
                <div class="text-[10px] text-slate-dim font-mono">v4.2.1-enterprise · Deployment Node: NG-01</div>
              </div>
            </div>
            <span class="text-xs font-bold text-emerald">STABLE ✅</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Verification Sidebar -->
    <div class="space-y-8">
      <div class="card-premium p-8">
        <h3 class="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
          <span>👨‍💼</span> Auditor Verifications
        </h3>
        <div class="space-y-6">
          {#each verificationRequests as req}
            <div class="space-y-4 p-4 bg-navy rounded-2xl border border-white/5">
              <div class="flex gap-4">
                <div class="text-3xl shrink-0">{req.emoji}</div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-white truncate">{req.name}</div>
                  <div class="text-[10px] text-slate-dim uppercase font-bold tracking-widest">{req.firm}</div>
                </div>
              </div>
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-emerald/10 text-emerald text-[10px] font-bold rounded-lg border border-emerald/20 hover:bg-emerald hover:text-navy transition-all">APPROVE</button>
                <button class="flex-1 py-2 bg-white/5 text-slate-dim text-[10px] font-bold rounded-lg border border-white/10 hover:text-white transition-all">REJECT</button>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="card-premium p-8 bg-linear-to-br from-info/10 to-transparent border-info/20">
        <div class="text-3xl mb-4">⚙️</div>
        <h4 class="text-lg font-heading font-bold text-white mb-2">System Config</h4>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-dim">AI Model Version</span>
            <span class="text-xs font-mono text-white">v8.4.2-pro</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-dim">Database Latency</span>
            <span class="text-xs font-mono text-emerald">12ms</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-dim">Edge Runtime</span>
            <span class="text-xs font-mono text-white">Cloudflare Workers</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
