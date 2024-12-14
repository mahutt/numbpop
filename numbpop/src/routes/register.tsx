import { useState } from 'react'
import { useAxios } from '../context/axios-context'
import { isAxiosError } from 'axios'

export default function Register() {
  const axios = useAxios()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', user)
      console.log(response.data)
      setError('')
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message)
      }
    }
  }
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
          value={user.name}
          onChange={(event) =>
            setUser({
              ...user,
              name: event.target.value,
            })
          }
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={(event) =>
            setUser({
              ...user,
              email: event.target.value,
            })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={(event) =>
            setUser({
              ...user,
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
