import axios from 'axios';
import {useSnackbar} from "./snackbar.service";

// Create an instance of Axios
export const api = axios.create({
    baseURL: 'https://tododo-be.vercel.app'
    // https://tododo-be.vercel.app; http://localhost:3001
});

// Error handling interceptor
export const useApiWithSnackbar = () => {
    const showSnackbar = useSnackbar();

    // Add response interceptor
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            // Extract error message
            const message =
                error.response?.data?.message || error.message || 'Something went wrong';

            // Show Snackbar with error
            showSnackbar(message, 'error');

            return Promise.reject(error);
        }
    );

    return api;
};