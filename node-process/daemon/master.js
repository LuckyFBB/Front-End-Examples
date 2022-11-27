const { fork } = require("child_process");

const forkChild = () => {
    const child = fork('log.js')

    child.on('exit', () => {
        setTimeout(() => {
            forkChild();
        }, 1000);
    });
}

forkChild();
