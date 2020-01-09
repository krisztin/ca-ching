const cacheName = 'site cache'

// Install SW
self.addEventListener('install', e => {
  console.info('Service worker: installed')
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
    fetch(e.request)
    .then(res => {
      const resClone = res.clone()
      caches
        .open(cacheName)
        .then(cache => {
          cache.put(e.request, resClone)
        })
      return res
    })
    .catch(err => caches.match(e.request).then(res => res))
  )
})
