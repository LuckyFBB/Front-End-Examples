// 通过 write 写入数据
// const fs = require("fs");

// // 通过 createWriteStream 可以创建一个 WriteStream 的实例
// const ws = fs.createWriteStream("./write.txt", {
//     flags: 'w',
//     highWaterMark: 2, // 定义缓冲区大小
//     autoClose: true,
//     start: 0, // 开始写入的位置
//     encoding: 'utf8'
// });

// // 只能写 字符串、buffer
// ws.write("1", "utf8", () => {
//     console.log("写入1成功");
// });

//通过 end 写数据并且关闭流，end = write + close
// const fs = require("fs");

// const ws = fs.createWriteStream("./write.txt", {
//     flags: "w",
//     highWaterMark: 2, // 定义缓冲区大小
//     autoClose: true,
//     start: 0, // 开始写入的位置
//     encoding: "utf8",
// });

// ws.end("end", "utf8", () => {
//     console.log("写入 end 成功");
// });
// ws.write("1", "utf8", () => {
//     console.log("写入 1 成功");
// });

//当写入数据达到 highWaterMark 的大小时，会触发 drain 事件
// const fs = require("fs");

// const ws = fs.createWriteStream("./write.txt", {
//     flags: "w",
//     highWaterMark: 2, // 定义缓冲区大小
//     autoClose: true,
//     start: 0, // 开始写入的位置
//     encoding: "utf8",
// });

// ws.write("1123456", "utf8", () => {
//     console.log("写入1成功");
// });

// // 当正在写入数据 + 缓冲区数据长度超过 highWaterMark 的值时，会触发 drain 事件
// ws.on("drain", function () {
//     console.log("drain");
// });

// 自定义可写流

// const Writable = require("stream").Writable;

// class myWritable extends Writable {
//     constructor() {
//         super();
//     }
//     _write(data, enc, next) {
//         process.stdout.write(data.toString().toUpperCase());
//         // 写入完成时，调用`next()`方法通知流传入下一个数据
//         next();
//     }
// }

// const writable = new myWritable();

// // 所有数据均已写入底层
// writable.on("finish", () => process.stdout.write("DONE"));

// // 将一个数据写入流中
// writable.write("f");
// writable.write("b");
// writable.write("b" + "\n");

// // 再无数据写入流时，需要调用`end`方法
// writable.end();
