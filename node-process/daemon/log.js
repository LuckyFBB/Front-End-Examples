const fs = require('fs');
const path = require("path")

fs.open(path.resolve(__dirname, 'log.txt'), 'w', function (err, fd) {
    setInterval(() => {
        fs.write(fd, process.pid + "\n", function () { });
    }, 2000)
});

