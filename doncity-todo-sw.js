const cacheName = 'doncity-todo-app-v1';
const filesToCache = [
    '/',
    'index.html',
    'todo-list.css',
    './image/image.jpeg',
    'todo-list.js',
    'sw-registration.js',
    './assets/css/all.css',
    './assets/webfonts'
];

// Install Service worker and cache files(Precaching resources)
self.addEventListener('install', event => {
    console.log('Install Event!');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Activate Event!');
});

// fetch files cached and if it does not exist fetch
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});