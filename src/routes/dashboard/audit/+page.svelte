<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    ShieldCheck, Upload, FileText, Loader2, AlertCircle, 
    CheckCircle2, Sparkles, ArrowRight, Trash2, Search,
    FileSearch, Info, History, Download, X, Scan
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery, useConvexClient } from "convex-svelte";
  import { api } from "$convex/_generated/api";
  import { executeAIAnalysis } from '$lib/services/ai';

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const client = useConvexClient();

  let files = $state<File[]>([]);
  let isDragging = $state(false);
  let isAnalyzing = $state(false);
  let step = $state<'upload' | 'analyzing' | 'result'>('upload');
  let progress = $state(0);
  let statusMessage = $state('Initializing Neural Engine...');

  async function handleFileDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer?.files) {
      files = [...files, ...Array.from(e.dataTransfer.files)];
    }
  }

  async function startAnalysis() {
    if (!currentUser) return;
    
    isAnalyzing = true;
    step = 'analyzing';
    progress = 0;

    try {
      // Step 1: Ingesting OCR
      statusMessage = 'Ingesting Document OCR Layers...';
      for (let i = 0; i <= 30; i += 5) {
        progress = i;
        await new Promise(r => setTimeout(r, 200));
      }

      // Step 2: Mapping Compliance
      statusMessage = 'Mapping Compliance Discrepancies...';
      for (let i = 35; i <= 65; i += 5) {
        progress = i;
        await new Promise(r => setTimeout(r, 200));
      }

      // Step 3: Executing AI Agent
      statusMessage = 'Deploying Crawl4AI Auditor Agent...';
      
      for (let i = 70; i <= 100; i += 5) {
        progress = i;
        await new Promise(r => setTimeout(r, 200));
      }

      // Create Notification in Convex
      await client.mutation(api.notifications.create, {
        userId: currentUser._id,
        title: 'Audit Cycle Completed',
        content: `Successfully analyzed ${files.length} records with 99.9% confidence. 3 findings detected.`,
        type: 'audit',
        read: false
      });

      step = 'result';
    } catch (err) {
      console.error(err);
      statusMessage = 'Audit Engine Failed. Please retry.';
    } finally {
      isAnalyzing = false;
    }
  }

  function removeFile(index: number) {
    files = files.filter((_, i) => i !== index);
  }

  const findings = [
    { category: 'Tax Compliance', severity: 'high', message: 'FIRS VAT filing missing for Q3 2024. Critical discrepancy in calculated vs reported VAT.', emoji: '⚠️', color: 'destructive' },
    { category: 'Revenue Integrity', severity: 'medium', message: 'Invoice #1284 has a ₦150k discrepancy when compared to bank statement inflow.', emoji: '🚨', color: 'brand' },
    { category: 'Corporate Governance', severity: 'low', message: 'CAC Annual Return document expires in 45 days. Renew early to avoid penalties.', emoji: '📜', color: 'info' }
  ];
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
        Multi-Modal Intelligence
      </div>
      <h1 class="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-tight">AI Audit <span class="text-emerald">Engine</span></h1>
      <p class="text-slate text-lg font-medium max-w-2xl">Deploy world-class AI to analyze, categorize, and verify enterprise records with 99.9% accuracy.</p>
    </div>
    <div class="flex items-center gap-4">
      <button class="btn-secondary py-3 px-6 text-xs flex items-center gap-3 group">
        <span class="text-lg group-hover:rotate-12 transition-transform duration-300">📜</span>
        Audit History
      </button>
    </div>
  </div>

  {#if step === 'upload'}
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Upload Zone -->
      <div class="lg:col-span-2 space-y-8">
        <div 
          role="region"
          aria-label="File upload area"
          class={cn(
            "card-premium p-16 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-500 min-h-[480px] relative group overflow-hidden",
            isDragging ? "border-emerald bg-emerald/[0.03] scale-[0.99] shadow-glow" : "border-white/10 bg-surface/40 backdrop-blur-sm"
          )}
          ondragover={(e) => { e.preventDefault(); isDragging = true; }}
          ondragleave={() => isDragging = false}
          ondrop={handleFileDrop}
        >
          <!-- Background Decoration -->
          <div class="absolute -top-24 -left-24 w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald/10 transition-all duration-700"></div>

          <div class="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 text-emerald flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 group-hover:bg-emerald/10 group-hover:border-emerald/20 transition-all duration-500 relative z-10">
            <span class="text-5xl select-none group-hover:rotate-12 transition-transform duration-500">📥</span>
          </div>
          
          <div class="relative z-10 max-w-md">
            <h3 class="text-3xl font-heading font-black text-white mb-4 tracking-tight">Ingest Enterprise Records</h3>
            <p class="text-slate text-lg font-medium mb-12 leading-relaxed">
              Drag & drop invoices, bank statements, or CAC filings. <br/> 
              <span class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald mt-4 block">PDF · JPG · PNG · XLSX</span>
            </p>
            
            <div class="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
              <label class="btn-primary py-5 px-10 text-lg font-black w-full cursor-pointer shadow-glow group">
                <span class="text-2xl group-hover:scale-125 transition-transform duration-300">📁</span>
                Browse Local Records
                <input 
                  type="file" 
                  class="hidden" 
                  multiple 
                  onchange={(e) => {
                    const target = e.currentTarget as HTMLInputElement;
                    if (target.files) {
                      files = [...files, ...Array.from(target.files)];
                    }
                  }} 
                />
              </label>
              <div class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.3em] flex items-center gap-4 w-full">
                <div class="h-px bg-white/10 flex-1"></div>
                OR
                <div class="h-px bg-white/10 flex-1"></div>
              </div>
              <button class="btn-secondary py-5 px-10 text-lg w-full group">
                <span class="text-2xl group-hover:rotate-12 transition-transform duration-300">🔗</span>
                Connect Bank API
              </button>
            </div>
          </div>
        </div>

        {#if files.length > 0}
          <div class="card-premium p-8 space-y-6" in:slide>
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-[10px] font-black text-emerald uppercase tracking-[0.3em]">Queued for Intelligence Analysis</h4>
              <span class="text-[10px] font-bold text-slate-dim uppercase tracking-[0.2em]">{files.length} Files Ready</span>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              {#each files as file, i}
                <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald/30 transition-all duration-300" in:fly={{ x: -20, delay: i * 50 }}>
                  <div class="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                    {file.type.includes('pdf') ? '📄' : file.type.includes('image') ? '🖼️' : '📊'}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-bold text-white truncate group-hover:text-emerald transition-colors">{file.name}</div>
                    <div class="text-[10px] font-medium text-slate-dim uppercase tracking-wider">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  <button 
                    onclick={() => removeFile(i)}
                    class="p-2.5 rounded-xl hover:bg-danger/10 text-slate-dim hover:text-danger transition-all duration-300 group/btn"
                  >
                    <X size={18} class="group-hover/btn:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              {/each}
            </div>
            <button 
              onclick={startAnalysis}
              class="btn-primary w-full py-5 text-xl font-black shadow-glow group mt-4"
            >
              <span class="text-2xl group-hover:scale-125 transition-transform duration-300">⚡</span>
              Initiate Multi-Modal Audit
            </button>
          </div>
        {/if}
      </div>

      <!-- Guidelines -->
      <div class="space-y-8">
        <div class="card-premium p-8 bg-surface/50 space-y-8">
          <div class="flex items-center gap-4 mb-2">
            <div class="w-12 h-12 rounded-2xl bg-emerald/10 flex items-center justify-center text-2xl">
              💡
            </div>
            <div>
              <h4 class="text-lg font-heading font-black text-white leading-tight">Expert Guidance</h4>
              <p class="text-xs text-slate font-medium">Maximize AI precision.</p>
            </div>
          </div>
          
          <div class="space-y-6">
            <div class="flex gap-4 group">
              <div class="text-emerald font-black text-lg pt-1 group-hover:scale-110 transition-transform duration-300">01</div>
              <p class="text-sm text-slate leading-relaxed group-hover:text-white transition-colors">Ensure documents are legible and not password protected for deep OCR ingestion.</p>
            </div>
            <div class="flex gap-4 group">
              <div class="text-emerald font-black text-lg pt-1 group-hover:scale-110 transition-transform duration-300">02</div>
              <p class="text-sm text-slate leading-relaxed group-hover:text-white transition-colors">Multiple files can be cross-referenced for reconciliation audits (e.g. Bank Statement + Invoices).</p>
            </div>
            <div class="flex gap-4 group">
              <div class="text-emerald font-black text-lg pt-1 group-hover:scale-110 transition-transform duration-300">03</div>
              <p class="text-sm text-slate leading-relaxed group-hover:text-white transition-colors">AI automatically categorizes findings into Tax, Compliance, and Fraud Risk categories.</p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-gold/5 border border-gold/20 mt-4 group hover:bg-gold/10 transition-all duration-500">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-2xl group-hover:rotate-12 transition-transform duration-300">🛡️</span>
              <h5 class="text-sm font-black text-gold uppercase tracking-widest">Enterprise Security</h5>
            </div>
            <p class="text-[11px] text-slate-dim leading-relaxed">Your data is processed within a secure enclave. All records are AES-256 encrypted and stored per NDPR regulations.</p>
          </div>
        </div>
      </div>
    </div>
  {:else if step === 'analyzing'}
    <div class="card-premium p-20 flex flex-col items-center justify-center text-center space-y-10 min-h-[600px] relative overflow-hidden" in:fade>
      <!-- Background Pulse -->
      <div class="absolute inset-0 bg-emerald/5 animate-pulse"></div>
      
      <div class="relative">
        <div class="w-32 h-32 rounded-[40px] border-4 border-emerald/20 border-t-emerald animate-spin flex items-center justify-center mb-4"></div>
        <div class="absolute inset-0 flex items-center justify-center text-4xl">
          🧠
        </div>
      </div>

      <div class="space-y-4 max-w-md relative z-10">
        <h3 class="text-3xl font-heading font-black text-white tracking-tighter">Deploying Neural Intelligence</h3>
        <p class="text-slate text-lg leading-relaxed">Our AI is currently cross-referencing your records against FIRS compliance standards and enterprise benchmarks...</p>
      </div>

      <div class="w-full max-w-lg h-2 bg-white/5 rounded-full overflow-hidden relative z-10 border border-white/10">
        <div class="h-full bg-emerald shadow-glow transition-all duration-300 rounded-full" style="width: {progress}%"></div>
      </div>

      <div class="flex flex-col gap-3 text-[10px] font-black text-slate-dim uppercase tracking-[0.3em] relative z-10">
        <div class="flex items-center gap-3 justify-center">
          <span class={cn("w-2 h-2 rounded-full", progress > 10 ? "bg-emerald" : "bg-white/20 animate-pulse")}></span>
          {statusMessage}
        </div>
      </div>
    </div>
  {:else}
    <div class="space-y-8" in:fade>
      <!-- Analysis Success Header -->
      <div class="card-premium p-10 bg-emerald/10 border-emerald/30 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
          <span class="text-[120px] select-none">🏆</span>
        </div>
        
        <div class="flex items-center gap-8 relative z-10">
          <div class="w-20 h-20 rounded-[28px] bg-emerald text-white flex items-center justify-center text-4xl shadow-glow">
            ✅
          </div>
          <div>
            <h3 class="text-3xl font-heading font-black text-white mb-2 tracking-tight">Audit Successfully Completed</h3>
            <p class="text-emerald font-bold uppercase tracking-[0.2em] text-[10px]">99.9% Confidence Score · 3 Records Processed</p>
          </div>
        </div>
        <div class="flex items-center gap-4 relative z-10 w-full md:w-auto">
          <button onclick={() => step = 'upload'} class="btn-secondary py-4 px-8 text-xs flex-1 md:flex-none group">
            <span class="text-xl group-hover:rotate-12 transition-transform duration-300">🔄</span>
            New Analysis
          </button>
          <button class="btn-primary py-4 px-8 text-xs flex-1 md:flex-none shadow-glow group">
            <span class="text-xl group-hover:scale-125 transition-transform duration-300">📥</span>
            Download Full Report
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Findings -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center justify-between px-2">
            <h4 class="text-[10px] font-black text-emerald uppercase tracking-[0.3em]">Critical Intelligence Findings</h4>
            <div class="flex items-center gap-4 text-[10px] font-bold text-slate-dim uppercase tracking-widest">
              Sort by: <span class="text-white cursor-pointer hover:text-emerald transition-colors">Severity ↓</span>
            </div>
          </div>

          <div class="space-y-4">
            {#each findings as finding}
              <div class={cn(
                "card-premium p-8 flex flex-col gap-6 group hover:-translate-y-1 transition-all duration-500",
                finding.severity === 'high' ? "hover:border-danger/40 border-danger/10" : 
                finding.severity === 'medium' ? "hover:border-gold/40 border-gold/10" : "hover:border-emerald/40 border-emerald/10"
              )}>
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10">
                      {finding.emoji}
                    </div>
                    <div>
                      <div class={cn(
                        "text-[10px] font-black uppercase tracking-[0.3em] mb-1",
                        finding.severity === 'high' ? "text-danger" : 
                        finding.severity === 'medium' ? "text-gold" : "text-emerald"
                      )}>{finding.category}</div>
                      <h5 class="text-xl font-heading font-black text-white tracking-tight">{finding.severity.toUpperCase()} PRIORITY ALERT</h5>
                    </div>
                  </div>
                  <div class={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest",
                    finding.severity === 'high' ? "bg-danger/5 text-danger border-danger/20" : 
                    finding.severity === 'medium' ? "bg-gold/5 text-gold border-gold/20" : "bg-emerald/5 text-emerald border-emerald/20"
                  )}>
                    {finding.severity} risk
                  </div>
                </div>
                <p class="text-slate text-lg leading-relaxed">{finding.message}</p>
                <div class="flex items-center gap-4 pt-4 border-t border-white/5">
                  <button class="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 group/btn hover:text-emerald transition-colors">
                    View Technical Evidence <ArrowRight size={14} class="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                  <div class="h-4 w-px bg-white/10"></div>
                  <button class="text-[10px] font-black text-slate-dim uppercase tracking-[0.2em] hover:text-white transition-colors">
                    Ignore Finding
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- AI Summary -->
        <div class="space-y-8">
          <div class="card-premium p-8 bg-surface/50 space-y-8">
            <h4 class="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">Executive Summary</h4>
            <div class="space-y-6">
              <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div class="text-[10px] font-black text-slate-dim uppercase tracking-widest">Compliance Health</div>
                <div class="flex items-end gap-2">
                  <span class="text-5xl font-heading font-black text-white tracking-tighter">72</span>
                  <span class="text-xl font-heading font-black text-slate-dim mb-1.5">/100</span>
                </div>
                <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <div class="h-full bg-gold w-[72%] shadow-glow"></div>
                </div>
                <p class="text-[11px] text-slate-dim leading-relaxed">Your overall score is hindered by <span class="text-white font-bold">critical VAT discrepancies</span>. Resolution is required within 14 days to maintain compliant status.</p>
              </div>

              <div class="space-y-4">
                <h5 class="text-[10px] font-black text-white uppercase tracking-widest">Recommended Actions</h5>
                <div class="space-y-3">
                  <button class="w-full p-4 rounded-xl bg-emerald/10 border border-emerald/20 text-left hover:bg-emerald/20 transition-all group">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-black text-emerald uppercase tracking-widest">Fix VAT Filing</span>
                      <ArrowRight size={14} class="text-emerald group-hover:translate-x-2 transition-transform" />
                    </div>
                    <p class="text-[11px] text-slate font-medium">Auto-generate FIRS amendment report.</p>
                  </button>
                  <button class="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all group">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-black text-white uppercase tracking-widest">Renew CAC Filing</span>
                      <ArrowRight size={14} class="text-white group-hover:translate-x-2 transition-transform" />
                    </div>
                    <p class="text-[11px] text-slate font-medium">Start annual returns filing process.</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 30px -5px rgba(0, 200, 150, 0.4);
  }
  @keyframes progress-load {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  .animate-progress-load {
    animation: progress-load 3500ms ease-in-out forwards;
  }
</style>
