import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import QuizPage from './components/QuizPage'
import { firstLesson } from './quizzes'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={`/lesson/${firstLesson}`} replace /> },
      { path: 'lesson/:lessonId', element: <QuizPage /> },
      { path: '*', element: <Navigate to={`/lesson/${firstLesson}`} replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
