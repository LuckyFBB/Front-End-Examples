const fork = require("child_process").fork
const server = require("net").createServer()
server.listen(3000)
const worker = fork("./worker.js")

process.title = "FBB master"

worker.send("server", server)
console.log(`worker created, ppid is ${process.pid}, pid is ${worker.pid}`)