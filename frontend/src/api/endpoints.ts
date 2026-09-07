export const ENDPOINTS = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
    },
    tests: {
        base: "/test",
    }
} as const;
