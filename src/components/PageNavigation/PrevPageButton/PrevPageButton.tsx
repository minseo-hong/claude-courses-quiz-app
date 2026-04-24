import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { SidebarItem } from '@/lib/quizzes'

type Props = {
  item: SidebarItem
}

export default function PrevPageButton({ item }: Props) {
  return (
    <Link
      href={item.href}
      className="group flex-1 block p-4 rounded-card border border-stroke-2 bg-card hover:border-accent-border hover:bg-accent-tint/50 transition-colors text-right"
    >
      <div className="flex items-center justify-between mb-2">
        <ChevronLeft
          size={18}
          strokeWidth={2.25}
          className="text-ink-3 group-hover:text-accent-dim group-hover:-translate-x-0.5 transition"
        />
        <span className="text-[10px] font-bold tracking-widest uppercase text-ink-3">
          이전
        </span>
      </div>
      <span className="block text-[10px] font-bold tracking-widest uppercase text-ink-3 mb-0.5">
        {item.label}
      </span>
      <span className="block text-sm font-semibold text-ink leading-snug">
        {item.title}
      </span>
    </Link>
  )
}
