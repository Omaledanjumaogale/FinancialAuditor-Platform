<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { ShieldCheck, Upload, FileText, Loader2, AlertCircle, CheckCircle2 } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  let files = $state<File[]>([]);
  let isDragging = $state(false);
  let isAnalyzing = $state(false);
  let step = $state<'upload' | 'analyzing' | 'result'>('upload');

  function handleFileDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer?.files) {
      files = [...files, ...Array.from(e.dataTransfer.files)];
    }
  }

  function startAnalysis() {
    isAnalyzing = true;
    step = 'analyzing';
    setTimeout(() => {
      isAnalyzing = false;
      step = 'result';
    }, 3000);
  }

  const findings = [
    { category: 'Tax Compliance', severity: 'high', message: 'FIRS VAT filing missing for Q3 2024', emoji: '⚠️', color: 'danger' },
    { category: 'Revenue', severity: 'medium', message: 'Invoice #1284 has a ₦150k discrepancy', emoji: '🚨', color: 'gold' },
    { category: 'Documentation', severity: 'low', message: 'CAC document expiry in 45 days', emoji: '📜', color: 'info' }
  ];
</script>

<div class="space-y-8" in:fade>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-heading font-black text-white">AI Audit Engine 🤖</h1>
      <p class="text-slate-dim">Analyze your documents with enterprise-grade AI intelligence.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2 px-4 text-sm border-white/10 text-white flex items-center gap-2">
        <span>📜 History</span>
      </button>
    </div>
  </div>

  {#if step === 'upload'}
    <div 
      role="region"
      aria-label="File upload area"
      class={cn(
        "card-premium p-12 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all min-h-[400px]",
        isDragging ? "border-emerald bg-emerald/5 scale-[0.99]" : "border-white/10 bg-white/5"
      )}
      ondragover={(e) => { e.preventDefault(); isDragging = true; }}
      ondragleave={() => isDragging = false}
      ondrop={handleFileDrop}
    >
      <div class="w-20 h-20 rounded-3xl bg-emerald/10 text-emerald flex items-center justify-center mb-6 shadow-xl shadow-emerald/10">
        <Upload size={32} />
      </div>
      <h3 class="text-2xl font-heading font-bold text-white mb-2">Drag & Drop Documents</h3>
      <p class="text-slate-dim max-w-sm mb-8">Upload invoices, receipts, bank statements or CAC documents (PDF, JPG, PNG, Excel supported).</p>
      
      <div class="flex flex-col gap-4 w-full max-w-xs">
        <button class="btn-primary py-4 text-lg font-bold">Select Files 📁</button>
        <div class="text-[10px] font-bold text-slate-dim uppercase tracking-widest">Max file size: 50MB</div>
      </div>

      {#if files.length > 0}
        <div class="mt-8 w-full max-w-md space-y-2">
          {#each files as file}
            <div class="flex items-center justify-between p-3 bg-navy rounded-xl border border-white/10 text-xs text-white">
              <div class="flex items-center gap-2">
                <FileText size={16} class="text-emerald" />
                <span class="truncate">{file.name}</span>
              </div>
              <span class="text-slate-dim">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          {/each}
          <button class="w-full btn-primary py-3 mt-4" onclick={startAnalysis}>Run AI Audit ⚡</button>
        </div>
      {/if}
    </div>
  {:else if step === 'analyzing'}
    <div class="card-premium p-24 flex flex-col items-center justify-center text-center space-y-8" in:fade>
      <div class="relative">
        <div class="w-32 h-32 rounded-full border-4 border-emerald/20 border-t-emerald animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center text-4xl">🤖</div>
      </div>
      <div class="space-y-2">
        <h3 class="text-2xl font-heading font-black text-white">AI Analysis in Progress...</h3>
        <p class="text-slate-dim">OCR Extraction · Fraud Detection · Tax Reconciliation</p>
      </div>
      <div class="w-full max-w-md bg-white/5 h-2 rounded-full overflow-hidden">
        <div class="h-full bg-emerald w-1/2 animate-progress"></div>
      </div>
    </div>
  {:else}
    <div class="grid lg:grid-cols-3 gap-8" in:fly={{ y: 20, duration: 600 }}>
      <!-- Result Overview -->
      <div class="lg:col-span-2 space-y-8">
        <div class="card-premium p-8 border-emerald/20 bg-emerald/5">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-16 h-16 rounded-2xl bg-emerald flex items-center justify-center text-3xl shadow-lg shadow-emerald/20">✅</div>
            <div>
              <h3 class="text-2xl font-heading font-black text-white">Audit Complete</h3>
              <p class="text-emerald font-bold">Score: 84/100 · 3 Findings Found</p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 bg-navy rounded-2xl border border-white/5">
              <div class="text-[10px] text-slate-dim font-bold uppercase tracking-widest mb-1">Documents</div>
              <div class="text-2xl font-heading font-bold text-white">{files.length}</div>
            </div>
            <div class="p-4 bg-navy rounded-2xl border border-white/5">
              <div class="text-[10px] text-slate-dim font-bold uppercase tracking-widest mb-1">Processing Time</div>
              <div class="text-2xl font-heading font-bold text-white">2.4s</div>
            </div>
            <div class="p-4 bg-navy rounded-2xl border border-white/5">
              <div class="text-[10px] text-slate-dim font-bold uppercase tracking-widest mb-1">Accuracy</div>
              <div class="text-2xl font-heading font-bold text-white">99.8%</div>
            </div>
          </div>
        </div>

        <div class="card-premium p-8">
          <h3 class="text-xl font-heading font-bold text-white mb-6">Key Findings 🔎</h3>
          <div class="space-y-4">
            {#each findings as finding}
              <div class={cn("p-6 rounded-2xl border flex gap-4", 
                finding.color === 'danger' ? "bg-danger/5 border-danger/20" : 
                finding.color === 'gold' ? "bg-gold/5 border-gold/20" : "bg-info/5 border-info/20")}>
                <div class="text-3xl shrink-0">{finding.emoji}</div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <span class={cn("text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-lg", 
                      finding.color === 'danger' ? "bg-danger/10 text-danger" : 
                      finding.color === 'gold' ? "bg-gold/10 text-gold" : "bg-info/10 text-info")}>
                      {finding.category} · {finding.severity}
                    </span>
                  </div>
                  <p class="text-white font-medium">{finding.message}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Action Sidebar -->
      <div class="space-y-8">
        <div class="card-premium p-8 bg-linear-to-br from-gold/10 to-transparent border-gold/20">
          <h4 class="text-xl font-heading font-bold text-white mb-4">Need Verification? 📜</h4>
          <p class="text-sm text-slate-dim mb-6">Connect with a certified auditor to verify these findings and sign off on your report.</p>
          <button class="w-full btn-primary bg-gold text-navy font-bold py-4 rounded-xl shadow-lg shadow-gold/20">
            Find Auditor 👨‍💼
          </button>
        </div>

        <div class="card-premium p-8">
          <h4 class="text-xl font-heading font-bold text-white mb-4">Export Report 📄</h4>
          <div class="space-y-3">
            <button class="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 transition-all">
              <span>PDF Audit Report</span>
              <FileText size={16} />
            </button>
            <button class="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 transition-all">
              <span>Excel Data Export</span>
              <FileText size={16} />
            </button>
          </div>
          <button class="w-full btn-secondary py-3 mt-6" onclick={() => step = 'upload'}>
            Start New Audit 🔄
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  .animate-progress {
    animation: progress 2s infinite linear;
  }
</style>
