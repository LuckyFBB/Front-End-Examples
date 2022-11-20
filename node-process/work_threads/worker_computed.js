const { parentPort } = require("worker_threads");

const computed = (limit) => {
    let sum = 0;
    for (let i = 0; i < limit; i++) {
        sum += i
    }
    return sum
}

parentPort.on("message", (limit) => {
    const result = computed(limit);
    parentPort.postMessage(result);
});
