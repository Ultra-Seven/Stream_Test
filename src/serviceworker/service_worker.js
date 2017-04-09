/**
 * Created by Administrator on 2017/4/9.
 */
let cacheFiles = [];
self.addEventListener("install", function (evt) {
    evt.waitUntil(caches.open('my-test-cahce-v1').then(function (cache) {
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener("fetch", function (evt) {
    console.log("fetch intercept!");
    evt.respondWith(
        caches.match(evt.request).then(function (response) {
            if (response) {
                console.log("cache hit!");
                return response;
            }
            else {
                let request = evt.request.clone();
                console.log("cache miss! send a request...");
                return fetch(request).then(function (response) {
                    if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
                        return response;
                    }
                    let responseClone = response.clone();
                    caches.open('my-test-cache-v1').then(function (cache) {
                        cache.put(evt.request, responseClone);
                    });
                    return response;
                });
            }
        }) 
    );
});