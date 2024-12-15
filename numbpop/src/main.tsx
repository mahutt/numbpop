import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AxiosProvider } from './context/axios-context.tsx'
import { AuthProvider } from './context/auth-context.tsx'
import Register from './routes/register.tsx'
import Join from './Join.tsx'
import Create from './Create.tsx'
import './index.css'
import Login from './routes/login.tsx'
import Profile from './routes/profile.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Join />,
  },
  {
    path: 'new',
    element: <Create />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AxiosProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AxiosProvider>
  </StrictMode>
)
