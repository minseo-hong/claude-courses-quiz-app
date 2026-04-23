import { Menu } from 'lucide-react'
import { useParams } from 'react-router'
import { quizBySlug } from '../../../quizzes'

export default function MobileTopBar({ onOpenDrawer }) {
  const { slug } = useParams()
  const quiz = quizBySlug[slug]
  if (!quiz) return null

  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-card border-b border-stroke flex items-center gap-3 px-4">
      <button
        onClick={onOpenDrawer}
        className="shrink-0 p-1.5 -ml-1.5 rounded-lg text-ink-2 hover:bg-lift hover:text-ink transition-colors cursor-pointer"
        aria-label="메뉴 열기"
      >
        <Menu size={20} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-widest uppercase text-ink-3 leading-none mb-0.5">
          Lesson {quiz.lesson}
        </p>
        <p className="text-[13px] font-semibold text-ink truncate leading-tight">
          {quiz.title}
        </p>
      </div>
    </div>
  )
}
