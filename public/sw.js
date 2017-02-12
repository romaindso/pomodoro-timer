self.addEventListener('install', function(e){
  console.log("Service Worker : installing...");
  e.waitUntil(
    caches.open('mycache').then(function(cache) {
      console.log("Service Worker : cache app shell");
      return cache.addAll([
        './',
        './BikeHorn.mp3',
        './index.html',
        './favicon.ico',
        './manifest.json',
        './static/js/main.7dfe3326.js',
        './static/css/main.17df7ccb.css'
      ])
      .then(() => {
        console.log("Service Worker : installed");
        self.skipWaiting();
      });
   })
 );
});

// intercepts all requests
self.addEventListener('fetch', function(event){
  console.log(event.request.url);
  event.respondWith(
    // look in the cache for a ressource that matches
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
    .catch(err => {
      console.log('Service Worker : fetch error ' + err);
    })
  );
});
