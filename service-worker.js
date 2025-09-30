const CACHE_NAME = "cag-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/assets/img/Dmytro_Solovei.jpg",
  "/assets/img/donate.png",
  "/assets/img/globe.png",
  "/assets/img/logo.png",
  "/assets/img/zoom-to-start.png",
  "/assets/img/background-image.png",
  "/assets/img/game-configuration-img.png",
  "/css/styles.css",
  "/css/leaflet.contextmenu.css",
  "/css/leaflet-control-topcenter.css",
  "/css/leaflet.css",
  "/css/bootstrap.css",
  "/css/images/layers-2x.png",
  "/css/images/layers.png",
  "/css/images/marker-icon-2x.png",
  "/css/images/marker-icon.png",
  "/offline.html",
  "/js/data/countries.geo.js",
  "/js/data/countries.js",
  "/js/data/countriesBounds.js",
  "/js/localization/ua.js",
  "/js/views/aboutView.js",
  "/js/views/donateAuthorView.js",
  "/js/views/gameRulesView.js",
  "/js/views/gameView.js",
  "/js/views/languageSelectView.js",
  "/js/views/mainView.js",
  "/js/config.js",
  "/js/Control.FullScreen.js",
  "/js/controller.js",
  "/js/game.js",
  "/js/gameConfig.js",
  "/js/helpers.js",
  "/js/player.js",
  "/js/playMap.js",
  "/js/leaflet-control-topcenter.js",
  "/js/leaflet.contextmenu.js",
  "/js/model.js",
  "/js/leaflet.js",
  "/js/bootstrap.bundle.min.js",
  "/index.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-384.png",
  "/icons/icon-256.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      });
    })
  );
});
