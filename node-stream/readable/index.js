// process.stdin.on("data", function (chunk) {
//     console.log(chunk.toString());
// });

// process.stdin.pipe(process.stdout);

// readFile
// const fs = require("fs");
// const path = require("path");

// const fileName = path.resolve(__dirname, "index.html");
// fs.readFile(fileName, function (err, data) {
//     console.log(data.toString().length);
// });

// stream 读取文件
/* 事件模式 */
// const fs = require("fs");
// const path = require("path");
// const fileName = path.resolve(__dirname, "index.html");
// let stream = fs.createReadStream(fileName);
// let data;
// stream.on("data", (chunk) => {
//     console.log("chunkLength---", chunk.toString().length);
//     data += chunk;
// });
// stream.on("end", () => {
//     console.log("dataLength", data.length);
// });

/* pipe */
// const readStream = fs.createReadStream("./readFile.js");
// const writeStream = fs.createWriteStream("./readFile1.js");
// readStream.pipe(writeStream);

// reqStream
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

// const rs = fs.createReadStream("../console.js", {
//     start: 30,
// });
// console.log(rs);

// 流动模式
/* data 事件 */
// const rs = fs.createReadStream("../console.js");
// rs.on("data", (data) => {
//     console.log(data);
// });
// console.log(rs);

/* pipe 方法 */
// const rs = fs.createReadStream("../console.js");
// rs.pipe(process.stdout);
// console.log(rs);

// 暂停模式
/* readable事件 */
// const rsPause = fs.createReadStream("../console.js");
// rsPause.on("readable", () => {
//     let res = rsPause.read();
// });
// console.log(rsPause);

// 模式切换
// const rs = fs.createReadStream("../console.js");
// console.log("init stream", rs._readableState.flowing);

// rs.on("data", () => {});
// console.log("data event stream", rs._readableState.flowing);

// rs.pause();
// console.log("pause function stream", rs._readableState.flowing);

// rs.resume();
// console.log("resume function stream", rs._readableState.flowing);

// readable 事件
// const rs = fs.createReadStream("../console.js", { highWaterMark: 10 });
// console.log("readable stream", rs._readableState.flowing); // null

// rs.on("readable", () => {
//     // let chunk = null;
//     // while ((chunk = rs.read(12)) !== null) {
//     //     console.log("暂停模式获取数据：", chunk?.toString());
//     // }
//     console.log("暂停模式获取数据：", rs.read(2)?.toString());
// });

// rs.on("data", (data) => {
//     console.log("流动模式获取数据：", data.toString());
// });

// console.log("readable stream", rs._readableState.flowing); //false

// 自定义可读流
// const Readable = stream.Readable;

// class MyReadable extends Readable {
//     constructor(iterator, opts) {
//         super(opts);
//         this.iterator = iterator;
//     }
//     _read() {
//         const res = this.iterator.next();
//         if (res.done) {
//             return this.push(null); // 表示没有数据了
//         }
//         setTimeout(() => {
//             this.push(res.value + ""); // 通过 push 方法将数据添加到流中
//         }, 0);
//     }
// }

// const iterator = (function (limit) {
//     return {
//         next: function () {
//             if (limit--) return { done: false, value: limit };
//             return { done: true };
//         },
//     };
// })(15);

// const myReadableStream = new MyReadable(iterator, { highWaterMark: 4 });

// myReadableStream.on("data", (chunk) => {
//     console.log(chunk?.toString());
// });
// myReadableStream.on("readable", () => {
//     console.log(myReadableStream.read(3)?.toString());
// });
