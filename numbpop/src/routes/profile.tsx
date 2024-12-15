import { useAuth } from '../context/auth-context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, isLoading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login')
    }
  }, [isLoading, user, navigate])

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>{user?.name}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
