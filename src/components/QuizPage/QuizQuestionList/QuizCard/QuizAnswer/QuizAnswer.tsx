import Chip from './Chip'

export default function QuizAnswer({ answers }: { answers: string[] }) {
  const multi = answers.length > 1

  return (
    <div className="flex items-baseline gap-2.5">
      <span className="shrink-0 text-[11px] font-bold tracking-[0.06em] bg-accent text-white rounded px-1.75 py-0.5">
        정답
      </span>
      {multi ? (
        <div className="flex flex-wrap gap-1.5">
          {answers.map((a, i) => (
            <Chip key={i}>{a}</Chip>
          ))}
        </div>
      ) : (
        <span className="text-[15px] font-semibold text-ink">{answers[0]}</span>
      )}
    </div>
  )
}
