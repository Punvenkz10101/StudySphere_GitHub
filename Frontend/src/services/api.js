import axios from 'axios';

const API_BASE_URL = 'https://studysphere-github.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

// Add request interceptor
api.interceptors.request.use(
    config => {
        // Add any auth tokens if needed
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.log('Unauthorized access');
        }
        if (error.response?.status === 403) {
            console.log('Forbidden access');
        }
        return Promise.reject(error);
    }
);

export default api; 