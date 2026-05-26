const CACHE_NAME = 'lex-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './js/search_db.js',
  './js/quiz_db.js',
  './js/glossary_db.js',
  './arte_romana/index.html',
  './arte_romana/style.css',
  './arte_romana/quiz.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
