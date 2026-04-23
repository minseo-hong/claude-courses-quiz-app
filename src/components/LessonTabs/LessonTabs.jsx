import { NavLink, useParams } from 'react-router'
import { contentBySlug } from '../../contents'
import { lessonContentPath, lessonPath } from '../../quizzes'

const tabClass = ({ isActive }) =>
  `px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
    isActive
      ? 'border-ink text-ink'
      : 'border-transparent text-ink-3 hover:text-ink-2'
  }`

export default function LessonTabs() {
  const { slug } = useParams()
  if (!contentBySlug[slug]) return null

  return (
    <div className="flex gap-1 border-b border-stroke mb-8">
      <NavLink to={lessonContentPath(slug)} className={tabClass}>
        강의 내용
      </NavLink>
      <NavLink to={lessonPath(slug)} end className={tabClass}>
        복습 퀴즈
      </NavLink>
    </div>
  )
}
