const fork = require("child_process").fork

zombie();

function zombie() {
    const worker = fork("./worker.js");
    console.log(`Worker is created, pid: ${worker.pid}, ppid: ${process.pid}`)
    while (1) { } // 主进程永久阻塞
}
function zombie() {

    const worker = fork("./worker.js");

    worker
        .on('exit', () => {
            console.log('exit');
        })
        .on('close', () => {
            console.log('close');
        });
}