'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <main className="flex-1 min-w-0 pt-14 md:pt-0">
      {children}
    </main>
  )
}
