var CACHE_NAME = 'DQBlog';

self.addEventListener('install', function(event){
    console.log('sw installed...')
    // self.skipWaiting()
    
    // event.waitUntil(
    //     caches.open(CACHE_NAME).then(cache => {
    //     return cache.addAll([
    //         '/',
    //         '/static/js/zepto.js',
    //         '/static/js/routie.js',
    //         '/static/js/main.js',
    //         '/static/css/markdown.css',
    //         '/static/css/base.css',
    //     ])
    //     .then(() => self.skipWaiting());
    //     })
    // )
})

self.addEventListener('activate', function(event) {
    console.log('sw activated...');
    event.waitUntil(Promise.all([
        // 更新客户端
        self.clients.claim(),
        removeOldCache()
    ]))
})

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(function(response){
            console.log(`SW : ${event.request.url}`)
            if(response.status === 200 || response.status === 304) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then(function (cache) {
                        cache.add(event.request.url, responseToCache);
                    });
            }
            return response;
      });
    })
  );
});

// self.addEventListener('offline', function() {
//     console.log('offline')
//     Notification.requestPermission().then(grant => {
//         if (grant !== 'granted') {
//             return;
//         }

//         const notification = new Notification("Hi，您的网络貌似离线了", {
//             body: '不过访问过的页面还可以继续打开~',
//             icon: '//lzw.me/images/avatar/lzwme-80x80.png'
//         });

//         notification.onclick = function() {
//             notification.close();
//         };
//     });
// });

self.addEventListener('online', function() {
    console.log('online')
});

function removeOldCache(){
    return caches
        .keys()
        .then(keys =>
            Promise.all( // 等待所有旧的资源都清理完成
                keys
                // .filter(key => !key.startsWith(version)) // 过滤不需要删除的资源
                .map(key => caches.delete(key)) // 删除旧版本资源，返回为 Promise 对象
            )
        )
        .then(() => {
            console.log('removeOldCache completed.');
        });
	
}