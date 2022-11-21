const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "index.html");
fs.readFile(fileName, function (err, data) {
    console.log(data.toString().length);
});
