/**
 * Created by Administrator on 2017/3/15.
 */
//using thread library
const threads = require('threads');
const iteration_num = 100;
class MessageController {
    constructor(options) {

    }

    main() {
        let thread = threads.client('message-service');
        this.client = thread;
        this.rawWorker = new Worker('workers/message-worker.js');
        //start benchmark
        this.start();
    }

    start() {
        this.rawWorker.postMessage(0);
        this.rawWorker.onmessage = () => {
            // The web worker is ready.
            this.rawWorker.onmessage = null;
            this.startMeasuring();
        };
    }

    startMeasuring() {
        let dataSets = [];

        this.benchmarkWebWorkersWithPostMessage()
            .then((dataSet) => {
                if (dataSet) {
                    dataSets.push(dataSet);
                }

                return this.benchmarkThreads();
            })
            .then((dataSet) => {
                if (dataSet) {
                    dataSets.push(dataSet);
                }

                this.view.processData(dataSets);
                this.view.setLoader(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    benchmarkWebWorkersWithPostMessage() {
        let size = 1;

        return new Promise(resolve => {
            let dataSet = [];
            let benchmark = () => {
                let object = this.getObject(size);
                let highResolutionBefore = window.performance.now();

                this.rawWorker.postMessage(object);
                this.rawWorker.onmessage = () => {
                    let highResolutionAfter = window.performance.now();
                    let data = [
                        highResolutionAfter - highResolutionBefore,
                        size
                    ];

                    dataSet.push(data);
                    console.log(data);
                    if (dataSet.length <= iteration_num) {
                        benchmark(dataSet);
                    } else {

                    }
                };
                size += (1024 * 20);
            };
            benchmark();
        });
    }
    benchmarkThreads() {
        let size = 1;

        return new Promise(resolve => {
            let dataSet = [];
            let benchmark = () => {
                let object = this.getObject(size);
                let highResolutionBefore = window.performance.now();

                this.client
                    .method('ping', object)
                    .then(() => {
                        let highResolutionAfter = window.performance.now();
                        let data = [
                            highResolutionAfter - highResolutionBefore,
                            size
                        ];

                        dataSet.push(data);

                        if (dataSet.length <= iteration_num) {
                            benchmark(dataSet);
                        }
                    });

                size += (1024 * 20);
            };
            benchmark();
        });
    }
}