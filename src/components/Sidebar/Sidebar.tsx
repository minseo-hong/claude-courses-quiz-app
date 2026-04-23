import type { SidebarSection } from '@/lib/quizzes'
import SidebarHeader from './SidebarHeader'
import SidebarNav from './SidebarNav'

type Props = {
  open: boolean
  onClose: () => void
  sections: SidebarSection[]
}

export default function Sidebar({ open, onClose, sections }: Props) {
  return (
    <aside
      className={`
      fixed md:sticky top-0 inset-y-0 left-0 z-50
      w-72 md:w-64 h-screen shrink-0
      border-r border-stroke bg-card flex flex-col
      transition-transform duration-300 ease-in-out
      ${open ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}
    >
      <SidebarHeader onClose={onClose} />
      <SidebarNav sections={sections} onItemSelect={onClose} />
    </aside>
  )
}
