import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import QuizPage from './components/QuizPage'
import { firstSlug, lessonPath } from './quizzes'

const fallback = lessonPath(firstSlug)

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={fallback} replace /> },
      { path: 'courses/:courseSlug/lessons/:slug', element: <QuizPage /> },
      { path: '*', element: <Navigate to={fallback} replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
