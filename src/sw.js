/* eslint-disable no-restricted-globals */
// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('tracksCacheV1')
      .then((cache) => cache.addAll([
        'sounds/ALIEN-REd-WOLf_We-Filled-Nora-160.mp3',
        'sounds/Akcija_Megaminute-160.mp3',
        'sounds/Peppy--The-Firing-Squad_YMXB-160.mp3',
        'sounds/earthling_Light-Years-Away-160.mp3',
        'sounds/subcycle_111---undergroundinvaders-160.mp3',
        'sounds/superSYMMETRY_JOURNEYthroughTIME2-160.mp3',
        'sounds/tylersrevenge_a-dark-and-stormy-nigh-160.mp3',
        'sounds/vibesbuilderyahoode_Sparse---Youre-t-160.mp3',
      ])),
  );
});

// Activate
self.addEventListener('activate', () => { });

// Listen for network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => new Response('You are offline!')),
  );
});
