import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: 5173,
		strictPort: true,
		host: true,
		fs: {
			// Allow serving files from the project root and node_modules
			// This fixes 403 Forbidden errors on deeply nested Windows paths
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
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						if (id.includes('lucide-svelte')) return 'icons';
						if (id.includes('firebase')) return 'firebase';
						if (id.includes('convex')) return 'convex';
						return 'vendor';
					}
				}
			}
		}
	}
});

