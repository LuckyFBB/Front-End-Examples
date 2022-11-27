const http = require("http")

const server = http.createServer((req, res) => {
    setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('It works');
    }, 10000);
}).listen(8001)
console.log("pid---", process.pid)

process.on('SIGINT', () => {
    server.close(err => {
        process.exit(err ? 1 : 0);
    });
});