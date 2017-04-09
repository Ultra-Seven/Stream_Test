/**
 * Created by Administrator on 2017/3/15.
 */
let object = new Array(1024 * 100);
for(let i = 0; i < object.length; i++) {
    object[i] = i;
}

let data = {
    time: 0,
    sets: object
};
data.time = Date.now();
postMessage(data);
