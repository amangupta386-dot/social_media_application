// public/service-worker.js

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/main.js',
          '/login.jsx',
          'static/js/bundle.js',
          'manifest.json',
          '/favicon.ico',
          '/register.jsx',
          '/dashboard.jsx'
        ]);
      })
    );
    console.log('Service Worker installed and resources cached.');
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', (event) => {
    const data = event.data ? event.data.text() : 'No payload';
    self.registration.showNotification('Push Notification', {
      body: data,
    });
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== 'app-cache') {
              console.log('Old cache cleared:', cache);
              return caches.delete(cache);
            }
          })
        );
      })
    );
    console.log('Service Worker activated.');
  });
   