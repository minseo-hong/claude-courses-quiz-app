import { useState } from 'react'
import { grouped } from '../../quizzes'
import DrawerBackdrop from './DrawerBackdrop'
import MainContent from './MainContent'
import MobileTopBar from './MobileTopBar'
import Sidebar from './Sidebar'

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <MobileTopBar onOpenDrawer={openDrawer} />
      <DrawerBackdrop open={drawerOpen} onClick={closeDrawer} />
      <Sidebar open={drawerOpen} onClose={closeDrawer} sections={grouped} />
      <MainContent />
    </div>
  )
}
