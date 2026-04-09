<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Send, Search, Lock, MoreVertical, Circle } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { authState } from '$lib/stores/auth.svelte';

  let activeContact = $state(0);
  let messageText   = $state('');

  const contacts = [
    { id: 1, name: 'Dr. Chima Eze',     role: 'ICAN Auditor',        initials: 'CE', online: true,  unread: 2, lastMsg: 'I have reviewed your Q3 reports...' },
    { id: 2, name: 'FIRS Support',       role: 'Government Agency',   initials: 'FS', online: false, unread: 0, lastMsg: 'Your submission has been received.' },
    { id: 3, name: 'Ada Okonkwo CPA',    role: 'Tax Consultant',      initials: 'AO', online: true,  unread: 5, lastMsg: 'Please upload the bank statement' },
    { id: 4, name: 'Platform Support',   role: 'FinancialAuditor',    initials: 'PS', online: true,  unread: 0, lastMsg: 'Welcome! How can we help?' },
  ];

  const threads: Record<number, Array<{ from: 'me' | 'them'; text: string; time: string }>> = {
    1: [
      { from: 'them', text: 'Good afternoon. I have completed the initial review of your Q3 financial statements.', time: '2:14 PM' },
      { from: 'me',   text: 'Thank you Dr. Eze. What are the key findings?', time: '2:17 PM' },
      { from: 'them', text: 'There are minor VAT discrepancies in July. I will send a detailed report shortly.', time: '2:19 PM' },
      { from: 'me',   text: 'Understood. Please include the FIRS reconciliation notes.', time: '2:22 PM' },
      { from: 'them', text: 'Will do. Report will be ready by end of day.', time: '2:25 PM' },
    ],
    2: [
      { from: 'them', text: 'Your VAT return submission for Q3 2025 has been received and is under review.', time: '10:01 AM' },
      { from: 'me',   text: 'Thank you. How long does the review typically take?', time: '10:04 AM' },
      { from: 'them', text: 'Processing takes 5–7 business days. You will receive a confirmation via email.', time: '10:06 AM' },
    ],
    3: [
      { from: 'them', text: 'Hello! Please upload the latest bank statement so I can reconcile the accounts.', time: 'Yesterday' },
      { from: 'me',   text: 'I will upload it this afternoon.', time: 'Yesterday' },
      { from: 'them', text: 'Perfect. Also, could you confirm the opening balance for January?', time: 'Yesterday' },
    ],
    4: [
      { from: 'them', text: 'Welcome to FinancialAuditor! 🎉 Your account is fully set up.', time: 'Apr 1' },
      { from: 'them', text: 'If you need any help navigating the platform, feel free to ask here.', time: 'Apr 1' },
    ],
  };

  let searchQuery = $state('');
  const filteredContacts = $derived(
    contacts.filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  function sendMessage() {
    if (!messageText.trim()) return;
    const thread = threads[contacts[activeContact].id];
    if (thread) {
      thread.push({ from: 'me', text: messageText.trim(), time: 'Now' });
    }
    messageText = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  const currentThread = $derived(threads[contacts[activeContact]?.id] || []);
  const currentContact = $derived(contacts[activeContact]);
</script>

<svelte:head>
  <title>Secure Messages — FinancialAuditor</title>
</svelte:head>

<div class="pb-10" in:fly={{ y: 10, duration: 300 }}>
  <div class="mb-5">
    <h1 class="text-2xl font-heading font-bold text-white tracking-tight">Secure Messages</h1>
    <p class="text-sm text-slate-dim mt-0.5">End-to-end encrypted communication with auditors</p>
  </div>

  <div class="rounded-2xl border border-white/8 overflow-hidden flex" style="background-color:#111827; height: calc(100vh - 220px); min-height: 480px;">

    <!-- Contacts Sidebar -->
    <div class="w-72 shrink-0 flex flex-col border-r border-white/8">
      <!-- Search -->
      <div class="p-3 border-b border-white/8">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dim" size={14} aria-hidden="true" />
          <input
            type="search"
            bind:value={searchQuery}
            placeholder="Search conversations..."
            class="w-full py-2 pl-9 pr-3 text-sm rounded-xl border border-white/8 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
            style="background-color:#1f2937;"
            aria-label="Search contacts"
          />
        </div>
      </div>

      <!-- Contact List -->
      <div class="flex-1 overflow-y-auto" role="navigation" aria-label="Conversations">
        {#each filteredContacts as contact, i (contact.id)}
          <button
            onclick={() => activeContact = i}
            class={cn(
              'w-full text-left px-4 py-3.5 flex items-center gap-3 transition-all border-b border-white/5',
              activeContact === i ? 'bg-emerald/10' : 'hover:bg-white/3'
            )}
            aria-label="Open conversation with {contact.name}"
            aria-current={activeContact === i ? 'true' : undefined}
          >
            <!-- Avatar -->
            <div class="relative shrink-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                style="background: linear-gradient(135deg, #059669, #0f2040)">
                {contact.initials}
              </div>
              {#if contact.online}
                <div class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald border-2" style="border-color:#111827" aria-label="Online"></div>
              {/if}
            </div>
            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-white truncate">{contact.name}</p>
                {#if contact.unread > 0}
                  <span class="text-[10px] font-bold bg-emerald text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0 ml-1">{contact.unread}</span>
                {/if}
              </div>
              <p class="text-xs text-slate-dim truncate mt-0.5">{contact.lastMsg}</p>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Chat Header -->
      <div class="px-5 py-4 border-b border-white/8 flex items-center justify-between shrink-0" style="background-color:#111827;">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
            style="background: linear-gradient(135deg, #059669, #0f2040)">
            {currentContact?.initials}
          </div>
          <div>
            <p class="text-sm font-semibold text-white">{currentContact?.name}</p>
            <p class="text-xs text-slate-dim">{currentContact?.role} · {currentContact?.online ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1 text-xs text-emerald font-medium bg-emerald/10 px-2.5 py-1 rounded-lg border border-emerald/20">
            <Lock size={11} aria-hidden="true" />
            Encrypted
          </div>
          <button class="p-1.5 rounded-lg text-slate hover:text-white hover:bg-white/5 transition-colors" aria-label="More options">
            <MoreVertical size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto px-5 py-5 space-y-4" role="log" aria-label="Message thread" aria-live="polite">
        {#each currentThread as msg, i (i)}
          <div class={cn('flex', msg.from === 'me' ? 'justify-end' : 'justify-start')} in:fly={{ y: 6, duration: 200 }}>
            <!-- Sender label -->
            {#if msg.from === 'them'}
              <div class="flex items-end gap-2 max-w-[75%]">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mb-0.5"
                  style="background: linear-gradient(135deg, #059669, #0f2040)" aria-hidden="true">
                  {currentContact?.initials}
                </div>
                <div>
                  <div class="rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-white" style="background-color:#1f2937; border: 1px solid rgba(255,255,255,0.08)">
                    {msg.text}
                  </div>
                  <p class="text-[10px] text-slate-dim mt-1 pl-1">{msg.time}</p>
                </div>
              </div>
            {:else}
              <div class="max-w-[75%]">
                <div class="rounded-2xl rounded-br-sm px-4 py-3 text-sm text-white" style="background: linear-gradient(135deg, #059669, #047857)">
                  {msg.text}
                </div>
                <p class="text-[10px] text-slate-dim mt-1 pr-1 text-right">{msg.time}</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Input -->
      <div class="px-5 py-4 border-t border-white/8 shrink-0" style="background-color:#111827;">
        <div class="flex items-end gap-3">
          <textarea
            bind:value={messageText}
            onkeydown={handleKeydown}
            placeholder="Type a secure message..."
            rows={1}
            class="flex-1 py-3 px-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none resize-none transition-colors"
            style="background-color:#1f2937; max-height:120px;"
            aria-label="Message input"
          ></textarea>
          <button
            onclick={sendMessage}
            disabled={!messageText.trim()}
            class="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald text-white disabled:opacity-40 hover:bg-emerald-deep transition-all shrink-0 shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
            aria-label="Send message"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </div>
        <p class="text-[10px] text-slate-dim mt-2 flex items-center gap-1">
          <Lock size={9} aria-hidden="true" />
          All messages are end-to-end encrypted
        </p>
      </div>
    </div>
  </div>
</div>
