const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();
server.listen(8000);
process.title = 'FBB-Master';

const workers = {};
const createWorker = () => {
    const worker = fork('worker.js');
    worker.on('message', function (message) {
        if (message.act === 'suicide') {
            createWorker();
        }
    });
    worker.on('exit', function (code, signal) {
        console.log(`worker process ${worker.pid} exited, code: ${code}, signal: ${signal}`);
        delete workers[worker.pid];
    });
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log(`worker process created, pid: ${worker.pid}, ppid: ${process.pid} `);
};

for (let i = 0; i < cpus.length; i++) {
    createWorker();
}

// SIGINT 程序终止(interrupt)信号 表示用户输入INTR字符(通常是Ctrl-C)时发出，用于通知前台进程组终止进程
process.once("SIGINT", close.bind(this, "SIGINT"))
// SIGINT类似, 但由QUIT字符(通常是Ctrl-\)来控制
process.once("SIGQUIT", close.bind(this, "SIGQUIT"))
// 程序结束(terminate)信号，通常用来要求程序自己正常退出
process.once("SIGTERM", close.bind(this, "SIGTERM"))
process.once("exit", close.bind(this))

function close(code) {
    console.log('进程退出！', code);
    if (code !== 0) {
        for (let pid in workers) {
            console.log('master process exited, kill worker pid:', pid);
            workers[pid].kill('SIGINT');
        }
    }
    process.exit(0);
}
