import axios from 'axios';
import store from '../store';

const api = axios.create({
    baseURL: 'http://localhost:3000/v1/',
    timeout: 30000,
    withCredentials: false
});

api.interceptors.response.use(response => {
    if (response.headers['X-NEW-AUTH-PAYLOAD']) {
        console.debug('Received new auth token');
        store.dispatch('SET_CURRENT_AUTH', response.headers['X-NEW-AUTH-PAYLOAD']);
    }
    return response;
});

export default api;
