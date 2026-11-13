const CACHE_NAME = 'lex-cache-v32';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './achievements.html',
  './analytics.html',
  './assistant.html',
  './connections.html',
  './easter_eggs.html',
  './exam.html',
  './flashcards.html',
  './minigames.html',
  './planner.html',
  './prohibited.html',
  './secret_puzzle.html',
  './segreti.html',
  './timeline.html',
  './studio_max.html',
  './sleep_study.html',
  './offline.html',
  './js/lex_core.js',
  './js/lex_core.css',
  './js/search_db.js',
  './js/quiz_db.js',
  './js/glossary_db.js',
  './js/chart.umd.min.js',
  './js/minigames.js',
  './js/studio_max.js',
  './js/studio_max.css',
  './js/timeline_db.js',
  './quiz_diritto_new.js',
  './quiz_diritto_new2.js',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.2/marked.min.js',
  
  // Developed Subject: Storia della Filosofia
  './filosofia/index.html',
  './filosofia/style.css',
  './filosofia/quiz.html',
  './filosofia/connections.html',

  // Developed Subject: Arte Romana
  './arte_romana/index.html',
  './arte_romana/style.css',
  './arte_romana/quiz.html',
  './arte_romana/connections.html',
  
  // Developed Subject: Codicologia
  './codicologia/index.html',
  './codicologia/style.css',
  './codicologia/quiz.html',
  './codicologia/connections.html',
  
  // Developed Subject: Letteratura Latina
  './letteratura_latina/index.html',
  './letteratura_latina/style.css',
  './letteratura_latina/quiz.html',
  './letteratura_latina/connections.html',

  // Developed Subject: Diritto
  './diritto/index.html',
  './diritto/style.css',
  './diritto/quiz.html',
  './diritto/connections.html',

  // Developed Subject: Storia Moderna
  './storia/index.html',
  './storia/style.css',
  './storia/quiz.html',
  './storia/connections.html',

  // Developed Subject: Arte Moderna
  './storia_arte/index.html',
  './storia_arte/style.css',
  './storia_arte/quiz.html',
  './storia_arte/connections.html',
  './storia_arte/dizionario.html',
  './storia_arte/js/artists_db.js',

  // Introductory Subject: Letteratura Italiana
  './letteratura_italiana/index.html',
  './letteratura_italiana/style.css',
  './letteratura_italiana/summaries/cap1.md',

  // Introductory Subject: Cultura Greca
  './cultura_greca/index.html',
  './cultura_greca/style.css',
  './cultura_greca/summaries/cap1.md',

  // Introductory Subject: Storia Medievale
  './storia_medievale/index.html',
  './storia_medievale/style.css',
  './storia_medievale/summaries/cap1.md',

  // Introductory Subject: Geografia
  './geografia/index.html',
  './geografia/style.css',
  './geografia/summaries/cap1.md',

  // Introductory Subject: Arte Medievale
  './arte_medievale/index.html',
  './arte_medievale/style.css',
  './arte_medievale/summaries/cap1.md',

  // Introductory Subject: Archeologia Cristiana
  './cristiana/index.html',
  './cristiana/style.css',
  './cristiana/summaries/cap1.md',

  // Introductory Subject: Laboratorio
  './laboratorio/index.html',
  './laboratorio/style.css',
  './laboratorio/summaries/cap1.md',

  // Introductory Subject: Inglese
  './inglese/index.html',
  './inglese/style.css',
  './inglese/summaries/cap1.md',

  // Storia Contemporanea (Sabbatucci-Vidotto: 31 Capitoli + Quiz + Connessioni)
  './storia_contemporanea/index.html',
  './storia_contemporanea/quiz.html',
  './storia_contemporanea/connections.html',
  './storia_contemporanea/style.css',
  './storia_contemporanea/summaries/cap1.md',
  './storia_contemporanea/summaries/cap2.md',
  './storia_contemporanea/summaries/cap3.md',
  './storia_contemporanea/summaries/cap4.md',
  './storia_contemporanea/summaries/cap5.md',
  './storia_contemporanea/summaries/cap6.md',
  './storia_contemporanea/summaries/cap7.md',
  './storia_contemporanea/summaries/cap8.md',
  './storia_contemporanea/summaries/cap9.md',
  './storia_contemporanea/summaries/cap10.md',
  './storia_contemporanea/summaries/cap11.md',
  './storia_contemporanea/summaries/cap12.md',
  './storia_contemporanea/summaries/cap13.md',
  './storia_contemporanea/summaries/cap14.md',
  './storia_contemporanea/summaries/cap15.md',
  './storia_contemporanea/summaries/cap16.md',
  './storia_contemporanea/summaries/cap17.md',
  './storia_contemporanea/summaries/cap18.md',
  './storia_contemporanea/summaries/cap19.md',
  './storia_contemporanea/summaries/cap20.md',
  './storia_contemporanea/summaries/cap21.md',
  './storia_contemporanea/summaries/cap22.md',
  './storia_contemporanea/summaries/cap23.md',
  './storia_contemporanea/summaries/cap24.md',
  './storia_contemporanea/summaries/cap25.md',
  './storia_contemporanea/summaries/cap26.md',
  './storia_contemporanea/summaries/cap27.md',
  './storia_contemporanea/summaries/cap28.md',
  './storia_contemporanea/summaries/cap29.md',
  './storia_contemporanea/summaries/cap30.md',
  './storia_contemporanea/summaries/cap31.md',
  './storia_contemporanea/summaries/cap1_bis.md',
  './storia_contemporanea/summaries/cap2_bis.md',
  './storia_contemporanea/summaries/cap3_bis.md',
  './storia_contemporanea/summaries/cap4_bis.md',
  './storia_contemporanea/summaries/cap5_bis.md',
  './storia_contemporanea/summaries/cap6_bis.md',
  './storia_contemporanea/summaries/cap7_bis.md',
  './storia_contemporanea/summaries/cap8_bis.md',
  './storia_contemporanea/summaries/cap9_bis.md',
  './storia_contemporanea/summaries/cap10_bis.md',
  './storia_contemporanea/summaries/cap11_bis.md',
  './storia_contemporanea/summaries/cap12_bis.md',
  './storia_contemporanea/summaries/cap13_bis.md',
  './storia_contemporanea/summaries/cap14_bis.md',
  './storia_contemporanea/summaries/cap15_bis.md',
  './storia_contemporanea/summaries/cap16_bis.md',
  './storia_contemporanea/summaries/cap17_bis.md',
  './storia_contemporanea/summaries/cap18_bis.md',
  './storia_contemporanea/summaries/cap19_bis.md',
  './storia_contemporanea/summaries/cap20_bis.md',
  './storia_contemporanea/summaries/cap21_bis.md',
  './storia_contemporanea/summaries/cap22_bis.md',
  './storia_contemporanea/summaries/cap23_bis.md',
  './storia_contemporanea/summaries/cap24_bis.md',
  './storia_contemporanea/summaries/cap25_bis.md',
  './storia_contemporanea/summaries/cap26_bis.md',
  './storia_contemporanea/summaries/cap27_bis.md',
  './storia_contemporanea/summaries/cap28_bis.md',
  './storia_contemporanea/summaries/cap29_bis.md',
  './storia_contemporanea/summaries/cap30_bis.md',
  './storia_contemporanea/summaries/cap31_bis.md',
  './knowledge_base/storia_contemporanea/storia_contemporanea_completo.md',

  // Introductory Subject: Arte Contemporanea
  './arte_contemporanea/index.html',
  './arte_contemporanea/style.css',
  './arte_contemporanea/summaries/cap1.md',

  // Introductory Subject: Museologia
  './museologia/index.html',
  './museologia/style.css',
  './museologia/summaries/cap1.md',

  // Introductory Subject: Storia e Tecnica del Restauro
  './restauro/index.html',
  './restauro/style.css',
  './restauro/summaries/cap1.md',

  // Introductory Subject: Tesi di Laurea
  './tesi/index.html',
  './tesi/style.css',
  './tesi/summaries/cap1.md'
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
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then(networkResponse => {
          // Dynamic caching: intercept and cache markdown summaries (.md files) on-demand
          if (url.pathname.endsWith('.md')) {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        }).catch(err => {
          // Fail gracefully when network fails and asset is not cached
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html');
          }
        });
      })
  );
});
