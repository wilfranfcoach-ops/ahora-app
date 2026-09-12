
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))); });

self.addEventListener('push', e => {
  const data = e.data ? e.data.text() : '¿Dónde está tu mente?';
  e.waitUntil(self.registration.showNotification('AHORA', { body: data, icon: 'icon-192.png', badge: 'icon-192.png' }));
});
