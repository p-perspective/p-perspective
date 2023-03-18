self.addEventListener("install", e => {
  console.log("Install!");
  e.waitUntil (
    caches.open("static").then(cache => {
      return cache.addAll([
        "./",
        "./app.js",
        "./index.html",
        "./css/styles.css",
        "./js/scripts.js",
        "./img/apple-touch-icon.png",
        "./img/favicon.ico",
        "./img/logo192.png",
        "./img/logo512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
