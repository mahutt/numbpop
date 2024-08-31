import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
