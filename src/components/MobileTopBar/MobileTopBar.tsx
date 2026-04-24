'use client'

import { BookOpen, ListChecks, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { SidebarSection } from '@/lib/quizzes'

type Props = {
  sections: SidebarSection[]
  onOpenDrawer: () => void
}

export default function MobileTopBar({ sections, onOpenDrawer }: Props) {
  const pathname = usePathname()
  const item = sections
    .flatMap((s) => s.items)
    .find((i) => i.href === pathname)

  if (!item) return null

  const Icon = item.kind === 'content' ? BookOpen : ListChecks
  const iconClasses =
    item.kind === 'content'
      ? 'bg-accent-tint text-accent-dim'
      : 'bg-tint text-ink-2'

  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-card border-b border-stroke flex items-center gap-3 px-4">
      <button
        onClick={onOpenDrawer}
        className="shrink-0 p-1.5 -ml-1.5 rounded-lg text-ink-2 hover:bg-lift hover:text-ink transition-colors cursor-pointer"
        aria-label="메뉴 열기"
      >
        <Menu size={20} />
      </button>
      <span className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-lg ${iconClasses}`}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-widest uppercase text-ink-3 leading-none mb-0.5">
          {item.label}
        </p>
        <p className="text-[13px] font-semibold text-ink truncate leading-tight">
          {item.title}
        </p>
      </div>
    </div>
  )
}
