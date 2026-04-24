import type { SidebarItem } from '@/lib/quizzes'
import NextPageButton from './NextPageButton'
import PrevPageButton from './PrevPageButton'

type Props = {
  prev: SidebarItem | null
  next: SidebarItem | null
}

export default function PageNavigation({ prev, next }: Props) {
  if (!prev && !next) return null

  return (
    <nav className="mt-12 flex gap-3 sm:gap-4">
      {prev ? <PrevPageButton item={prev} /> : <div className="flex-1" />}
      {next ? <NextPageButton item={next} /> : <div className="flex-1" />}
    </nav>
  )
}
