import type { CourseSummary, SidebarSection } from '@/lib/quizzes'
import SidebarHeader from './SidebarHeader'
import SidebarNav from './SidebarNav'
import CourseSwitcher from './CourseSwitcher'
import SidebarEmptyState from './SidebarEmptyState'

type Props = {
  open: boolean
  onClose: () => void
  sections: SidebarSection[]
  courses: CourseSummary[]
  currentCourseSlug: string
}

export default function Sidebar({
  open,
  onClose,
  sections,
  courses,
  currentCourseSlug,
}: Props) {
  return (
    <aside
      className={`
      fixed md:sticky top-0 left-0 z-50
      w-72 h-screen shrink-0
      border-r border-stroke bg-card flex flex-col
      transition-transform duration-300 ease-in-out
      ${open ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}
    >
      <SidebarHeader onClose={onClose} />
      <CourseSwitcher
        courses={courses}
        currentCourseSlug={currentCourseSlug}
        onSelect={onClose}
      />
      {sections.length > 0 ? (
        <SidebarNav sections={sections} onItemSelect={onClose} open={open} />
      ) : (
        <SidebarEmptyState />
      )}
    </aside>
  )
}
