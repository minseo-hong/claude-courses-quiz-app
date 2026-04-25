'use client'

import { Check, ChevronsUpDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { CourseSummary } from '@/lib/quizzes'

type Props = {
  courses: CourseSummary[]
  currentCourseSlug: string
  onSelect: () => void
}

export default function CourseSwitcher({
  courses,
  currentCourseSlug,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const current = courses.find((c) => c.slug === currentCourseSlug) ?? courses[0]

  useEffect(() => {
    if (!open) return
    const handlePointer = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const handleSelect = () => {
    setOpen(false)
    onSelect()
  }

  return (
    <div ref={wrapperRef} className="relative px-3 pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-stroke bg-ghost hover:bg-lift text-left cursor-pointer transition-colors"
      >
        <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-accent-tint text-accent-dim">
          <Sparkles size={18} strokeWidth={2} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] font-bold tracking-widest uppercase text-ink-3 mb-0.5">
            현재 코스
          </span>
          <span className="block text-[13px] font-semibold text-ink truncate leading-tight">
            {current?.title ?? '코스 선택'}
          </span>
        </span>
        <ChevronsUpDown size={16} className="shrink-0 text-ink-3" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-3 right-3 mt-1.5 z-10 bg-card border border-stroke rounded-lg shadow-lg overflow-hidden"
        >
          {courses.map((course) => {
            const isActive = course.slug === currentCourseSlug
            return (
              <li key={course.slug} role="option" aria-selected={isActive}>
                <Link
                  href={course.href}
                  onClick={handleSelect}
                  className={`flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors ${
                    isActive
                      ? 'bg-tint-2 text-ink font-semibold'
                      : 'text-ink-2 hover:bg-tint hover:text-ink font-medium'
                  }`}
                >
                  <span className="flex-1 min-w-0 truncate">{course.title}</span>
                  {!course.hasLessons && (
                    <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase text-ink-3">
                      준비 중
                    </span>
                  )}
                  {isActive && (
                    <Check size={14} className="shrink-0 text-accent-dim" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
