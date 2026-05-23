const CACHE_NAME = 'lex-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './js/search_db.js',
  './js/quiz_db.js',
  './js/glossary_db.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
