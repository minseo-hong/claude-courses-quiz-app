import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useParams } from 'react-router'
import { grouped, quizByLesson } from '../quizzes'

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="5"  width="16" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="2" y="9.25" width="16" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="2" y="13.5" width="16" height="1.5" rx="0.75" fill="currentColor"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}

function MobileTopBar({ onOpenDrawer }) {
  const { lessonId } = useParams()
  const quiz = quizByLesson[lessonId]
  if (!quiz) return null

  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-card border-b border-stroke flex items-center gap-3 px-4">
      <button
        onClick={onOpenDrawer}
        className="shrink-0 p-1.5 -ml-1.5 rounded-lg text-ink-2 hover:bg-lift hover:text-ink transition-colors cursor-pointer"
        aria-label="메뉴 열기"
      >
        <HamburgerIcon />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-widest uppercase text-ink-3 leading-none mb-0.5">
          Lesson {quiz.lesson}
        </p>
        <p className="text-[13px] font-semibold text-ink truncate leading-tight">
          {quiz.title}
        </p>
      </div>
    </div>
  )
}

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const mainRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex h-screen overflow-hidden">
      <MobileTopBar onOpenDrawer={() => setDrawerOpen(true)} />

      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-50
        w-72 md:w-64 h-screen shrink-0
        border-r border-stroke bg-card flex flex-col
        transition-transform duration-300 ease-in-out
        ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="px-5 py-5 border-b border-stroke flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3">Claude Courses</p>
          <button
            className="md:hidden p-1 -mr-1 text-ink-3 hover:text-ink cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-col p-3 flex-1 overflow-y-auto">
          {grouped.map((sec, secIdx) => (
            <div
              key={sec.title || 'root'}
              className={secIdx > 0 ? 'mt-5 pt-4 border-t border-stroke' : ''}
            >
              {sec.title && (
                <p className="px-3 mb-2 text-[13px] font-bold text-ink leading-tight">
                  {sec.title}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {sec.quizzes.map((q) => (
                  <NavLink
                    key={q.lesson}
                    to={`/lesson/${q.lesson}`}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      `w-full text-left px-3 py-2.5 rounded-lg text-[13px] cursor-pointer transition-colors duration-150
                      ${isActive
                        ? 'bg-tint-2 text-ink font-semibold'
                        : 'text-ink-2 hover:bg-tint hover:text-ink font-medium'
                      }`
                    }
                  >
                    <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5 text-ink-3">
                      Lesson {q.lesson}
                    </span>
                    {q.title}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main ref={mainRef} className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  )
}
