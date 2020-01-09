// Check service worker support
if(navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(reg => console.info('Service worker: Registered'))
      .catch(err => console.error(`Service worker: ${err}`))
  })
}