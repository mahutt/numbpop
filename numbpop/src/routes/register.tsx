import { useEffect, useState } from 'react'
import { useAuth } from '../context/auth-context'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { user, isLoading, register, error } = useAuth()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleRegister = async () => {
    register(userInfo)
  }

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/profile')
    }
  }, [isLoading, user, navigate])

  return (
    <div>
      <h2>Sign up</h2>
      {error && <p style={{ color: 'red', width: 233 }}>{error}</p>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: 10,
        }}
      >
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userInfo.name}
          onChange={(event) =>
            setUserInfo({
              ...userInfo,
              name: event.target.value,
            })
          }
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userInfo.email}
          onChange={(event) =>
            setUserInfo({
              ...userInfo,
              email: event.target.value,
            })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userInfo.password}
          onChange={(event) =>
            setUserInfo({
              ...userInfo,
              password: event.target.value,
            })
          }
        />
        <button style={{ width: '100%' }} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  )
}
