const cacheName = 'doncity-todo-app-v1';
const filesToCache = [
    'index.html',
    '/',
    'todo-list.css',
    './image/image.jpeg',
    './image/apple-touch-icon.png',
    './image/android-chrome-152x152.png',
    './image/android-chrome-128x128.png',
    './image/android-chrome-192x192.png',
    './image/android-chrome-144x144.png',
    './image/delete.png',
    './image/menu-icon.png',
    './image/save-icon.png',
    'todo-list.js',
    'sw-registration.js',
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