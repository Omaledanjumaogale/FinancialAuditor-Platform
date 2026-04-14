import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ── Polyfill: element.animate (not available in jsdom) ───────────────────────
if (typeof window !== 'undefined' && !Element.prototype.animate) {
  Element.prototype.animate = () =>
    ({
      finished: Promise.resolve(),
      cancel: () => {},
      play: () => {},
      pause: () => {},
      reverse: () => {},
      onfinish: null,
      oncancel: null,
    }) as unknown as Animation;
}

// ── Mock: $lib/firebase — prevents real Firebase init in tests ────────────────
vi.mock('$lib/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  },
}));

// ── Mock: $lib/convex.ts — browser-only WebSocket client ─────────────────────
vi.mock('$lib/convex.ts', () => ({
  convexClient: null,
}));

// ── Mock: convex-svelte — context provider not needed in unit tests ───────────
vi.mock('convex-svelte', () => ({
  setupConvex: vi.fn(),
  useConvexClient: vi.fn(() => ({
    query: vi.fn(),
    mutation: vi.fn(),
    action: vi.fn(),
  })),
  useQuery: vi.fn(() => ({ data: null, isLoading: false, error: null })),
  useMutation: vi.fn(() => vi.fn()),
}));

// ── Mock: $convex/_generated/api — generated Convex API types ─────────────────
vi.mock('$convex/_generated/api', () => ({
  api: {
    users: { store: 'users:store', get: 'users:get' },
    audits: { getByUserId: 'audits:getByUserId', create: 'audits:create' },
    payments: { getByUserId: 'payments:getByUserId' },
  },
}));
