/* eslint-disable */

// PRECACHE WEBSITE FILES USING WORKBOX
workbox.core.setCacheNameDetails({ prefix: 'question-box' })

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// OTHER CONFIGURATION OPTIONS
self.addEventListener('push', ev => {
  const payload = ev.data.json()
  self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: './img/icons/android-icon-192x192.png',
    data: { 'url': payload.url }
  })
})

self.addEventListener('notificationclick', ev => {
  ev.notification.close()
  clients.openWindow(ev.notification.data.url)
})

workbox.routing.registerRoute(
  new RegExp('^https://api.benatna.de/static/'),
  workbox.strategies.cacheFirst({
    cacheName: 'api-image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)
