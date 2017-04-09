/**
 * Created by Administrator on 2017/4/9.
 */
if (navigator.serviceWorker) {
    navigator.serviceWorker.register("service_worker.js").then(function(registration) {
        console.log('service worker register successfully');
    }).catch(function (err) {
        console.log('servcie worker register erroneously')
    });
}
const URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=your_api_key&format=json&nojsoncallback=1&tags=penguins';
function insertPhotos(json) {
    for(let key in json){
        document.getElementById(key).innerHTML = json[key];
    }
}
function fetchDemo() {
    // fetch(url, option)支持两个参数，option中可以设置header、body、method信息
    fetch(URL).then(function(response) {
        // 通过promise 对象获得相应内容，并且将响应内容按照json格式转成对象，json()方法调用之后返回的依然是promise对象
        // 也可以把内容转化成arraybuffer、blob对象
        return response.json();
    }).then(function(json) {
        // 渲染页面
        insertPhotos(json);
    });
}
fetchDemo();