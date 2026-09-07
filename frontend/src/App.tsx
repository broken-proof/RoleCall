import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api'
type Mode = 'login' | 'register' | 'forgot' | 'reset'

async function request(path: string, body?: object, token?: string) {
  const response = await fetch(`${API_URL}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await response.text()
  let result: unknown = text
  try { result = text ? JSON.parse(text) : null } catch { /* Keep plain-text responses readable. */ }
  if (!response.ok) {
    const message = typeof result === 'object' && result !== null && 'message' in result
      ? String(result.message) : `Request failed (${response.status})`
    throw new Error(message)
  }
  return result
}

function App() {
  const [mode, setMode] = useState<Mode>('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setMessage(''); setError('')
    try {
      if (mode === 'login') {
        const result = await request('/auth/login', { identifier, password }) as { token: string }
        localStorage.setItem('rolecall_token', result.token)
        setMessage('Signed in successfully.')
      } else if (mode === 'register') {
        await request('/auth/register', { username, email, password }); setMode('login'); setIdentifier(username)
        setMessage('Account created. Sign in to receive a JWT.')
      } else if (mode === 'forgot') {
        const result = await request('/auth/forgot-password', { email }) as { message: string }
        setMessage(result.message)
      } else {
        await request('/auth/reset-password', { token: resetToken, password }); setMode('login'); setPassword('')
        setMessage('Password reset. You can sign in with the new password.')
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Request failed')
    } finally { setLoading(false) }
  }

  const title = mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create account' : mode === 'forgot' ? 'Find your account' : 'Choose a new password'

  return (
    <main>
      <h1>RoleCall</h1>
      <h2>{title}</h2>
      <nav aria-label="Authentication actions">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Sign in</button>
        <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
        <button className={mode === 'forgot' ? 'active' : ''} onClick={() => setMode('forgot')}>Forgot password</button>
      </nav>
      <form onSubmit={submit}>
        {mode === 'register' && <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} required /></label>}
        {(mode === 'register' || mode === 'forgot') && <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>}
        {mode === 'login' && <label>Username or email<input value={identifier} onChange={(event) => setIdentifier(event.target.value)} required /></label>}
        {mode === 'reset' && <label>Reset token<input value={resetToken} onChange={(event) => setResetToken(event.target.value)} required placeholder="Paste the token from Gmail" /></label>}
        {mode !== 'forgot' && <label>{mode === 'reset' ? 'New password' : 'Password'}<input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>}
        <button className="primary" disabled={loading}>{loading ? 'Working...' : mode === 'forgot' ? 'Send reset email' : mode === 'reset' ? 'Reset password' : mode === 'register' ? 'Create account' : 'Sign in'}</button>
      </form>
      {mode === 'forgot' && <button className="text-button" onClick={() => setMode('reset')}>I have a reset token</button>}
      {message && <p className="notice success">{message}</p>}{error && <p className="notice failure">{error}</p>}
    </main>
  )
}

export default App
