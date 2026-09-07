import axios from "axios";

export function getErrorMessage(error: unknown, fallback = "Something unexpected occurred"): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data === "string" && data.trim()) {
            return data;
        }

        if (data && typeof data === "object" && "message" in data) {
            const message = String((data as { message: unknown }).message);
            if (message.trim()) {
                return message;
            }
        }

        if (!error.response) {
            return "Could not reach the server. Is the backend running?";
        }

        return fallback;
    }

    return error instanceof Error ? error.message : fallback;
}
