const exec = require('child_process').exec;
const child = exec('ls ../../', (error, stdout, stderr) => {
    if (error) {
        console.log('stderr ', stderr);
        return;
    }
    console.log('stdout \n', stdout);
});

child.on('close', (code) => {
    console.log(`close: ${code}`);
});

child.on("exit", (code) => {
    console.log('exit')
})


//使用exec设置超时
// let childExec = exec('node ./child.js', { timeout: 3000 }, (err, stdout, stderr) => {
//     console.log(err)
//     console.log(stdout)
// })

// childExec.on('exit', (code, sig) => [
//     console.log(sig)
// ])
// childExec.on("close", () => {
//     console.log("close")
// })
