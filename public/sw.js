const CACHE_NAME = "edux-cache-v1";
const urlsToCache = [
  "/",
  "/css/style.css",
  "/css/navbar.css",
  "/css/chatbot.css",
  "/css/rating.css",
  "/js/script.js",
  "/js/chatbot.js",
  "/js/shows.js",
  "/js/todo.js",
  "/images/logo.png"
];

// // In sw.js (below urlsToCache)
// urlsToCache.push("/offline.html");

// // In fetch event
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     fetch(event.request).catch(() => caches.match("/offline.html"))
//   );
// });

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
