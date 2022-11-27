const http = require('http');
const pid = process.pid;
http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`handled by ${pid}`);
}).listen(3000, () => {
    console.log(`started process`, pid);
});

process.on("message", msg => {
    console.log(`Msg from master: ${msg}`)
})