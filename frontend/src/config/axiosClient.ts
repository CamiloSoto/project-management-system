import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || 'https://ptnb-backend.onrender.com';

const axiosClient = axios.create({
    baseURL: baseURL,
});

export default axiosClient;
