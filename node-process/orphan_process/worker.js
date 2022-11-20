const http = require("http")
const server = http.createServer((req, res) => {
    res.end(`I am worker process, pid: ${process.pid}, ppid: ${process.ppid}`)
})

let worker = null;

process.title = "FBB worker"
process.on("message", (message, sendHandle) => {
    if (message === "server") {
        worker = sendHandle
        worker.on("connection", (socket) => {
            server.emit("connection", socket)
        })
    }
})