import { Navigate, useParams } from 'react-router'
import { firstLesson, quizByLesson } from '../../quizzes'
import QuizPageHeader from './QuizPageHeader'
import QuizQuestionList from './QuizQuestionList'

export default function QuizPage() {
  const { lessonId } = useParams()
  const quiz = quizByLesson[lessonId]

  if (!quiz) return <Navigate to={`/lesson/${firstLesson}`} replace />

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 md:pt-12 pb-20">
      <QuizPageHeader quiz={quiz} />
      <QuizQuestionList questions={quiz.questions} />
    </div>
  )
}
