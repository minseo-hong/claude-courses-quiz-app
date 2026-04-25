import QuizOption, { type OptionState } from './QuizOption'

type Props = {
  options: string[]
  answers: string[]
  revealed: boolean
  selected: string | null
  onSelect: (option: string) => void
}

export default function QuizOptions({
  options,
  answers,
  revealed,
  selected,
  onSelect,
}: Props) {
  const isCorrect = (opt: string) => answers.some((a) => opt.startsWith(a))

  const stateOf = (opt: string): OptionState => {
    const correct = isCorrect(opt)
    const isSelected = selected === opt
    if (!revealed) return 'idle'
    if (isSelected && correct) return 'correct'
    if (isSelected && !correct) return 'incorrect'
    if (!isSelected && correct) return 'reveal'
    return 'muted'
  }

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {options.map((opt, i) => (
        <QuizOption
          key={i}
          option={opt}
          state={stateOf(opt)}
          onClick={() => onSelect(opt)}
        />
      ))}
    </div>
  )
}
