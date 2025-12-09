import axios from "axios";
import Cookies from "js-cookie";

axios.default.baseURL = import.meta.env.BASE_API_URL;
axios.default.headers.common['Content-Type'] = 'multipart/form-data';
axios.default.headers.common['Accept'] = 'application/json';
axios.default.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export const axiosInstance = axios;