import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from 'components/App'
import routes, { notLoggedInRoutes } from './config'
import { useEmail } from 'hooks/useEmail'

export default function Root() {
  const [email] = useEmail()
  const routesUsed = email ? routes : notLoggedInRoutes
  const router = createBrowserRouter([{ element: <App />, children: routesUsed }])

  return <RouterProvider router={router} />
}
