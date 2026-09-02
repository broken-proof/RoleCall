import {useState, useCallback} from 'react';

export function useCreate<TRequest, TResponse>(uri: string){
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (payload: TRequest): Promise<TResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(uri, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });

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
    }, [uri]);

    return {data, loading, error, create};
}