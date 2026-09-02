import { useState, useCallback } from "react";

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: (url: string, options?: RequestInit) => Promise<T>;
}

function useFetch<T = unknown>() : UseFetchResult<T>{
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (uri: string, options?: RequestInit) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(uri, options);
            if (!response.ok) throw new Error(`Request failed: ${response.status}`);
            const result = await response.json();
            setData(result);
            return result;
        } catch (err){
            const msg = err instanceof Error ? err.message : 'Unknown error';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    
    return {data, loading, error, fetchData};
}

export default useFetch;