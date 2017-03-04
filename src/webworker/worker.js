/**
 * Created by Administrator on 2017/3/4.
 */
var i = 0;
function timedCount(){
    for(var j = 0, sum = 0; j < 100; j++){
        for(var i = 0; i < 1000000; i++){
            sum+=i;
        };
    };
    //send back sum
    postMessage(sum);
};
var start = new Date().getTime();
//send back message before computing
postMessage('Before computing, '+ start);
timedCount();
var end = new Date().getTime();
//send back a message after computing
postMessage('After computing, ' + end);
postMessage("time elapse:" + (end-start));