import SidebarNavItem from './SidebarNavItem'

export default function SidebarSection({ section, isFirst, onItemSelect }) {
  return (
    <div className={isFirst ? '' : 'mt-5 pt-4 border-t border-stroke'}>
      {section.title && (
        <p className="px-3 mb-2 text-[13px] font-bold text-ink leading-tight">
          {section.title}
        </p>
      )}
      <div className="flex flex-col gap-0.5">
        {section.quizzes.map((q) => (
          <SidebarNavItem key={q.lesson} quiz={q} onSelect={onItemSelect} />
        ))}
      </div>
    </div>
  )
}
