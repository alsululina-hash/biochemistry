const CACHE = 'biochem-v1';
const FILES = ["index.html", "app.css", "app.js", "manifest.json", "glava1.html", "glava2.html", "glava3.html", "glava4.html", "glava5.html", "glava6.html", "data-ch1.js", "data-ch2.js", "data-ch3.js", "data-ch4.js", "data-ch5.js", "data-ch6.js"];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{
    const copy = resp.clone();
    if(resp.ok && new URL(e.request.url).origin===location.origin) caches.open(CACHE).then(c=>c.put(e.request, copy));
    return resp;
  }).catch(()=>caches.match('index.html'))));
});
