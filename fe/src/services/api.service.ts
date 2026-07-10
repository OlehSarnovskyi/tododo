import axios from 'axios';
import {useSnackbar} from "./snackbar.service";
import {useLoading} from "./loading.service";

// Create an instance of Axios
export const api = axios.create({
    baseURL: 'https://tododo-be.vercel.app'
    // https://tododo-be.vercel.app; http://localhost:3001
});

// Mutable handlers, updated by the hook on each render. Interceptors are
// registered ONCE (below) and read from this object, so they never stack.
const handlers = {
    startLoading: () => {},
    stopLoading: () => {},
    showSnackbar: (_message: string, _severity?: string) => {},
};

// Request interceptor — registered once at module load
api.interceptors.request.use(
    (config) => {
        handlers.startLoading();
        return config;
    },
    (error) => {
        handlers.stopLoading();
        return Promise.reject(error);
    }
);

// Response interceptor — registered once at module load
api.interceptors.response.use(
    (response) => {
        handlers.stopLoading();
        return response;
    },
    (error) => {
        handlers.stopLoading();
        const message =
            error.response?.data?.message || error.message || 'Something went wrong';
        handlers.showSnackbar(message, 'error');
        return Promise.reject(error);
    }
);

export const useApiWithSnackbar = () => {
    const showSnackbar = useSnackbar();
    const { startLoading, stopLoading } = useLoading();

    // Keep the singleton interceptors pointed at the latest context callbacks
    handlers.startLoading = startLoading;
    handlers.stopLoading = stopLoading;
    handlers.showSnackbar = showSnackbar;

    return api;
};
