const childProcess = require("child_process")
const cpus = require("os").cpus().length

for (let i = 0; i < cpus; i++) {
    childProcess.fork("./worker.js")
}

console.log("FBB's master")