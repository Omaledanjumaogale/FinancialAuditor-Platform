/**
 * FinancialAuditor — Service Worker
 * ===================================
 * Strategy:
 *   - App shell (HTML, JS, CSS): Cache-First for speed
 *   - API calls (/api/*):        Network-First, no caching (always fresh)
 *   - Static assets (_app/*):    Immutable cache — versioned hashes
 *   - Fonts / CDN:               Stale-While-Revalidate
 *
 * Offline: Shows cached pages. API failures return graceful JSON errors.
 */

const CACHE_NAME = 'fa-v1';
const STATIC_CACHE = 'fa-static-v1';
const FONT_CACHE = 'fa-fonts-v1';

// App shell resources to pre-cache on install
const APP_SHELL = ['/', '/auth', '/manifest.json', '/favicon.ico'];

// ── Install: pre-cache app shell ────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: delete old caches ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  const validCaches = [CACHE_NAME, STATIC_CACHE, FONT_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !validCaches.includes(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: route-based caching strategy ─────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests (except fonts/CDN)
  if (request.method !== 'GET') return;

  // ── API calls: Network-First, never cache ────────────────────────────────
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(JSON.stringify({ error: 'You are offline. Please reconnect.' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );
    return;
  }

  // ── Immutable static assets (_app/ has content hashed filenames) ─────────
  if (url.pathname.startsWith('/_app/immutable/')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      })
    );
    return;
  }

  // ── Google Fonts: Stale-While-Revalidate ────────────────────────────────
  if (url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request).then((fresh) => {
          if (fresh.ok) cache.put(request, fresh.clone());
          return fresh;
        });
        return cached ?? networkFetch;
      })
    );
    return;
  }

  // ── App shell (HTML pages): Cache-First with network update ─────────────
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request)
        .then((fresh) => {
          if (fresh.ok) cache.put(request, fresh.clone());
          return fresh;
        })
        .catch(() => cached);
      return cached ?? networkFetch;
    })
  );
});
