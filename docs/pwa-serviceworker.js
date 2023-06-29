// Service Worker のバージョンとキャッシュする App Shell を定義する

const NAME = 'credit-card-form-chaches';
const VERSION = '1.0.0';
const CACHE_NAME = NAME + ':' + VERSION;
const urlsToCache = [
  './',
  './index.html',
  './bootstrap.min.css',
];

// Service Worker へファイルをインストール

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// リクエストされたファイルが Service Worker にキャッシュされている場合
// キャッシュからレスポンスを返す

self.addEventListener('fetch', event =>  {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')
    return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// キャッシュのバージョンが変わった場合、古いキャッシュを削除する

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        const parts = cacheName.split(':');
        const version = parts.pop();
        const name = parts.join(':');
        if (name === NAME && version !== VERSION) {
          return caches.delete(cacheName);
        }
      })
    )).then(() => {
      console.log(CACHE_NAME + "activated");
    })
  );
});
