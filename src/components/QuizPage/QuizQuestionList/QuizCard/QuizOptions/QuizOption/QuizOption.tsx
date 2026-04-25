'use client'

import { Check, X } from 'lucide-react'

export type OptionState = 'idle' | 'correct' | 'incorrect' | 'reveal' | 'muted'

type Props = {
  option: string
  state: OptionState
  onClick: () => void
}

const stateClasses: Record<OptionState, string> = {
  idle: 'bg-ghost border-stroke text-ink-2 hover:bg-tint hover:border-stroke-2 hover:text-ink',
  correct: 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold',
  incorrect: 'bg-rose-50 border-rose-300 text-rose-900 font-semibold',
  reveal: 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold',
  muted: 'bg-ghost border-stroke text-ink-3',
}

export default function QuizOption({ option, state, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 w-full text-left px-3 sm:px-3.5 py-2.5 rounded-lg text-sm border transition-colors cursor-pointer ${stateClasses[state]}`}
    >
      <span className="flex-1">{option}</span>
      {(state === 'correct' || state === 'reveal') && (
        <Check aria-hidden className="shrink-0 w-4 h-4 text-emerald-600" />
      )}
      {state === 'incorrect' && (
        <X aria-hidden className="shrink-0 w-4 h-4 text-rose-600" />
      )}
    </button>
  )
}
