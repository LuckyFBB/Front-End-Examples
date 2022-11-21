const http = require("http");
const fs = require("fs");

// const serverCallback = (req, res) => {
//     let data = "";
//     if (req.url === "/stream") {
//         const stream = fs.createReadStream("readFile.js");
//         stream.on("data", (chunk) => {
//             data += chunk.toString();
//         });
//         stream.on("end", () => {
//             res.writeHead(200, { "Content-type": "text/html" });
//             res.end(data);
//         });
//     }
// };

// http.createServer(serverCallback).listen(8000);

// const serverCallback = (req, res) => {
//     const readStream = fs.createReadStream("readFile.js");
//     res.writeHead(200, { "Content-type": "text/html" });
//     readStream.pipe(res);
// };
// http.createServer(serverCallback).listen(8000);
