import type { QuizQuestion } from '@/lib/quizzes'
import QuizCard from './QuizCard'

type Props = { questions: QuizQuestion[] }

export default function QuizQuestionList({ questions }: Props) {
  return (
    <>
      {questions.map((q, i) => (
        <QuizCard key={q.id} question={q} index={i} />
      ))}
    </>
  )
}
