const fs = require("fs");

exports.pipeStream = function (source, target) {
    // 读文件流
    const fileReader = fs.createReadStream(source);
    // 写文件流
    const fileWrite = fs.createWriteStream(target);
    fileReader.pipe(fileWrite);
};

exports.pipeStreamRemove = (path, writeStream) => {
    return new Promise((resolve) => {
        const readStream = fs.createReadStream(path);
        readStream.on("end", () => {
            fs.unlinkSync(path);
            resolve();
        });
        readStream.pipe(writeStream);
    });
};
