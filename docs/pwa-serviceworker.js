// Define chaches name, version and files to cache

const NAME = 'credit-card-form-chaches';
const VERSION = '1.0.0';
const CACHE_NAME = NAME + ':' + VERSION;
const urlsToCache = [
  './',
  './index.html',
  './bootstrap.min.css',
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});


// Use Service Worker to cache files
self.addEventListener('fetch', event => {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')
    return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


// Update Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        const parts = cacheName.split(':');
        const version = parts.pop();
        const name = parts.join(':');
        if (name === NAME && version !== VERSION)
          return caches.delete(cacheName);
      }))
    )
  );
});
