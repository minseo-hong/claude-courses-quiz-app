import QuizCard from './QuizCard'

export default function QuizQuestionList({ questions }) {
  return (
    <>
      {questions.map((q, i) => (
        <QuizCard key={q.id} question={q} index={i} />
      ))}
    </>
  )
}
