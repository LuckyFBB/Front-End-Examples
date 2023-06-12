const path = require("path");
const inquirer = require("inquirer");
const { spawn } = require("child_process");

inquirer
    .prompt([
        {
            type: "rawlist",
            name: "mode",
            message: "Which mode do you need",
            choices: ["singleFile", "multiFile", "directoryFile", "bigFile"],
            loop: false,
        },
        {
            type: "rawlist",
            name: "version",
            message: "Which version do you want to exec",
            choices: ["baseFs", "multer"],
            when: (answer) => {
                console.log(answer);
                return !["multiFile", "directoryFile"].includes(answer.mode);
            },
            loop: false,
        },
    ])
    .then((res) => {
        const { mode, version } = res;
        const cmd = `nodemon src/${mode}/${!version ? "server" : version}.js`;
        runCommand(cmd);
    });

const runCommand = (command, args) => {
    return new Promise((resolve, reject) => {
        const executedCommand = spawn(command, args, {
            stdio: "inherit",
            shell: true,
        });

        executedCommand.on("error", (error) => {
            reject(error);
        });

        executedCommand.on("exit", (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        });
    });
};
