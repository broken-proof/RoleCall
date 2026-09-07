import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";
import { clearToken, getToken } from "./tokenStorage";

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        const url = error.config?.url ?? "";

        const isAuthAttempt = url.startsWith("/auth/");
        if ((status === 401 || status === 403) && !isAuthAttempt) {
            clearToken();
        }

        console.error(`API Error ${status ?? "network"} on ${url}:`, error.response?.data);

        return Promise.reject(error);
    }
);

export default apiClient;
