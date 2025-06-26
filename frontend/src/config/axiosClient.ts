import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || 'https://ptnb-backend.onrender.com';

const axiosClient = axios.create({
    baseURL: baseURL,
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosClient;
