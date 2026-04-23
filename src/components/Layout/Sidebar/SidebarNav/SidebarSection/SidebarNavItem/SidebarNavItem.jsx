import { NavLink } from 'react-router'

export default function SidebarNavItem({ quiz, onSelect }) {
  return (
    <NavLink
      to={`/lesson/${quiz.lesson}`}
      onClick={onSelect}
      className={({ isActive }) =>
        `w-full text-left px-3 py-2.5 rounded-lg text-[13px] cursor-pointer transition-colors duration-150
        ${isActive
          ? 'bg-tint-2 text-ink font-semibold'
          : 'text-ink-2 hover:bg-tint hover:text-ink font-medium'
        }`
      }
    >
      <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5 text-ink-3">
        Lesson {quiz.lesson}
      </span>
      {quiz.title}
    </NavLink>
  )
}
