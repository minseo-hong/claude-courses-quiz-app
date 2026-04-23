export default function QuizExplanation({ html }: { html: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="shrink-0 text-[11px] font-bold tracking-[0.06em] bg-tint-2 text-ink-2 rounded px-1.75 py-0.5">
        해설
      </span>
      <span
        className="text-sm text-ink-4 leading-[1.65]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
