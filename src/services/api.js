import axios from 'axios';

const api = axios.create({
    baseURL: 'http://server.5dev.com.br:1337'
});

export default api;