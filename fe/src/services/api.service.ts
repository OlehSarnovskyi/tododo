import axios from 'axios';

// Create an instance of Axios
export const api = axios.create({
    baseURL: 'https://tododo-be.vercel.app'
    // https://tododo-be.vercel.app; http://localhost:3001
});

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    // Handle errors globally, e.g., show a snackbar
    (error) => {
        // Extract error message
        const message = error.response?.data?.message || error?.message || 'Something went wrong';

        // Show Snackbar with error
        // showSnackbar(message, 'error');

        return Promise.reject(error);
    }
);