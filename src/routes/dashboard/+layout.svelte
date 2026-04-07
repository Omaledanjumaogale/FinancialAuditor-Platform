<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  let { children } = $props();
</script>

<div class="flex min-h-screen bg-navy overflow-hidden">
  <Sidebar />
  
  <div class="flex-1 flex flex-col md:pl-72 w-full">
    <Header />
    
    <main class="flex-1 pt-[68px] overflow-y-auto w-full">
      <div class="container-custom py-8">
        {@render children()}
      </div>
    </main>
  </div>
</div>
