const http = require("http")
const { Worker } = require("worker_threads");

const computed = (limit) => {
    let sum = 0;
    for (let i = 0; i < limit; i++) {
        sum += i
    }
    return sum
}

http.createServer((req, res) => {
    if (req.url === "/computed") {
        const computedThead = new Worker(`${__dirname}/worker_computed.js`)
        computedThead.on("message", (sum) => {
            console.log(`computed thread: ${sum}`)
            res.end(`computed on computed thread: ${sum}`)
        })
        computedThead.postMessage(1e10)
    } else if(req.url !== "/favicon.ico") {
        const number = +req.url.slice(1)
        const result = computed(number)
        console.log(`main thread: ${result}`)
        res.end(`computed on main thread: ${result}`)
    }
}).listen(8080, "localhost", () => {
    console.log(`server start at http://localhost:8080`)
})