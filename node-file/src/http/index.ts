import axios from "axios";

export const PORT = 8888;

export const request = axios.create({
    baseURL: `http://localhost:${PORT}/`,
    timeout: 60000,
});
