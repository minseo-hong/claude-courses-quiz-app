'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SidebarItem } from '@/lib/quizzes'
import { lessonPath } from '@/lib/urls'

type Props = {
  item: SidebarItem
  onSelect: () => void
}

export default function SidebarNavItem({ item, onSelect }: Props) {
  const pathname = usePathname()
  const href = lessonPath(item.slug)
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onSelect}
      className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] cursor-pointer transition-colors duration-150
        ${
          isActive
            ? 'bg-tint-2 text-ink font-semibold'
            : 'text-ink-2 hover:bg-tint hover:text-ink font-medium'
        }`}
    >
      <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5 text-ink-3">
        Lesson {item.lesson}
      </span>
      {item.title}
    </Link>
  )
}
