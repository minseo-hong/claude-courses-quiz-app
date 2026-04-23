export default function QuizCategory({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold text-ink-2 mb-2">
      {children}
    </p>
  )
}
