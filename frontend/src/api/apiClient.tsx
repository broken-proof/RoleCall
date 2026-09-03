import axios from "axios";
import  type { AxiosInstance, AxiosError } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.log(`API Error: Status Code: ${error.response?.status ?? "Network Error"}`);
        console.log(`API Error: Server Message: ${error.response?.data}`);
        
        return Promise.reject(error);
    }
);

export default apiClient;