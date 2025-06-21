import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:9090/api/resq',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const login = (user) => api.post('/login', user);
