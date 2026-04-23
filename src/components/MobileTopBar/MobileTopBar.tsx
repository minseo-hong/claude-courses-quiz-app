'use client'

import { Menu } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { SidebarSection } from '@/lib/quizzes'

type Props = {
  sections: SidebarSection[]
  onOpenDrawer: () => void
}

export default function MobileTopBar({ sections, onOpenDrawer }: Props) {
  const params = useParams<{ slug?: string }>()
  const slug = params?.slug
  const item = sections
    .flatMap((s) => s.items)
    .find((i) => i.slug === slug)

  if (!item) return null

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
          Lesson {item.lesson}
        </p>
        <p className="text-[13px] font-semibold text-ink truncate leading-tight">
          {item.title}
        </p>
      </div>
    </div>
  )
}
