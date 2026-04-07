<script lang="ts">
  let { title, description, url, type = 'website' } = $props();

  const siteName = "FinancialAuditor";
  
  // Use derived for reactivity in Svelte 5
  let fullTitle = $derived(`${title} | ${siteName}`);
  let currentDescription = $derived(description);
  let currentUrl = $derived(url || "https://financialauditor.ewinproject.org");

  let jsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": siteName,
    "description": currentDescription,
    "applicationCategory": "BusinessApplication, FinancialApplication",
    "operatingSystem": "All",
    "url": currentUrl,
    "author": {
      "@type": "Organization",
      "name": "FinancialAuditor Nigeria"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NGN"
    }
  });
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={currentDescription} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={currentDescription} />
  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={siteName} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={currentDescription} />

  <!-- Schema.org JSON-LD -->
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
