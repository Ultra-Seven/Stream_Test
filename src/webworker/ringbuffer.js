/**
 * Created by Administrator on 2017/3/4.
 */
let sum = 0;
function timedCount(){
    for(let j = 0; j < 100; j++){
        for(let i = 0; i < 1000000; i++){
            sum += i;
        }
    }
    //send back sum
    postMessage(sum);
}
//let start = new Date().getTime();
//send back message before computing
//postMessage('Before computing, '+ start);
timedCount();
//let end = new Date().getTime();
//send back a message after computing
//postMessage('After computing, ' + end);
//postMessage("time elapse:" + (end-start));