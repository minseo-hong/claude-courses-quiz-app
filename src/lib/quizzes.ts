import SECTIONS from '@/data/sections'

import q01 from '@/data/01-what-is-claude'
import q02 from '@/data/02-first-conversation'
import q03 from '@/data/03-getting-better-results'
import q04 from '@/data/04-desktop-app-chat-cowork-code'
import q05 from '@/data/05-introduction-to-projects'
import q06 from '@/data/06-creating-with-artifacts'
import q07 from '@/data/07-working-with-skills'
import q08 from '@/data/08-connecting-your-tools'
import q09 from '@/data/09-enterprise-search'
import q10 from '@/data/10-research-mode-for-deep-dives'
import q11 from '@/data/11-claude-in-action-use-cases-by-role'
import q12 from '@/data/12-other-ways-to-work-with-claude'
import q13 from '@/data/13-whats-next'
import s1 from '@/data/s1-meet-claude-review'
import s2 from '@/data/s2-organizing-knowledge-review'
import s3 from '@/data/s3-expanding-reach-review'
import s4 from '@/data/s4-putting-it-together-review'
import r1 from '@/data/r1-final-exam'
import r2 from '@/data/r2-exam-2'
import r3 from '@/data/r3-exam-3'
import r4 from '@/data/r4-exam-4'
import r5 from '@/data/r5-exam-5'

export type QuizType = 'choice' | 'fill' | 'term' | 'short'

export type QuizQuestion = {
  id: number
  type: QuizType
  category: string
  question: string
  options?: string[]
  answers: string[]
  explanation: string
}

export type QuizModule = {
  lesson: string
  title: string
  slug?: string
  questions: QuizQuestion[]
}

export type Quiz = QuizModule & { slug: string }

export type Section = {
  title: string
  quizzes: Quiz[]
}

export type SidebarItem = { lesson: string; slug: string; title: string }
export type SidebarSection = { title: string; items: SidebarItem[] }

export { courseSlug, lessonPath, lessonContentPath } from './urls'

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^lesson-\d+-/, '')
}

const quizModules = [
  q01, q02, q03, q04, q05, q06, q07, q08, q09, q10,
  q11, q12, q13,
  s1, s2, s3, s4,
  r1, r2, r3, r4, r5,
] as unknown as QuizModule[]

const quizzes: Quiz[] = quizModules
  .map((m) => ({ ...m, slug: m.slug ?? slugify(m.title) }))
  .sort((a, b) => {
    const na = Number(a.lesson)
    const nb = Number(b.lesson)
    if (Number.isNaN(na) && Number.isNaN(nb)) return a.lesson.localeCompare(b.lesson)
    if (Number.isNaN(na)) return 1
    if (Number.isNaN(nb)) return -1
    return na - nb
  })

const quizByLesson: Record<string, Quiz> = Object.fromEntries(quizzes.map((q) => [q.lesson, q]))
export const quizBySlug: Record<string, Quiz> = Object.fromEntries(quizzes.map((q) => [q.slug, q]))

const sectionsRaw = SECTIONS as unknown as Array<{ title: string; lessons: string[] }>

export const grouped: Section[] = sectionsRaw
  .map((sec) => ({
    title: sec.title,
    quizzes: sec.lessons.map((l) => quizByLesson[l]).filter(Boolean) as Quiz[],
  }))
  .filter((sec) => sec.quizzes.length > 0)

export const sidebarSections: SidebarSection[] = grouped.map((sec) => ({
  title: sec.title,
  items: sec.quizzes.map((q) => ({ lesson: q.lesson, slug: q.slug, title: q.title })),
}))

const flat = grouped.flatMap((sec) => sec.quizzes)
export const firstSlug: string = flat[0]?.slug ?? ''
