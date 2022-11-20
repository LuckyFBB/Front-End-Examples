const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });
    res.end('I am worker, pid:' + process.pid + ', ppid:' + process.ppid);
    // throw new Error('worker process exception!');
});

let netServer;
process.title = 'FBB-Worker';
process.on('message', function (message, sendHandle) {
    if (message === 'server') {
        netServer = sendHandle;
        netServer.on('connection', function (socket) {
            // console.log(socket)
            console.log(`got a connection on worker, pid = ${process.pid}`);
            server.emit('connection', socket);
            // socket.end('handle by child')
        });
    }
});

process.on('uncaughtException', function (err) {
    console.log('catch error, send suicide massage');
    process.send({ act: 'suicide' });
    netServer.close(function () {
        process.exit(1);
    });
});