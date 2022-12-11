// const str = "是霜序";
// const buf = Buffer.from(str, "utf-8");
// console.log(buf); // <Buffer e6 98 af e9 9c 9c e5 ba 8f>

// const str1 = "xu!";
// const buf1 = Buffer.from(str1);
// console.log(buf1); // <Buffer 78 75 21>

// Buffer.alloc
// const bufferOfAlloc = Buffer.alloc(6);
// console.log(bufferOfAlloc); // <Buffer 00 00 00 00 00 00>
// const bufferOfAllocFill = Buffer.alloc(6, "1");
// console.log(bufferOfAllocFill); // <Buffer 31 31 31 31 31 31>

// Buffer.allocUnsafe
// const bufferOfAllocUnsafe = Buffer.allocUnsafe(6);
// console.log(bufferOfAllocUnsafe); // <Buffer 80 7c 87 10 01 00>

// const bufferFromString = Buffer.from("shuangxu");
// console.log(bufferFromString); // <Buffer 73 68 75 61 6e 67 78 75>

// const bufferFromArray = Buffer.from([256, 2, 3]);
// console.log(bufferFromArray); // <Buffer 00 02 03>

// const bufferFromBuffer = Buffer.from(bufferFromArray);
// console.log(bufferFromBuffer); // <Buffer 00 02 03>

// 乱码问题
// const fs = require("fs");
// const rs = fs.createReadStream("./test.txt", { highWaterMark: 4 });
// let data;
// rs.on("data", (chunk) => {
//     console.log(chunk);
//     data += chunk;
// });
// rs.on("end", () => {
//     console.log(data); // 你�����这里�����序！
// });

// string encoding
// const buffer = Buffer.from("hi shuangxu!");
// console.log(buffer.toString("hex")); // 686920736875616e67787521
// console.log(buffer.toString("base64")); // aGkgc2h1YW5neHUh
// const baseBuffer = Buffer.alloc(12, "aGkgc2h1YW5neHUh", "base64");
// console.log(baseBuffer.toString()); // hi shuangxu!
