import { lazy } from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'
console.log(555)
const Home = lazy(() => import('@/page/home'))
const Student = lazy(() => import('@/page/student'))
const Teacher = lazy(() => import('@/page/teacher'))

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/student',
    element: <Student />
  },
  {
    path: '/teacher',
    element: <Teacher />
  }
]

const Router = () => {
  const appRouter = useRoutes(routesConfig)
  return appRouter
}

export default Router
