import QuizOption from './QuizOption'

type Props = {
  options: string[]
  answers: string[]
  revealed: boolean
}

export default function QuizOptions({ options, answers, revealed }: Props) {
  const isCorrect = (opt: string) => answers.some((a) => opt.startsWith(a))

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {options.map((opt, i) => (
        <QuizOption key={i} option={opt} highlight={revealed && isCorrect(opt)} />
      ))}
    </div>
  )
}
