const { execFile } = require("child_process");

execFile('./file.sh', function (err, stdout, stderr) {
    if (err) {
        console.error(err);
        return
    }
    console.log("stdout:", stdout)
    console.log("stderr:", stderr);
});