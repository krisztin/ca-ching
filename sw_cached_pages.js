const cacheName = 'pages cache'

const cacheAssets = [
  'index.html',
  '/css/style.css',
  '/js/main.js'
]

// Install SW
self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(cahceName)
      .then(cache => {
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate SW
self.addEventListener('activate', e => {
  // rm superfluous cahces
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName) {
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// Fetch
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})
