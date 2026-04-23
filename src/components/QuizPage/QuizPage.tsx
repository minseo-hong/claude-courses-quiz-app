import type { Quiz } from '@/lib/quizzes'
import LessonTabs from '../LessonTabs'
import QuizPageHeader from './QuizPageHeader'
import QuizQuestionList from './QuizQuestionList'

type Props = {
  quiz: Quiz
  hasContent: boolean
}

export default function QuizPage({ quiz, hasContent }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 md:pt-12 pb-20">
      <QuizPageHeader quiz={quiz} />
      {hasContent && <LessonTabs slug={quiz.slug} />}
      <QuizQuestionList questions={quiz.questions} />
    </div>
  )
}
