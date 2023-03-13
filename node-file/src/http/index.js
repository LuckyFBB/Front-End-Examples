const axios = require("axios");

const PORT = 8888;

const request = axios.create({
    baseURL: `http://localhost:${PORT}/`,
    timeout: 60000,
});

module.exports = { PORT, request };
