import { useCallback, useSyncExternalStore } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { clearToken, getToken, setToken, subscribe } from "../api/tokenStorage";
import useFetch from "./useFetch";
import type {
    EmailRequest,
    LoginRequest,
    LoginResponse,
    MessageResponse,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
} from "../types/Auth";

export function useAuth() {
    const token = useSyncExternalStore(subscribe, getToken);

    return { token, isAuthenticated: token !== null, logout: clearToken };
}

export function useLogin() {
    const { error, loading, fetchData } = useFetch<LoginResponse>();

    const login = useCallback(async (credentials: LoginRequest) => {
        const result = await fetchData(ENDPOINTS.auth.login, {
            method: "POST",
            data: credentials,
        });
        setToken(result.token);
        return result;
    }, [fetchData]);

    return { login, loading, error };
}

export function useRegister() {
    const { error, loading, fetchData } = useFetch<RegisterResponse>();

    const register = useCallback((details: RegisterRequest) => {
        return fetchData(ENDPOINTS.auth.register, {
            method: "POST",
            data: details,
        });
    }, [fetchData]);

    return { register, loading, error };
}

export function useForgotPassword() {
    const { error, loading, fetchData } = useFetch<MessageResponse>();

    const requestReset = useCallback((request: EmailRequest) => {
        return fetchData(ENDPOINTS.auth.forgotPassword, {
            method: "POST",
            data: request,
        });
    }, [fetchData]);

    return { requestReset, loading, error };
}

export function useResetPassword() {
    const { error, loading, fetchData } = useFetch<MessageResponse>();

    const resetPassword = useCallback((request: ResetPasswordRequest) => {
        return fetchData(ENDPOINTS.auth.resetPassword, {
            method: "POST",
            data: request,
        });
    }, [fetchData]);

    return { resetPassword, loading, error };
}
