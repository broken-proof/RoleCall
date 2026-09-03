import { useState, useCallback } from "react";
import type { AxiosRequestConfig } from "axios";
import apiClient from "../api/apiClient";

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: (url: string, options?: AxiosRequestConfig) => Promise<T>;
}

function useFetch<T = unknown>() : UseFetchResult<T>{
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (url: string, options?: AxiosRequestConfig) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.request<T>({
                url: url,
                method: options?.method ?? "GET",
                ...options,
            });

            setData(response.data);
            return response.data;

        } catch (err){
            const msg = err instanceof Error ? err.message : "Something unexpected occured";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    
    return {data, loading, error, fetchData};
}

export default useFetch;