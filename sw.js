console.log('i am the service worker');


caches.open('mi-cache').then(function (cache) {
    return cache.addAll([
        './',
        './index.html',
        './index.js',
        './style.css',
    ]);
})

// self.addEventListener('fetch', function (e) {
//     // console.log('intercepting fetch event:', e.request.destination, e.request.url);
//     e.respondWith(
//         caches.match(e.request).then(function (response) {
//             return response || fetch(e.request);
//         })
//     );
// });

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then(async response => {


                if (event.request.method === 'GET') {
                    caches.open('mi-cache').then(cache => cache.add(event.request)).catch(console.warn);
                }
                if(!response) throw response
                return response;
            })
            .catch(() => caches.match(event.request)),
    );
});