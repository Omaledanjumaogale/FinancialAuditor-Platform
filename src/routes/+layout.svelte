<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>FinancialAuditor — AI-Powered Financial Intelligence Platform</title>
</svelte:head>

<Header />

<main class="min-h-screen pt-24">
	{@render children()}
</main>

<Footer />
