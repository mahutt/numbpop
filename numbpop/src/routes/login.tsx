import { useEffect, useState } from 'react'
import { useAuth, LoginCredentials } from '../context/auth-context'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login, isLoggedIn, error } = useAuth()
  const navigate = useNavigate()
  const [creds, setCreds] = useState<LoginCredentials>({
    email: '',
    password: '',
  })
  const handleLogin = async () => {
    await login(creds)
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
  }, [isLoggedIn, navigate])
  return (
    <div>
      <h2>Log in</h2>
      {error && <p style={{ color: 'red', width: 233 }}>{error}</p>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: 10,
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
        />
        <button style={{ width: '100%' }} onClick={handleLogin}>
          Log in
        </button>
      </div>
    </div>
  )
}
