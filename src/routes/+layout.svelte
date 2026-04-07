<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import MobileNav from '$lib/components/layout/MobileNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	let { children } = $props();

	// Check if we're on a dashboard or admin page to show sidebar
	let showSidebar = $derived(page.url.pathname.startsWith('/dashboard') || page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>FinancialAuditor — AI-Powered Financial Intelligence Platform</title>
</svelte:head>

<div class="flex min-h-screen bg-surface-50">
	{#if showSidebar}
		<Sidebar />
	{/if}

	<div class={cn("flex-1 flex flex-col min-w-0", showSidebar && "md:pl-64")}>
		<Header />
		
		<main class="flex-1 pb-20 lg:pb-0">
			{@render children()}
		</main>

		{#if !showSidebar}
			<Footer />
		{/if}
	</div>
</div>

<MobileNav />
