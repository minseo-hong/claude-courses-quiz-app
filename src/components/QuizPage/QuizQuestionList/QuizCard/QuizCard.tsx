'use client'

import { useState } from 'react'
import type { QuizQuestion as QuizQuestionData } from '@/lib/quizzes'
import HideButton from './HideButton'
import QuizAnswer from './QuizAnswer'
import QuizCardHeader from './QuizCardHeader'
import QuizCategory from './QuizCategory'
import QuizExplanation from './QuizExplanation'
import QuizOptions from './QuizOptions'
import QuizQuestion from './QuizQuestion'
import RevealButton from './RevealButton'

type Props = {
  question: QuizQuestionData
  index: number
}

export default function QuizCard({ question, index }: Props) {
  const { type, category, question: text, options, answers, explanation } = question
  const [revealed, setRevealed] = useState(false)
  const isChoice = type === 'choice'

  return (
    <div className="bg-card border border-stroke rounded-card p-5 sm:p-7 mb-3 sm:mb-4">
      <QuizCardHeader index={index} type={type} />
      <QuizCategory>{category}</QuizCategory>
      <QuizQuestion html={text} />

      {isChoice && options && (
        <QuizOptions options={options} answers={answers} revealed={revealed} />
      )}

      {revealed ? (
        <div className="border-t border-tint pt-4 flex flex-col gap-2.5">
          {!isChoice && <QuizAnswer answers={answers} />}
          <QuizExplanation html={explanation} />
          <HideButton onClick={() => setRevealed(false)} />
        </div>
      ) : (
        <div className="border-t border-tint pt-4">
          <RevealButton onClick={() => setRevealed(true)} isChoice={isChoice} />
        </div>
      )}
    </div>
  )
}
