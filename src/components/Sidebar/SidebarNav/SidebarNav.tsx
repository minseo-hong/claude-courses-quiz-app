'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import type { SidebarSection as Section } from '@/lib/quizzes'
import SidebarSection from './SidebarSection'

type Props = {
  sections: Section[]
  onItemSelect: () => void
  open: boolean
}

export default function SidebarNav({ sections, onItemSelect, open }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const active = nav.querySelector<HTMLElement>('[aria-current="page"]')
    if (!active) return
    const target =
      active.offsetTop - (nav.clientHeight - active.offsetHeight) / 2
    nav.scrollTo({ top: Math.max(0, target), behavior: 'auto' })
  }, [pathname, open])

  return (
    <nav
      ref={navRef}
      className="flex flex-col p-3 pb-24 flex-1 overflow-y-auto"
    >
      {sections.map((sec, idx) => (
        <SidebarSection
          key={sec.title || 'root'}
          section={sec}
          isFirst={idx === 0}
          onItemSelect={onItemSelect}
        />
      ))}
    </nav>
  )
}
