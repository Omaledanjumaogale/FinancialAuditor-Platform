import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],

  server: {
    port: 5173,
    strictPort: false, // allow fallback port if 5173 is taken
    host: true,
    fs: {
      allow: [
        path.resolve(__dirname, '.'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '.svelte-kit'),
      ],
      strict: false,
    },
  },

  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Raise chunk size warning threshold — enterprise apps are larger
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // ── Differential serving: split heavy deps into separate cacheable chunks
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined;
          // Chart / visualisation libraries — lazily imported
          if (id.includes('chart.js') || id.includes('chartjs')) return 'charts';
          // Icon library — large, rarely changes
          if (id.includes('lucide-svelte')) return 'icons';
          // Firebase split: core vs auth vs firestore
          if (id.includes('firebase/auth')) return 'firebase-auth';
          if (id.includes('firebase/app')) return 'firebase-core';
          if (id.includes('firebase')) return 'firebase-misc';
          // Convex client
          if (id.includes('convex')) return 'convex';
          // Bits UI component library
          if (id.includes('bits-ui')) return 'ui';
          // Everything else from node_modules
          return 'vendor';
        },
      },
    },
  },

  // ── Performance: pre-bundle heavy deps to avoid repeated transforms in dev ──
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'convex/browser',
      'convex-svelte',
      'lucide-svelte',
    ],
    exclude: ['@sveltejs/kit'],
  },
});
