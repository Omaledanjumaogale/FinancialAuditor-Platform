import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: 5173,
		strictPort: true,
		host: true
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
