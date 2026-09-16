
const CACHE='ahora-v7';
const FILES=['/','/index.html','/manifest.json','/icon-192.png','/icon-512.png'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r || fetch(e.request).then(resp=>{
      return caches.open(CACHE).then(c=>{c.put(e.request, resp.clone()); return resp;});
    })).catch(()=>caches.match('/index.html'))
  );
});
self.addEventListener('push', e=>{
  const data = e.data ? e.data.json() : {title:'AHORA', body:'¿Dónde está tu mente?'};
  e.waitUntil(self.registration.showNotification(data.title, {body:data.body, icon:'/icon-192.png', badge:'/icon-192.png'}));
});
self.addEventListener('notificationclick', e=>{
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
