const fs = require("fs");
const path = require("path");

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

const readStream = fs.createReadStream("./readFile.js");
const writeStream = fs.createWriteStream("./readFile1.js");
readStream.pipe(writeStream);
