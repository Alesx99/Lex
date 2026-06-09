const CACHE_NAME = 'lex-cache-v10';
const ASSETS = [
  './',
  './index.html',
  './achievements.html',
  './planner.html',
  './secret_puzzle.html',
  './style.css',
  './js/lex_core.js',
  './js/lex_core.css',
  './js/search_db.js',
  './js/quiz_db.js',
  './js/glossary_db.js',
  './arte_romana/index.html',
  './arte_romana/style.css',
  './arte_romana/quiz.html',
  './arte_romana/connections.html',
  './minigames.html',
  './js/minigames.js'
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
  // Skip non-GET requests (like POST calls to APIs)
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip remote third-party APIs (like Gemini, NVIDIA NIM, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
