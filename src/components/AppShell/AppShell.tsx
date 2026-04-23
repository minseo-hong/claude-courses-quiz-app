'use client'

import { useState } from 'react'
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

  return (
    <div className="flex h-screen overflow-hidden">
      <MobileTopBar sections={sections} onOpenDrawer={openDrawer} />
      <DrawerBackdrop open={drawerOpen} onClick={closeDrawer} />
      <Sidebar open={drawerOpen} onClose={closeDrawer} sections={sections} />
      <MainContent>{children}</MainContent>
    </div>
  )
}
