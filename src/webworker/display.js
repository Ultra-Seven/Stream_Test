/**
 * Created by Administrator on 2017/3/5.
 */
importScripts("subworkers.js");
let newWorker = new Worker('ringbuffer.js');
let sum_init = 0;
newWorker.onmessage = function(event){
    if (event.data) {
        sum_init = event.data;
        timedCount();
    }
};
function timedCount(){
    for(let j = 0; j < 1; j++){
        for(let i = 0; i < 1000000; i++){
            sum_init += i;
        }
    }
    //send back sum
    postMessage(sum_init);
}
//let start = new Date().getTime();
//send back message before computing
//postMessage('Before computing, '+ start);

//let end = new Date().getTime();
//send back a message after computing
//postMessage('After computing, ' + end);
//postMessage("time elapse:" + (end-start));