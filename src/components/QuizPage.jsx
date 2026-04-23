import { Navigate, useParams } from 'react-router'
import { firstLesson, quizByLesson } from '../quizzes'
import QuizCard from './QuizCard'

export default function QuizPage() {
  const { lessonId } = useParams()
  const quiz = quizByLesson[lessonId]

  if (!quiz) return <Navigate to={`/lesson/${firstLesson}`} replace />

  return (
    <div key={quiz.lesson} className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 md:pt-12 pb-20">
      <header className="mb-8 sm:mb-10">
        <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3 mb-2">
          Claude 101 · Lesson {quiz.lesson}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.5px] mb-1.5">
          복습 퀴즈 — {quiz.title}
        </h1>
        <p className="text-sm text-ink-2">
          총 {quiz.questions.length}문항 · 단답형 / 빈칸 채우기
        </p>
      </header>

      {quiz.questions.map((q, i) => (
        <QuizCard key={q.id} question={q} index={i} />
      ))}
    </div>
  )
}
