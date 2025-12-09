const CACHE_NAME = 'entre-cha-e-livros-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/logo-entre-cha-e-livros.png',
  '/logo-entre-cha-e-livros-192.png',
  '/logo-entre-cha-e-livros-512.png'
  // se você tiver outros arquivos soltos (css, js externos), pode listar aqui
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// garante que versões antigas do cache sejam limpas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// responde às requisições usando cache + rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // se tiver no cache, usa; senão, busca na rede
      return response || fetch(event.request);
    })
  );
});
