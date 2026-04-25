'use client'

import { BookOpen, ListChecks } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SidebarItem } from '@/lib/quizzes'

type Props = {
  item: SidebarItem
  onSelect: () => void
}

export default function SidebarNavItem({ item, onSelect }: Props) {
  const pathname = usePathname()
  const isActive = pathname === item.href
  const Icon = item.kind === 'content' ? BookOpen : ListChecks
  const iconClasses =
    item.kind === 'content'
      ? 'bg-accent-tint text-accent-dim'
      : 'bg-tint text-ink-2'

  return (
    <Link
      href={item.href}
      onClick={onSelect}
      aria-current={isActive ? 'page' : undefined}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[12px] cursor-pointer transition-colors duration-150
        ${
          isActive
            ? 'bg-tint-2 text-ink font-semibold'
            : 'text-ink-2 hover:bg-tint hover:text-ink font-medium'
        }`}
    >
      <span className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${iconClasses}`}>
        <Icon size={20} strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0">
        <span className="block text-[10px] font-bold tracking-widest uppercase text-ink-3 mb-0.5">
          {item.label}
        </span>
        <span className="block leading-snug">{item.title}</span>
      </div>
    </Link>
  )
}
