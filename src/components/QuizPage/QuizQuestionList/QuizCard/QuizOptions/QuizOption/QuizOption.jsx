export default function QuizOption({ option, highlight }) {
  return (
    <div
      className={`px-3 sm:px-3.5 py-2.5 rounded-lg text-sm border transition-colors ${
        highlight
          ? 'bg-accent-tint border-accent-border text-ink font-semibold'
          : 'bg-ghost border-stroke text-ink-2'
      }`}
    >
      {option}
    </div>
  )
}
