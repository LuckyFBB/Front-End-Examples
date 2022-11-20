const { spawn } = require('child_process');

spawn('node', ['./master.js'], {
    detached: true,
});

process.exit(0);