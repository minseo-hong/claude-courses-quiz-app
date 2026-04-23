import type { SidebarSection as SidebarSectionData } from '@/lib/quizzes'
import SidebarNavItem from './SidebarNavItem'

type Props = {
  section: SidebarSectionData
  isFirst: boolean
  onItemSelect: () => void
}

export default function SidebarSection({ section, isFirst, onItemSelect }: Props) {
  return (
    <div className={isFirst ? '' : 'mt-5 pt-4 border-t border-stroke'}>
      {section.title && (
        <p className="px-3 mb-2 text-[13px] font-bold text-ink leading-tight">
          {section.title}
        </p>
      )}
      <div className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <SidebarNavItem key={item.lesson} item={item} onSelect={onItemSelect} />
        ))}
      </div>
    </div>
  )
}
