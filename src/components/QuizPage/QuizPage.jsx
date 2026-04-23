import { Navigate, useParams } from 'react-router'
import { firstSlug, lessonPath, quizBySlug } from '../../quizzes'
import LessonTabs from '../LessonTabs'
import QuizPageHeader from './QuizPageHeader'
import QuizQuestionList from './QuizQuestionList'

export default function QuizPage() {
  const { slug } = useParams()
  const quiz = quizBySlug[slug]

  if (!quiz) return <Navigate to={lessonPath(firstSlug)} replace />

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 md:pt-12 pb-20">
      <QuizPageHeader quiz={quiz} />
      <LessonTabs />
      <QuizQuestionList questions={quiz.questions} />
    </div>
  )
}
