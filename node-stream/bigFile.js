// create big file
const fs = require("fs");
const file = fs.createWriteStream("./big.file");
for (let i = 0; i <= 1e7; i++) {
    file.write("ShuangXu create big file for test memory. \n");
}
file.end();

// use readFile
// const fs = require("fs");
// const server = require("http").createServer();

// server.on("request", (req, res) => {
//     fs.readFile("./big.file", (err, data) => {
//         if (err) throw err;
//         res.end(data);
//     });
// });

// server.listen(8000);
// process.title = "node test";

// use stream
// const fs = require("fs");
// const server = require("http").createServer();

// server.on("request", (req, res) => {
//     const src = fs.createReadStream("./big.file");
//     src.pipe(res);
// });

// server.listen(8000);
// process.title = "node test stream";
