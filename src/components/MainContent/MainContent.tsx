'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function MainContent({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <main ref={mainRef} className="flex-1 overflow-y-auto pt-14 md:pt-0">
      {children}
    </main>
  )
}
