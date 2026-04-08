<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    ShieldCheck, Upload, FileText, Loader2, AlertCircle, 
    CheckCircle2, Sparkles, ArrowRight, Trash2, Search,
    FileSearch, Info, History, Download
  } from 'lucide-svelte';
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
    }, 3500);
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

<div class="space-y-10 pb-20" in:fade>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
        <FileSearch size={12} />
        Multi-Modal Intelligence
      </div>
      <h1 class="text-3xl md:text-4xl font-heading font-black text-foreground tracking-tight">AI Audit Engine</h1>
      <p class="text-muted-foreground font-medium">Deploy world-class AI to analyze, categorize, and verify enterprise records.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="btn-secondary py-2.5 px-5 text-sm flex items-center gap-2">
        <History size={16} />
        Audit History
      </button>
    </div>
  </div>

  {#if step === 'upload'}
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Upload Zone -->
      <div class="lg:col-span-2 space-y-6">
        <div 
          role="region"
          aria-label="File upload area"
          class={cn(
            "card-premium p-16 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-500 min-h-[440px] relative group",
            isDragging ? "border-primary bg-primary/5 scale-[0.99] shadow-glow" : "border-border bg-muted/30"
          )}
          ondragover={(e) => { e.preventDefault(); isDragging = true; }}
          ondragleave={() => isDragging = false}
          ondrop={handleFileDrop}
        >
          <div class="w-24 h-24 rounded-[32px] bg-primary/10 text-primary flex items-center justify-center mb-8 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform duration-500">
            <Upload size={36} />
          </div>
          <h3 class="text-2xl font-heading font-black text-foreground mb-3 tracking-tight">Ingest Documents for Analysis</h3>
          <p class="text-muted-foreground font-medium max-w-sm mb-10 leading-relaxed">
            Drag & drop enterprise invoices, bank statements, or CAC records. <br/> 
            <span class="text-[10px] font-black uppercase tracking-widest opacity-60">PDF · JPG · PNG · XLSX</span>
          </p>
          
          <div class="flex flex-col items-center gap-4 w-full max-w-xs">
            <label class="btn-primary py-4 px-8 text-lg font-black w-full cursor-pointer shadow-xl shadow-primary/20">
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
            <div class="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <ShieldCheck size={12} class="text-primary" />
              AES-256 Encrypted Processing
            </div>
          </div>
        </div>

        {#if files.length > 0}
          <div class="space-y-4" in:slide>
            <div class="flex items-center justify-between px-2">
              <h4 class="text-xs font-black text-muted-foreground uppercase tracking-widest">Selected Records ({files.length})</h4>
              <button class="text-xs font-black text-destructive uppercase tracking-widest hover:opacity-70 transition-opacity" onclick={() => files = []}>Clear All</button>
            </div>
            <div class="grid gap-3">
              {#each files as file, i}
                <div class="flex items-center justify-between p-4 bg-background border border-border rounded-2xl group hover:border-primary/30 transition-all duration-300">
                  <div class="flex items-center gap-4 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileText size={20} />
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-sm font-bold text-foreground truncate">{file.name}</span>
                      <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB · {file.type.split('/')[1].toUpperCase()}</span>
                    </div>
                  </div>
                  <button class="p-2 text-muted-foreground hover:text-destructive transition-colors" onclick={() => removeFile(i)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              {/each}
            </div>
            <button class="w-full btn-primary py-4 text-xl font-black shadow-2xl shadow-primary/20 group" onclick={startAnalysis}>
              Deploy AI Intelligence
              <Sparkles size={20} class="ml-2 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        {/if}
      </div>

      <!-- Info Sidebar -->
      <div class="space-y-8">
        <div class="card-premium p-8 bg-foreground text-background relative overflow-hidden group">
          <div class="absolute -right-6 -bottom-6 text-9xl opacity-[0.05] group-hover:scale-110 transition-transform duration-700">🛡️</div>
          <div class="relative z-10 space-y-6">
            <h4 class="text-xl font-heading font-black text-white tracking-tight">Enterprise Privacy.</h4>
            <p class="text-sm text-muted-foreground font-medium leading-relaxed">
              All documents are processed on secure edge nodes. No sensitive financial data is stored without explicit encryption.
            </p>
            <div class="space-y-4 pt-4 border-t border-white/10">
              <div class="flex items-center gap-3 text-xs font-bold text-white">
                <CheckCircle2 size={16} class="text-primary" /> FIRS Schema Compliant
              </div>
              <div class="flex items-center gap-3 text-xs font-bold text-white">
                <CheckCircle2 size={16} class="text-primary" /> Automated CAC Verification
              </div>
              <div class="flex items-center gap-3 text-xs font-bold text-white">
                <CheckCircle2 size={16} class="text-primary" /> Immutable Audit Trail
              </div>
            </div>
          </div>
        </div>

        <div class="card-premium p-8 space-y-6">
          <div class="flex items-center gap-3 text-primary">
            <Info size={20} />
            <h4 class="text-sm font-black uppercase tracking-widest">System Capabilities</h4>
          </div>
          <div class="space-y-4">
            <div class="p-4 bg-muted rounded-xl border border-transparent hover:border-border transition-all">
              <div class="text-xs font-bold text-foreground mb-1">OCR EXTRACTION</div>
              <p class="text-[11px] text-muted-foreground font-medium">Supports handwritten and printed text with 99.8% accuracy.</p>
            </div>
            <div class="p-4 bg-muted rounded-xl border border-transparent hover:border-border transition-all">
              <div class="text-xs font-bold text-foreground mb-1">ANOMALY DETECTION</div>
              <p class="text-[11px] text-muted-foreground font-medium">Identifies pattern deviations and potential fraud in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else if step === 'analyzing'}
    <div class="card-premium p-32 flex flex-col items-center justify-center text-center space-y-10" in:fade>
      <div class="relative">
        <div class="w-40 h-40 rounded-full border-4 border-primary/10 border-t-primary animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center text-5xl animate-bounce">🤖</div>
      </div>
      <div class="space-y-3">
        <h3 class="text-3xl font-heading font-black text-foreground tracking-tight">AI Analysis in Progress</h3>
        <p class="text-muted-foreground font-medium max-w-sm">Synchronizing OCR Extraction · Fraud Detection · Tax Reconciliation Engines...</p>
      </div>
      <div class="w-full max-w-md bg-muted h-3 rounded-full overflow-hidden border border-border">
        <div class="h-full bg-primary w-1/2 animate-progress"></div>
      </div>
      <div class="flex gap-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
        <span class="animate-pulse">Loading Models</span>
        <span class="animate-pulse delay-75">Parsing Data</span>
        <span class="animate-pulse delay-150">Verifying Compliance</span>
      </div>
    </div>
  {:else}
    <div class="grid lg:grid-cols-3 gap-8" in:fly={{ y: 20, duration: 600 }}>
      <!-- Result Overview -->
      <div class="lg:col-span-2 space-y-8">
        <div class="card-premium p-10 border-primary/20 bg-primary/5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
            <CheckCircle2 size={160} />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-6 mb-10">
              <div class="w-20 h-20 rounded-[32px] bg-primary text-white flex items-center justify-center text-4xl shadow-2xl shadow-primary/30 group-hover:rotate-12 transition-transform">✅</div>
              <div class="space-y-1">
                <h3 class="text-3xl font-heading font-black text-foreground tracking-tight">Intelligence Audit Complete</h3>
                <div class="flex items-center gap-3">
                  <span class="text-lg font-black text-primary">Score: 84/100</span>
                  <span class="opacity-20 text-foreground">|</span>
                  <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest">3 Priority Findings Found</span>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-6">
              <div class="p-6 bg-background rounded-3xl border border-border shadow-sm">
                <div class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Documents Analyzed</div>
                <div class="text-3xl font-heading font-black text-foreground">{files.length}</div>
              </div>
              <div class="p-6 bg-background rounded-3xl border border-border shadow-sm">
                <div class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">AI Latency</div>
                <div class="text-3xl font-heading font-black text-foreground">2.4s</div>
              </div>
              <div class="p-6 bg-background rounded-3xl border border-border shadow-sm">
                <div class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">OCR Accuracy</div>
                <div class="text-3xl font-heading font-black text-foreground">99.8%</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-premium p-10">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-heading font-black text-foreground flex items-center gap-3">
              <AlertCircle size={24} class="text-primary" />
              Critical Intelligence Findings
            </h3>
            <button class="btn-ghost text-xs font-black uppercase tracking-widest">Clear Log</button>
          </div>
          <div class="space-y-6">
            {#each findings as finding}
              <div class={cn(
                "p-8 rounded-[32px] border flex gap-6 group transition-all duration-300", 
                finding.color === 'destructive' ? "bg-destructive/5 border-destructive/10 hover:border-destructive/30" : 
                finding.color === 'brand' ? "bg-brand-500/5 border-brand-500/10 hover:border-brand-500/30" : "bg-info/5 border-info/10 hover:border-info/30"
              )}>
                <div class="text-4xl shrink-0 group-hover:scale-110 transition-transform duration-300">{finding.emoji}</div>
                <div class="flex-1 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border", 
                      finding.color === 'destructive' ? "bg-destructive/10 text-destructive border-destructive/20" : 
                      finding.color === 'brand' ? "bg-brand-500/10 text-brand-600 border-brand-500/20" : "bg-info/10 text-info border-info/20"
                    )}>
                      {finding.category} · {finding.severity} SEVERITY
                    </span>
                  </div>
                  <p class="text-foreground font-semibold leading-relaxed text-lg">{finding.message}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Result Action Sidebar -->
      <div class="space-y-8">
        <div class="card-premium p-8 bg-gradient-to-br from-brand-500/10 to-transparent border-brand-500/20 relative group">
          <div class="absolute -right-6 -bottom-6 text-9xl opacity-[0.05] group-hover:scale-110 transition-transform duration-700">🤝</div>
          <h4 class="text-xl font-heading font-black text-foreground mb-4">Request Verification? 📜</h4>
          <p class="text-sm text-muted-foreground font-medium mb-8 leading-relaxed">
            Connect with a certified ICAN auditor to verify these intelligence findings and sign off on your enterprise report.
          </p>
          <a href="/marketplace" class="w-full btn-primary bg-brand-600 hover:bg-brand-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-500/20 block text-center uppercase tracking-widest">
            Deploy Expert Auditor 👨‍💼
          </a>
        </div>

        <div class="card-premium p-8">
          <h4 class="text-lg font-heading font-black text-foreground mb-6">Export Intelligence 📄</h4>
          <div class="space-y-3">
            <button class="w-full flex items-center justify-between p-4 bg-muted hover:bg-background border border-transparent hover:border-border rounded-2xl text-sm font-bold text-foreground transition-all group">
              <span class="flex items-center gap-3">
                <FileText size={18} class="text-primary" />
                PDF Comprehensive Report
              </span>
              <Download size={16} class="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button class="w-full flex items-center justify-between p-4 bg-muted hover:bg-background border border-transparent hover:border-border rounded-2xl text-sm font-bold text-foreground transition-all group">
              <span class="flex items-center gap-3">
                <FileText size={18} class="text-primary" />
                Excel Financial Dataset
              </span>
              <Download size={16} class="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <button class="w-full btn-secondary py-4 mt-8 font-black uppercase tracking-widest" onclick={() => { step = 'upload'; files = []; }}>
            Restart Audit Cycle 🔄
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
    animation: progress 2.5s infinite linear;
  }
</style>
