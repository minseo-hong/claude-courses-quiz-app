import COURSES from '@/data/courses'
import { hasContent } from './content'
import { coursePath, lessonContentPath, lessonQuizPath } from './urls'

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

export type SidebarItemKind = 'content' | 'quiz'
export type SidebarItem = {
  lesson: string
  slug: string
  title: string
  kind: SidebarItemKind
  href: string
  label?: string
}
export type SidebarSection = { title: string; items: SidebarItem[] }

export type CourseSummary = {
  slug: string
  title: string
  shortTitle: string
  href: string
  hasLessons: boolean
}

export type CourseBundle = {
  slug: string
  title: string
  shortTitle: string
  sidebarSections: SidebarSection[]
  quizBySlug: Record<string, Quiz>
  firstSlug: string
  hasLessons: boolean
}

export { coursePath, lessonContentPath, lessonQuizPath } from './urls'

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^lesson-\d+-/, '')
}

type RawCourse = {
  slug: string
  title: string
  shortTitle: string
  data: {
    sections: Array<{ title: string; lessons: string[] }>
    quizModules: QuizModule[]
  }
}

const rawCourses = COURSES as unknown as RawCourse[]

function buildCourse(raw: RawCourse): CourseBundle {
  const quizzes: Quiz[] = raw.data.quizModules
    .map((m) => ({ ...m, slug: m.slug ?? slugify(m.title) }))
    .sort((a, b) => {
      const na = Number(a.lesson)
      const nb = Number(b.lesson)
      if (Number.isNaN(na) && Number.isNaN(nb)) return a.lesson.localeCompare(b.lesson)
      if (Number.isNaN(na)) return 1
      if (Number.isNaN(nb)) return -1
      return na - nb
    })

  const quizByLesson: Record<string, Quiz> = Object.fromEntries(
    quizzes.map((q) => [q.lesson, q]),
  )
  const quizBySlug: Record<string, Quiz> = Object.fromEntries(
    quizzes.map((q) => [q.slug, q]),
  )

  const grouped: Section[] = raw.data.sections
    .map((sec) => ({
      title: sec.title,
      quizzes: sec.lessons.map((l) => quizByLesson[l]).filter(Boolean) as Quiz[],
    }))
    .filter((sec) => sec.quizzes.length > 0)

  const sidebarSections: SidebarSection[] = grouped.map((sec) => ({
    title: sec.title,
    items: sec.quizzes.flatMap((q) => {
      const items: SidebarItem[] = []
      if (hasContent(raw.slug, q.slug)) {
        items.push({
          lesson: q.lesson,
          slug: q.slug,
          title: q.title,
          kind: 'content',
          href: lessonContentPath(raw.slug, q.slug),
          label: '강의 내용',
        })
      }
      items.push({
        lesson: q.lesson,
        slug: q.slug,
        title: q.title,
        kind: 'quiz',
        href: lessonQuizPath(raw.slug, q.slug),
        label: '복습 퀴즈',
      })
      return items
    }),
  }))

  const firstSlug = grouped.flatMap((sec) => sec.quizzes)[0]?.slug ?? ''

  return {
    slug: raw.slug,
    title: raw.title,
    shortTitle: raw.shortTitle,
    sidebarSections,
    quizBySlug,
    firstSlug,
    hasLessons: quizzes.length > 0,
  }
}

const courseBundles: Record<string, CourseBundle> = Object.fromEntries(
  rawCourses.map((c) => [c.slug, buildCourse(c)]),
)

export const courseSlugs: string[] = rawCourses.map((c) => c.slug)

export function getCourse(courseSlug: string): CourseBundle | null {
  return courseBundles[courseSlug] ?? null
}

export const courseSummaries: CourseSummary[] = rawCourses.map((c) => {
  const bundle = courseBundles[c.slug]
  return {
    slug: c.slug,
    title: c.title,
    shortTitle: c.shortTitle,
    href: bundle.hasLessons
      ? lessonQuizPath(c.slug, bundle.firstSlug)
      : coursePath(c.slug),
    hasLessons: bundle.hasLessons,
  }
})

export function getDefaultCourse(): CourseBundle {
  const first = rawCourses.find((c) => courseBundles[c.slug].hasLessons) ?? rawCourses[0]
  return courseBundles[first.slug]
}

export function getNextSidebarItem(
  courseSlug: string,
  href: string,
): SidebarItem | null {
  const bundle = courseBundles[courseSlug]
  if (!bundle) return null
  const flat = bundle.sidebarSections.flatMap((s) => s.items)
  const idx = flat.findIndex((i) => i.href === href)
  if (idx < 0 || idx >= flat.length - 1) return null
  return flat[idx + 1]
}

export function getPrevSidebarItem(
  courseSlug: string,
  href: string,
): SidebarItem | null {
  const bundle = courseBundles[courseSlug]
  if (!bundle) return null
  const flat = bundle.sidebarSections.flatMap((s) => s.items)
  const idx = flat.findIndex((i) => i.href === href)
  if (idx <= 0) return null
  return flat[idx - 1]
}
