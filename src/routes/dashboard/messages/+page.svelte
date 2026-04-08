<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Search, MoreHorizontal, Send, Paperclip, 
    Smile, ShieldCheck, CheckCircle2, Clock,
    User, Phone, Mail, Globe, Sparkles
  } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';
  import { useQuery, useConvexClient } from "convex-svelte";
  import { api } from "$convex/_generated/api";

  const userQuery = $derived(
    authState.user ? useQuery(api.users.getByUid, { uid: authState.user.uid }) : null
  );
  const currentUser = $derived(userQuery?.data);

  const client = useConvexClient();

  // For now, we'll just mock a contact list
  const contacts = [
    { id: '1', name: 'Dr. Chima Eze', role: 'Tax Auditor', status: 'online', emoji: '👨‍💼', lastMsg: 'The FIRS report is ready for review.' },
    { id: '2', name: 'Sarah Alabi', role: 'Compliance Officer', status: 'offline', emoji: '👩‍💼', lastMsg: 'Please sign the CAC documents.' },
    { id: '3', name: 'Musa Bello', role: 'Legal Consultant', status: 'online', emoji: '👨‍💻', lastMsg: 'Audit trail verified successfully.' }
  ];

  let selectedContactId = $state(contacts[0].id);
  const selectedContact = $derived(contacts.find(c => c.id === selectedContactId));

  let newMessage = $state('');

  async function handleSend() {
    if (!newMessage.trim() || !currentUser) return;
    
    // In a real app, we'd have the receiverId from the selected contact
    // For this demo, we'll just log it or simulate sending
    // await client.mutation(api.messages.send, { senderId: currentUser._id, receiverId: ..., content: newMessage });
    newMessage = '';
  }
</script>

<div class="h-[calc(100vh-180px)] flex gap-8 relative z-10" in:fade>
  <!-- Contacts Sidebar -->
  <div class="w-80 flex flex-col gap-6 h-full">
    <div class="space-y-2">
      <h2 class="text-2xl font-heading font-black text-white tracking-tight">Intelligence <span class="text-emerald">Chat</span></h2>
      <p class="text-xs text-slate-dim font-medium uppercase tracking-widest">Secure Auditor Connectivity</p>
    </div>

    <div class="card-premium p-2 bg-surface/50 border-white/5 flex items-center gap-3">
      <Search class="ml-3 text-slate-dim" size={16} />
      <input type="text" placeholder="Search contacts..." class="w-full bg-transparent border-none py-2.5 text-sm text-white placeholder:text-slate-dim focus:outline-none" />
    </div>

    <div class="flex-1 overflow-y-auto card-premium bg-surface/40 backdrop-blur-sm border-white/10 p-2 space-y-1">
      {#each contacts as contact}
        <button 
          onclick={() => selectedContactId = contact.id}
          class={cn(
            "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
            selectedContactId === contact.id ? "bg-emerald/10 border border-emerald/20" : "hover:bg-white/5 border border-transparent"
          )}
        >
          <div class="relative">
            <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {contact.emoji}
            </div>
            {#if contact.status === 'online'}
              <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald rounded-full border-4 border-navy shadow-sm"></div>
            {/if}
          </div>
          <div class="flex-1 text-left min-w-0">
            <div class="text-sm font-bold text-white truncate">{contact.name}</div>
            <div class="text-[10px] text-slate-dim font-medium uppercase tracking-wider truncate">{contact.role}</div>
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Chat Area -->
  <div class="flex-1 flex flex-col card-premium bg-surface/40 backdrop-blur-xl border-white/10 overflow-hidden relative">
    <!-- Chat Header -->
    <div class="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center text-2xl">
          {selectedContact?.emoji}
        </div>
        <div>
          <h3 class="text-lg font-heading font-black text-white leading-tight">{selectedContact?.name}</h3>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald"></span>
            <span class="text-[10px] font-black text-emerald uppercase tracking-widest">Active Intelligence Node</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button class="p-2.5 rounded-xl bg-white/5 text-slate-dim hover:text-white transition-all border border-white/5">
          <Phone size={18} />
        </button>
        <button class="p-2.5 rounded-xl bg-white/5 text-slate-dim hover:text-white transition-all border border-white/5">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-8 space-y-8">
      <div class="flex flex-col items-center gap-4 py-10">
        <div class="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-slate-dim uppercase tracking-widest">
          End-to-End Encrypted Secure Channel
        </div>
      </div>

      <!-- Mock Messages -->
      <div class="flex gap-4 max-w-[80%]">
        <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg flex-shrink-0">
          {selectedContact?.emoji}
        </div>
        <div class="space-y-2">
          <div class="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-slate text-sm font-medium leading-relaxed">
            Hello Adaeze, I've analyzed the Q1 logistics data. There's a slight discrepancy in the VAT calculations for the Lagos deliveries.
          </div>
          <span class="text-[9px] font-black text-slate-dim uppercase tracking-widest ml-1">10:24 AM</span>
        </div>
      </div>

      <div class="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
        <div class="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center text-lg flex-shrink-0 text-emerald">
          👩‍💼
        </div>
        <div class="space-y-2 text-right">
          <div class="bg-emerald text-navy p-4 rounded-2xl rounded-tr-none text-sm font-bold leading-relaxed shadow-glow">
            Thanks for the heads up, Chima. Is it something the AI can automatically reconcile or do we need manual intervention?
          </div>
          <span class="text-[9px] font-black text-slate-dim uppercase tracking-widest mr-1">10:26 AM</span>
        </div>
      </div>

      <div class="flex gap-4 max-w-[80%]">
        <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg flex-shrink-0">
          {selectedContact?.emoji}
        </div>
        <div class="space-y-2">
          <div class="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-slate text-sm font-medium leading-relaxed">
            The AI can handle it. I've just pushed the reconciliation script. You should see an updated audit trail in the Ledger section in about 5 minutes.
          </div>
          <span class="text-[9px] font-black text-slate-dim uppercase tracking-widest ml-1">10:30 AM</span>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-6 bg-white/[0.02] border-t border-white/5">
      <div class="card-premium p-2 bg-surface/80 border-white/10 flex items-center gap-2 group focus-within:border-emerald/40 transition-all duration-500">
        <button class="p-3 text-slate-dim hover:text-white transition-colors">
          <Paperclip size={20} />
        </button>
        <input 
          type="text" 
          bind:value={newMessage}
          placeholder="Type your message to the auditor..." 
          class="flex-1 bg-transparent border-none py-3 text-base text-white placeholder:text-slate-dim focus:outline-none font-medium tracking-tight"
          onkeydown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button class="p-3 text-slate-dim hover:text-white transition-colors">
          <Smile size={20} />
        </button>
        <button 
          onclick={handleSend}
          class="bg-emerald text-navy p-3.5 rounded-xl shadow-glow hover:scale-105 active:scale-95 transition-all"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .shadow-glow {
    box-shadow: 0 0 20px -5px rgba(0, 200, 150, 0.4);
  }
</style>
