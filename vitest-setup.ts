import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Polyfill for element.animate
if (typeof window !== 'undefined' && !Element.prototype.animate) {
  Element.prototype.animate = () => ({
    finished: Promise.resolve(),
    cancel: () => {},
    play: () => {},
    pause: () => {},
    reverse: () => {},
    onfinish: null,
    oncancel: null,
  }) as any;
}

// Mock Svelte 5 runes if needed (Vitest usually handles this with the svelte plugin)
// Mock environment variables
vi.mock('$env/static/public', () => ({
  PUBLIC_CONVEX_URL: 'https://placeholder.convex.cloud',
  PUBLIC_FIREBASE_API_KEY: 'test-api-key',
  PUBLIC_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com',
  PUBLIC_FIREBASE_PROJECT_ID: 'test-project',
  PUBLIC_FIREBASE_STORAGE_BUCKET: 'test-project.appspot.com',
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '123456789',
  PUBLIC_FIREBASE_APP_ID: '1:123456789:web:abcdef',
}));
