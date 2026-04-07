<script lang="ts">
  let { 
    title = "FinancialAuditor - AI-Powered Financial Intelligence Platform", 
    description = "Audit smarter and grow faster with Nigeria's #1 AI financial intelligence platform. FIRS-compliant reporting and ICAN-certified auditors.",
    url = "https://financialauditor.ewinproject.org",
    type = "WebApplication",
    image = "/og-image.png"
  } = $props();

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "FinancialAuditor",
    "url": url,
    "description": description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NGN"
    },
    "author": {
      "@type": "Organization",
      "name": "E-WIN Project"
    }
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={image} />

  <!-- Structured Data -->
  <script type="application/ld+json">
    {JSON.stringify(schemaMarkup)}
  </script>
</svelte:head>
