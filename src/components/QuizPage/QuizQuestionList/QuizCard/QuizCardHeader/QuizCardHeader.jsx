const TYPE_LABEL = {
  choice: '객관식',
  fill:   '빈칸 채우기',
  term:   '용어 쓰기',
  short:  '단답형',
}

export default function QuizCardHeader({ index, type }) {
  return (
    <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3 sm:mb-3.5">
      Q {String(index + 1).padStart(2, '0')} · {TYPE_LABEL[type] ?? type}
    </p>
  )
}
