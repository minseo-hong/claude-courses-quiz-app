import QuizOption from './QuizOption'

export default function QuizOptions({ options, answers, revealed }) {
  const isCorrect = (opt) => answers.some((a) => opt.startsWith(a))

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {options.map((opt, i) => (
        <QuizOption key={i} option={opt} highlight={revealed && isCorrect(opt)} />
      ))}
    </div>
  )
}
