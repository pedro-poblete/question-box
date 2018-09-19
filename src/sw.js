// PRECACHE WEBSITE FILES USING WORKBOX
workbox.core.setCacheNameDetails({prefix: 'question-box'})

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// OTHER CONFIGURATION OPTIONS
self.addEventListener('push', ev => {
  const data = ev.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "./img/icons/android-chrome-192x192.png"
  });
});
