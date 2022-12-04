// const Duplex = require("stream").Duplex;

// class myDuplex extends Duplex {
//     constructor() {
//         super();
//         this.readNum = 0;
//     }
//     _read() {
//         this._readNum = this._readNum || 0;
//         if (this._readNum > 2) {
//             this.push(null);
//         } else {
//             this.push("" + this._readNum++);
//         }
//     }
//     _write(buf, enc, next) {
//         process.stdout.write("write data " + buf.toString() + "\n");
//         next();
//     }
// }

// const duplex = new myDuplex();

// duplex.on("data", (chunk) => {
//     process.stdout.write("read data " + chunk.toString() + "\n");
// });

// duplex.write("F");
// duplex.write("B");
// duplex.write("B");

// duplex.end();

// net client 的应用
// const net = require("net");

// //创建客户端
// const client = net.connect({ port: 1234 }, function () {
//     console.log("已连接到服务器");
//     client.write("Hi!");
// });

// //data事件监听。收到数据后，断开连接
// client.on("data", function (data) {
//     console.log(data.toString());
//     client.end();
// });

// //end事件监听，断开连接时会被触发
// client.on("end", function () {
//     console.log("已与服务器断开连接");
// });
