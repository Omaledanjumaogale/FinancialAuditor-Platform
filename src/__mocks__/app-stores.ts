// Mock $app/stores for vitest
import { readable, writable } from 'svelte/store';

export const page = readable({
  url: new URL('http://localhost/'),
  params: {},
  status: 200,
  error: null,
  data: {},
  route: { id: '/' },
  form: undefined,
});

export const navigating = readable(null);
export const updated = readable(false);
