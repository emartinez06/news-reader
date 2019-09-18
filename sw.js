//Variables
const cacheName = 'news-v3';
let files = [
    '/',
    'index.html',
    'styles.css',
    'app.js',
    'images/icons/icon-72x72.png',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
];

//Install the service worker and open the cache
self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Installing');
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(files);
        }).catch(function(err) {
            console.log('Error on installing: ' + err);
        })
    )
});

//Activate and refresh service worker
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

//Fetch files and save them on storage
self.addEventListener('fetch', function(event) {
    console.log('[ServiceWorker] Fetching files');
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request).then(function(res) {
                    return caches.open(cacheName)
                        .then(function(cache) {

                            //save the response for future
                            cache.put(event.request.url, res.clone());
                            //return the cached data
                            return res;
                        }).catch(function(err){
                            console.log('Error on fetch: ' + err);
                        });
                })
            })
    );
});