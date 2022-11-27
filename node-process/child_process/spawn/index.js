const { spawn } = require('child_process');

// const child = spawn('pwd');
// child.on('exit', function (code, signal) {
//     console.log(`child process exited with code ${code} and signal ${signal}`);
// });


// const { spawn } = require('child_process');
// const ls_child = spawn('ls', ['-a', '-R', '../../']);

// ls_child.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

// ls_child.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });

// ls_child.on('close', (code) => {
//     console.log(`子进程退出码：${code}`);
// });

// ls_child.on("exit", (code) => {
//     console.log('exit')
// })


// const { spawn } = require('child_process');
// const shell_child = spawn('find . -type f | wc -l', {
//     stdio: 'inherit',
//     shell: true,
// })

// shell_child.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

// shell_child.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });

// shell_child.on('close', (code) => {
//     console.log(`子进程退出码：${code}`);
// });


const ls_child = spawn('node', ['../exec/child.js']);

ls_child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls_child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls_child.on('close', (code) => {
    console.log(`子进程退出码：${code}`);
});

ls_child.on("exit", (code) => {
    console.log('exit')
})
