import { useState } from 'react'
import Chip from './Chip'

const TYPE_LABEL = {
  choice: '객관식',
  fill:   '빈칸 채우기',
  term:   '용어 쓰기',
  short:  '단답형',
}

export default function QuizCard({ question, index }) {
  const { type, category, question: text, options, answers, explanation } = question
  const multi = answers.length > 1
  const [revealed, setRevealed] = useState(false)

  const isCorrect = (opt) => answers.some(a => opt.startsWith(a))

  return (
    <div className="bg-card border border-stroke rounded-card p-5 sm:p-7 mb-3 sm:mb-4">
      <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3 sm:mb-3.5">
        Q {String(index + 1).padStart(2, '0')} · {TYPE_LABEL[type] ?? type}
      </p>
      <p className="text-[13px] font-semibold text-ink-2 mb-2">
        {category}
      </p>
      <p
        className="text-[15px] sm:text-base font-medium text-ink leading-[1.65] mb-4 sm:mb-5"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {type === 'choice' && options && (
        <div className="flex flex-col gap-1.5 mb-4">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`px-3 sm:px-3.5 py-2.5 rounded-lg text-sm border transition-colors ${
                revealed && isCorrect(opt)
                  ? 'bg-accent-tint border-accent-border text-ink font-semibold'
                  : 'bg-ghost border-stroke text-ink-2'
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      {revealed ? (
        <div className="border-t border-tint pt-4 flex flex-col gap-2.5">
          {type !== 'choice' && (
            <div className="flex items-baseline gap-2.5">
              <span className="shrink-0 text-[11px] font-bold tracking-[0.06em] bg-accent text-white rounded px-1.75 py-0.5">
                정답
              </span>
              {multi
                ? <div className="flex flex-wrap gap-1.5">{answers.map((a, i) => <Chip key={i}>{a}</Chip>)}</div>
                : <span className="text-[15px] font-semibold text-ink">{answers[0]}</span>
              }
            </div>
          )}
          <div className="flex items-baseline gap-2.5">
            <span className="shrink-0 text-[11px] font-bold tracking-[0.06em] bg-tint-2 text-ink-2 rounded px-1.75 py-0.5">
              해설
            </span>
            <span
              className="text-sm text-ink-4 leading-[1.65]"
              dangerouslySetInnerHTML={{ __html: explanation }}
            />
          </div>
          <button
            className="mt-1 self-start px-4 py-2 text-[13px] font-semibold border border-stroke-2 rounded-lg bg-canvas text-ink-4 cursor-pointer hover:bg-lift transition-colors active:scale-95"
            onClick={() => setRevealed(false)}
          >
            가리기
          </button>
        </div>
      ) : (
        <div className="border-t border-tint pt-4">
          <button
            className="px-4 py-2 text-[13px] font-semibold border border-accent-border rounded-lg bg-accent-tint text-accent-dim cursor-pointer hover:bg-accent/10 transition-colors active:scale-95"
            onClick={() => setRevealed(true)}
          >
            {type === 'choice' ? '정답 확인' : '정답 · 해설 보기'}
          </button>
        </div>
      )}
    </div>
  )
}
