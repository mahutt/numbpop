import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AxiosProvider } from './context/axios-context.tsx'
import Register from './routes/register.tsx'
import Join from './Join.tsx'
import Create from './Create.tsx'
import './index.css'

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
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AxiosProvider>
      <RouterProvider router={router} />
    </AxiosProvider>
  </StrictMode>
)
