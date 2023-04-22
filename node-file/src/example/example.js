// fs API 文件拷贝
// const fs = require("fs");
// const path = require("path");

// const sourceFile = path.resolve(__dirname, "../doc/Mobx原理及丐版实现.md");
// const targetFile = path.resolve(__dirname, "target.txt");

// fs.readFile(sourceFile, (err, data) => {
//     if (err) throw err;
//     const dataStr = data.toString();
//     fs.writeFile(targetFile, dataStr, (err) => {
//         if (err) throw err;
//         console.log("copy success~");
//         process.exit(1);
//     });
// });

// fs buffer 文件拷贝
// const fs = require("fs");
// const path = require("path");

// const copyFile = (source, target, size, callback) => {
//     const sourceFile = path.resolve(__dirname, source);
//     const targetFile = path.resolve(__dirname, target);

//     const buf = Buffer.alloc(size);
//     let hasRead = 0; // 下次读取文件的位置
//     let hasWrite = 0; // 下次写入文件的位置
//     fs.open(sourceFile, "r", (err, sourceFd) => {
//         if (err) callback(err);
//         fs.open(targetFile, "w", (err, targetFd) => {
//             if (err) throw callback(err);
//             function next() {
//                 fs.read(sourceFd, buf, 0, size, hasRead, (err, bytesRead) => {
//                     if (err) callback(err);
//                     hasRead += bytesRead;
//                     if (bytesRead) {
//                         fs.write(targetFd, buf, 0, size, hasWrite, (err, bytesWrite) => {
//                             if (err) callback(err);
//                             hasWrite += bytesWrite;
//                             next();
//                         });
//                         return;
//                     }
//                     fs.close(sourceFd, () => { console.log("关闭源文件"); });
//                     fs.close(targetFd, () => { console.log("关闭目标文件"); });
//                 });
//             }
//             next();
//         });
//     });
// };

// copyFile("../doc/Mobx原理及丐版实现.md", "target.txt", 8, (err) => {
//     throw err;
// });

// Stream 使用
// const fs = require("fs");
// const path = require("path");
// const readStream = fs.createReadStream(
//     path.resolve(__dirname, "../doc/Mobx原理及丐版实现.md")
// );
// const writeStream = fs.createWriteStream(path.resolve("target.txt"));
// readStream.pipe(writeStream);

// 过滤文件
// const fs = require("fs");
// const path = require("path");
// const { promisify } = require("util");
// const reg = new RegExp("(.ts[x]*|.js[x]*|.json)$");
// const targetPath = path.resolve(__dirname, "../mini-proxy-mobx");

// const readDir = (targetPath, callback) => {
//     fs.readdir(targetPath, (err, files) => {
//         if (err) callback(err);
//         files.forEach(async (file) => {
//             const filePath = path.resolve(__dirname, `${targetPath}/${file}`);
//             const stats = await promisify(fs.stat)(filePath);
//             if (stats.isDirectory()) {
//                 await readDir(filePath);
//             } else {
//                 checkFile(filePath);
//             }
//         });
//     });
// };
// const checkFile = (file) => {
//     if (reg.test(file)) {
//         console.log(file);
//     }
// };

// readDir(targetPath, (err) => {
//     throw err;
// });
