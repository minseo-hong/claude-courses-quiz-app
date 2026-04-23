'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { lessonContentPath, lessonPath } from '@/lib/urls'

type Props = {
  slug: string
}

function Tab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
        active
          ? 'border-ink text-ink'
          : 'border-transparent text-ink-3 hover:text-ink-2'
      }`}
    >
      {children}
    </Link>
  )
}

export default function LessonTabs({ slug }: Props) {
  const pathname = usePathname() ?? ''
  const contentHref = lessonContentPath(slug)
  const quizHref = lessonPath(slug)
  const onContent = pathname.endsWith('/content')

  return (
    <div className="flex gap-1 border-b border-stroke mb-8">
      <Tab href={contentHref} active={onContent}>강의 내용</Tab>
      <Tab href={quizHref} active={!onContent}>복습 퀴즈</Tab>
    </div>
  )
}
