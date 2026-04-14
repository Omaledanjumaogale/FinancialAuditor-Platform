import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import path from 'path';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST }), svelteTesting()],

  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['src/**/*.e2e.{ts,js}', '**/node_modules/**'],
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],

    // ── Coverage thresholds: ≥ 90% on all key metrics ─────────────────────
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/lib/**/*.{ts,svelte}', 'src/routes/**/*.{ts,svelte}'],
      exclude: [
        'src/lib/services/llm.ts',   // server-only — no browser API to test
        'src/**/*.d.ts',
        'src/**/__tests__/**',
        '**/node_modules/**',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },

    alias: {
      $lib: path.resolve(__dirname, './src/lib'),
      $convex: path.resolve(__dirname, './convex'),
      '$app/environment': path.resolve(__dirname, './src/__mocks__/app-environment.ts'),
      '$app/stores': path.resolve(__dirname, './src/__mocks__/app-stores.ts'),
      '$env/static/public': path.resolve(__dirname, './src/__mocks__/env-static-public.ts'),
      '$env/dynamic/public': path.resolve(__dirname, './src/__mocks__/env-dynamic-public.ts'),
    },
  },
});
