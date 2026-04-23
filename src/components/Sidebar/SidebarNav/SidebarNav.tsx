import type { SidebarSection as Section } from '@/lib/quizzes'
import SidebarSection from './SidebarSection'

type Props = {
  sections: Section[]
  onItemSelect: () => void
}

export default function SidebarNav({ sections, onItemSelect }: Props) {
  return (
    <nav className="flex flex-col p-3 flex-1 overflow-y-auto">
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
