var cacheName = 'my-demo-app_02';
var dataCacheName = 'my-demo-app-data_01';

var filesToCache = [
	'/style.css',
	'/index.js',
	'/index.html',
	'/',
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});


self.addEventListener('fetch', function (e) {
	console.log('[ServiceWorker] Fetch', e.request.url);
	e.respondWith(
		caches.match(e.request).then(function (response) {
			if(response){
				console.log('cache response');
				return response;
			}else{
				return fetch(e.request).then(function(apiResponse){
					console.log('Server response');
					var apiResClone = apiResponse.clone();
					caches.open(dataCacheName).then(function (cache1) {
						console.log('API response Caching');
						cache1.put(e.request, apiResClone);
					});
					return apiResponse;
				});
			}
		})
	);
});
