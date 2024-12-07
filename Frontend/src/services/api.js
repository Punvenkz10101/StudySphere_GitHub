const API_BASE_URL = 'https://studysphere-github.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add error handling
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized
            console.log('Unauthorized access');
        }
        return Promise.reject(error);
    }
); 