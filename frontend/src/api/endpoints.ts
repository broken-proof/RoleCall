export const ENDPOINTS = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
    },
    videos: {
        uploadUrl: "/video/upload-url",
        completeUpload: (videoId: string) => `/video/${videoId}/complete-upload`,
        myVideos: "/video/mine",
        downloadUrl: (videoId: string) => `/video/${videoId}/download-url`,
    }
} as const;
