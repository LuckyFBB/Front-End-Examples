process.on('message', (msg) => {
    console.log('[worker] Received message from master: ' + msg)
    process.send(`Hello, parent process, my pid: ${process.pid}, my ppid: ${process.ppid}`)
})