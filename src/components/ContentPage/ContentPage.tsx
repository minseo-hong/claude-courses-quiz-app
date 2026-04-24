import type { Quiz } from '@/lib/quizzes'
import MarkdownContent from '../MarkdownContent'

type Props = {
  quiz: Quiz
  source: string
}

export default function ContentPage({ quiz, source }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 md:pt-12 pb-20">
      <header className="mb-8 sm:mb-10">
        <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3 mb-2">
          Claude 101 · Lesson {quiz.lesson}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.5px] mb-1.5">
          {quiz.title}
        </h1>
        <p className="text-sm text-ink-2">강의 내용</p>
      </header>
      <div className="bg-card border border-stroke rounded-card p-6 sm:p-10">
        <MarkdownContent source={source} />
      </div>
    </div>
  )
}
