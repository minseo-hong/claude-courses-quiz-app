'use client'

import { useEffect, useState } from 'react'
import type { SidebarSection } from '@/lib/quizzes'
import DrawerBackdrop from '../DrawerBackdrop'
import MainContent from '../MainContent'
import MobileTopBar from '../MobileTopBar'
import Sidebar from '../Sidebar'

type Props = {
  sections: SidebarSection[]
  children: React.ReactNode
}

export default function AppShell({ sections, children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [drawerOpen])

  return (
    <div className="flex min-h-screen">
      <MobileTopBar sections={sections} onOpenDrawer={openDrawer} />
      <DrawerBackdrop open={drawerOpen} onClick={closeDrawer} />
      <Sidebar open={drawerOpen} onClose={closeDrawer} sections={sections} />
      <MainContent>{children}</MainContent>
    </div>
  )
}
