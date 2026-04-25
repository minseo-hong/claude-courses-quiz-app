import { Clock } from 'lucide-react'
import type { Quiz, SidebarItem } from '@/lib/quizzes'
import MarkdownContent from '../MarkdownContent'
import PageNavigation from '../PageNavigation'

type Props = {
  quiz: Quiz
  source: string
  prevItem: SidebarItem | null
  nextItem: SidebarItem | null
}

const READING_TIME_RE = /^>\s*\*\*예상 소요 시간\s*([^*]+?)\*\*\s*\n+/

export default function ContentPage({ quiz, source, prevItem, nextItem }: Props) {
  const readingMatch = source.match(READING_TIME_RE)
  const readingTime = readingMatch?.[1]?.trim() ?? null
  const body = readingMatch ? source.slice(readingMatch[0].length) : source

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 md:pt-12 pb-20">
      <header className="mb-8 sm:mb-10">
        <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3 mb-2">
          Claude 101 · Lesson {quiz.lesson}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.5px] mb-1.5">
          {quiz.title}
        </h1>
        <p className="text-sm text-ink-2 inline-flex items-center gap-2">
          <span>강의 내용</span>
          {readingTime && (
            <>
              <span aria-hidden className="text-ink-3">·</span>
              <Clock aria-hidden className="w-3.5 h-3.5 text-ink-3" />
              <span>{readingTime}</span>
            </>
          )}
        </p>
      </header>
      <div className="bg-card border border-stroke rounded-card p-6 sm:p-10">
        <MarkdownContent source={body} />
      </div>
      <PageNavigation prev={prevItem} next={nextItem} />
    </div>
  )
}
