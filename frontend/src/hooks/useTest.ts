import { useCallback } from "react";
import { ENDPOINTS } from "../api/endpoints";
import useFetch from "./useFetch";
import type { Test, NewTest } from "../types/Test";

export function useTests() {
    const { data, error, loading, fetchData } = useFetch<Test[]>();

    const getTests = useCallback(() => {
        return fetchData(ENDPOINTS.tests.base);
    }, [fetchData]);

    return { tests: data, loading, error, getTests };
}

export function useCreateTests() {
    const { data, error, loading, fetchData } = useFetch<Test>();

    const createTest = useCallback((testInput: NewTest) => {
        return fetchData(ENDPOINTS.tests.base, {
            method: "POST",
            data: testInput,
        });
    }, [fetchData]);

    return { tests: data, loading, error, createTest };
}