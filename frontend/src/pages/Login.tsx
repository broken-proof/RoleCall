import { useState } from "react";
import type { SubmitEvent } from "react";
import { getErrorMessage } from "../api/errors";
import { useForgotPassword, useLogin, useRegister, useResetPassword } from "../hooks/useAuth";

type Mode = "login" | "register" | "forgot" | "reset";

const TITLES: Record<Mode, string> = {
    login: "Welcome back",
    register: "Create account",
    forgot: "Find your account",
    reset: "Choose a new password",
};

const ACTIONS: Record<Mode, string> = {
    login: "Sign in",
    register: "Create account",
    forgot: "Send reset email",
    reset: "Reset password",
};

function App() {
    const [mode, setMode] = useState<Mode>("login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { login, loading: loginLoading } = useLogin();
    const { register, loading: registerLoading } = useRegister();
    const { requestReset, loading: forgotLoading } = useForgotPassword();
    const { resetPassword, loading: resetLoading } = useResetPassword();

    const loading = loginLoading || registerLoading || forgotLoading || resetLoading;

    const changeMode = (next: Mode) => {
        setMode(next);
        setMessage("");
        setError("");
    };

    const submit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");
        setError("");

        try {
            if (mode === "login") {
                await login({ identifier, password });
                setPassword("");
            } else if (mode === "register") {
                await register({ username, email, password });
                setMode("login");
                setIdentifier(username);
                setPassword("");
                setMessage("Account created. Sign in to receive a JWT.");
            } else if (mode === "forgot") {
                const result = await requestReset({ email });
                setMessage(result.message);
            } else {
                await resetPassword({ token: resetToken, password });
                setMode("login");
                setPassword("");
                setResetToken("");
                setMessage("Password reset. You can sign in with the new password.");
            }
        } catch (submitError) {
            const fallback = mode === "login"
                ? "Invalid username or password."
                : "Request failed. Please try again.";
            setError(getErrorMessage(submitError, fallback));
        }
    };

    return (
        <main>
            <h1>RoleCall</h1>
            <h2>{TITLES[mode]}</h2>

            <nav aria-label="Authentication actions">
                <button className={mode === "login" ? "active" : ""} onClick={() => changeMode("login")}>Sign in</button>
                <button className={mode === "register" ? "active" : ""} onClick={() => changeMode("register")}>Register</button>
                <button className={mode === "forgot" ? "active" : ""} onClick={() => changeMode("forgot")}>Forgot password</button>
            </nav>

            <form onSubmit={submit}>
                {mode === "register" && (
                    <label>Username
                        <input value={username} onChange={(event) => setUsername(event.target.value)} required />
                    </label>
                )}

                {(mode === "register" || mode === "forgot") && (
                    <label>Email
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </label>
                )}

                {mode === "login" && (
                    <label>Username or email
                        <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} required />
                    </label>
                )}

                {mode === "reset" && (
                    <label>Reset token
                        <input
                            value={resetToken}
                            onChange={(event) => setResetToken(event.target.value)}
                            required
                            placeholder="Paste the token from your email"
                        />
                    </label>
                )}

                {mode !== "forgot" && (
                    <label>{mode === "reset" ? "New password" : "Password"}
                        <input
                            type="password"
                            minLength={8}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </label>
                )}

                <button className="primary" disabled={loading}>
                    {loading ? "Working..." : ACTIONS[mode]}
                </button>
            </form>

            {mode === "forgot" && (
                <button className="text-button" onClick={() => changeMode("reset")}>I have a reset token</button>
            )}

            {message && <p className="notice success">{message}</p>}
            {error && <p className="notice failure">{error}</p>}
        </main>
    );
}

export default App;