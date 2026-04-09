<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Search, Star, MapPin, ShieldCheck, Clock, Filter, ArrowRight } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { useQuery } from 'convex-svelte';
  import { api } from '$convex/_generated/api';

  const auditorsQuery = useQuery(api.auditors.list, {});
  const auditors = $derived(auditorsQuery?.data || []);
  const isLoading = $derived(!auditorsQuery || auditorsQuery.isLoading);

  let searchQuery = $state('');
  let filterSpecialty = $state('all');

  const specialties = ['all', 'Tax', 'FIRS', 'Payroll', 'Forensic', 'CAC'];

  const mockAuditors = [
    { _id: '1', name: 'Dr. Chima Eze',       specialty: 'FIRS Compliance',  rating: 4.9, reviews: 124, rate: 85000,  location: 'Lagos',  verified: true,  initials: 'CE', bio: '15 years FIRS expertise, ex-KPMG Nigeria senior partner.' },
    { _id: '2', name: 'Ada Okonkwo CPA',     specialty: 'Tax Advisory',     rating: 4.8, reviews: 98,  rate: 65000,  location: 'Abuja',  verified: true,  initials: 'AO', bio: 'CPA certified, specializes in corporate tax optimization.' },
    { _id: '3', name: 'Emeka Nwachukwu',     specialty: 'Payroll Audit',    rating: 4.7, reviews: 76,  rate: 55000,  location: 'Lagos',  verified: true,  initials: 'EN', bio: 'Expert in payroll compliance and pension fund auditing.' },
    { _id: '4', name: 'Funmi Adebayo',       specialty: 'Forensic Audit',   rating: 4.9, reviews: 143, rate: 95000,  location: 'Lagos',  verified: true,  initials: 'FA', bio: 'Fraud detection specialist, ACCA and ICAN certified.' },
    { _id: '5', name: 'Michael Okafor',      specialty: 'CAC Compliance',   rating: 4.6, reviews: 61,  rate: 45000,  location: 'Port Harcourt', verified: true, initials: 'MO', bio: 'CAC filing and corporate secretarial services expert.' },
    { _id: '6', name: 'Ngozi Eze-Okafor',    specialty: 'Tax Advisory',     rating: 4.7, reviews: 87,  rate: 70000,  location: 'Enugu',  verified: false, initials: 'NO', bio: 'SMEDAN accredited advisor for small business compliance.' },
  ];

  const displayAuditors = $derived(!isLoading && auditors.length === 0 ? mockAuditors : auditors);

  const filtered = $derived(
    displayAuditors.filter(a => {
      const matchSearch = !searchQuery ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = filterSpecialty === 'all' || a.specialty?.includes(filterSpecialty);
      return matchSearch && matchFilter;
    })
  );
</script>

<svelte:head>
  <title>Marketplace — FinancialAuditor</title>
</svelte:head>

<div class="pb-16" in:fly={{ y: 10, duration: 300 }}>

  <!-- Hero -->
  <div class="text-center pt-20 pb-12 px-4 relative">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.12), transparent)" aria-hidden="true"></div>
    <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border mb-5 border-emerald/30" style="background:rgba(16,185,129,0.1);color:#6ee7b7">
      <ShieldCheck size={12} aria-hidden="true" />
      500+ ICAN-Certified Auditors
    </span>
    <h1 class="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight">
      Find your <span class="text-emerald">expert auditor</span>
    </h1>
    <p class="text-slate-dim text-base mt-4 max-w-xl mx-auto">
      Connect with verified, ICAN-certified financial professionals. Bid-based system — auditors compete for your business.
    </p>

    <!-- Search Bar -->
    <div class="mt-8 max-w-lg mx-auto flex gap-3">
      <div class="relative flex-1">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-dim" size={16} aria-hidden="true" />
        <input
          type="search"
          bind:value={searchQuery}
          placeholder="Search by name or specialty..."
          class="w-full py-3.5 pl-11 pr-4 text-sm rounded-xl border border-white/10 text-white placeholder-slate-dim focus:border-emerald/40 focus:outline-none transition-colors"
          style="background-color:#111827;"
          aria-label="Search auditors"
        />
      </div>
    </div>
  </div>

  <!-- Specialty Filters -->
  <div class="max-w-5xl mx-auto px-4 sm:px-6 mb-8 flex flex-wrap gap-2">
    {#each specialties as spec (spec)}
      <button
        onclick={() => filterSpecialty = spec}
        class={cn('px-4 py-2 text-sm rounded-xl border font-medium capitalize transition-all',
          filterSpecialty === spec
            ? 'bg-emerald text-white border-emerald'
            : 'border-white/10 text-slate hover:text-white hover:bg-white/5'
        )}
      >
        {spec === 'all' ? 'All Specialties' : spec}
      </button>
    {/each}
  </div>

  <!-- Results Count -->
  <div class="max-w-5xl mx-auto px-4 sm:px-6 mb-5">
    <p class="text-sm text-slate-dim">{filtered.length} auditor{filtered.length !== 1 ? 's' : ''} found</p>
  </div>

  <!-- Auditor Cards Grid -->
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    {#if isLoading}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {#each [1,2,3,4,5,6] as _ (_)}
          <div class="rounded-2xl border border-white/8 p-5 h-52 animate-pulse" style="background-color:#111827;"></div>
        {/each}
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {#each filtered as auditor, i (auditor._id)}
          <div
            class="rounded-2xl border border-white/8 p-5 space-y-4 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 group"
            style="background-color:#111827;"
            in:fly={{ y: 10, delay: i * 50, duration: 280 }}
          >
            <!-- Header -->
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
                  style="background: linear-gradient(135deg, #059669, #0f2040)">
                  {auditor.initials}
                </div>
                <div>
                  <p class="text-sm font-semibold text-white">{auditor.name}</p>
                  <p class="text-xs text-slate-dim">{auditor.specialty}</p>
                </div>
              </div>
              {#if auditor.verified}
                <ShieldCheck size={16} class="text-emerald shrink-0" aria-label="Verified ICAN member" />
              {/if}
            </div>

            <!-- Bio -->
            <p class="text-xs text-slate-dim leading-relaxed line-clamp-2">{auditor.bio}</p>

            <!-- Details -->
            <div class="flex items-center gap-4 text-xs text-slate-dim">
              <div class="flex items-center gap-1">
                <Star size={11} class="text-amber-400 fill-amber-400" aria-hidden="true" />
                <span class="font-semibold text-white">{auditor.rating}</span>
                <span>({auditor.reviews})</span>
              </div>
              <div class="flex items-center gap-1">
                <MapPin size={11} aria-hidden="true" />
                {auditor.location}
              </div>
              <div class="flex items-center gap-1">
                <Clock size={11} aria-hidden="true" />
                4–6 days
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-1 border-t border-white/8">
              <div>
                <span class="text-xs text-slate-dim">From</span>
                <span class="font-bold text-white text-sm ml-1 tabular-nums">₦{auditor.rate.toLocaleString()}</span>
              </div>
              <button class="flex items-center gap-1 text-xs font-semibold text-emerald hover:underline group-hover:gap-2 transition-all"
                aria-label="Hire {auditor.name}">
                Hire Now
                <ArrowRight size={12} aria-hidden="true" />
              </button>
            </div>
          </div>
        {/each}
      </div>

      {#if filtered.length === 0}
        <div class="text-center py-24">
          <Search size={40} class="mx-auto mb-4 text-slate-dim opacity-30" aria-hidden="true" />
          <p class="text-white font-semibold mb-1">No auditors found</p>
          <p class="text-sm text-slate-dim">Try adjusting your search or specialty filter.</p>
        </div>
      {/if}
    {/if}
  </div>
</div>
