const TOKEN_KEY = "rolecall_token";

const listeners = new Set<() => void>();

function readToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

let cachedToken: string | null = readToken();

function notify() {
    cachedToken = readToken();
    listeners.forEach((listener) => listener());
}

export function getToken(): string | null {
    return cachedToken;
}

export function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function setToken(token: string) {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch {
        //
    }
    notify();
}

export function clearToken() {
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch {
        // Nothing to clean up if storage is unavailable
    }
    notify();
}

// Signing out in one tab signs out the others
window.addEventListener("storage", (event) => {
    if (event.key === TOKEN_KEY) {
        notify();
    }
});
