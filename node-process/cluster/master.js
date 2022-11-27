const cluster = require("cluster")
const cpus = require("os").cpus().length

if (cluster.isMaster) {
    for (let i = 0; i < cpus; i++) {
        cluster.fork();     // 创建子进程
    }
    // Object.values(cluster.workers).forEach(worker => {
    //     worker.send(`hello worker: ${worker.id}`)
    // })
    cluster.on("exit", (worker) => {
        console.log(`${worker.process.pid} died`)
    })
} else {
    require("./worker.js")
}