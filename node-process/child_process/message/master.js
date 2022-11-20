const childProcess = require('child_process')
const worker = childProcess.fork('./worker.js')

worker.send(`Hi, child process, my pid is ${process.pid}`)

worker.on('message', (msg) => {
    console.log('[Master] Received message from worker: ' + msg)
})