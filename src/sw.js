// PRECACHE WEBSITE FILES USING WORKBOX
workbox.core.setCacheNameDetails({prefix: "question-box"});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// OTHER CONFIGURATION OPTIONS
