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

export type LessonModule = {
  lesson: string
  title: string
  slug?: string
  questions?: QuizQuestion[]
}

export type QuizModule = LessonModule

export type Lesson = {
  lesson: string
  title: string
  slug: string
  questions?: QuizQuestion[]
}

export type Quiz = Lesson & { questions: QuizQuestion[] }

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
  lessonBySlug: Record<string, Lesson>
  quizBySlug: Record<string, Quiz>
  firstSlug: string
  firstHref: string
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
    quizModules: LessonModule[]
  }
}

const rawCourses = COURSES as unknown as RawCourse[]

function hasQuestions(lesson: Lesson): lesson is Quiz {
  return Array.isArray(lesson.questions) && lesson.questions.length > 0
}

function buildCourse(raw: RawCourse): CourseBundle {
  const lessons: Lesson[] = raw.data.quizModules
    .map((m) => ({ ...m, slug: m.slug ?? slugify(m.title) }))
    .sort((a, b) => {
      const na = Number(a.lesson)
      const nb = Number(b.lesson)
      if (Number.isNaN(na) && Number.isNaN(nb)) return a.lesson.localeCompare(b.lesson)
      if (Number.isNaN(na)) return 1
      if (Number.isNaN(nb)) return -1
      return na - nb
    })

  const lessonByLesson: Record<string, Lesson> = Object.fromEntries(
    lessons.map((l) => [l.lesson, l]),
  )
  const lessonBySlug: Record<string, Lesson> = Object.fromEntries(
    lessons.map((l) => [l.slug, l]),
  )
  const quizBySlug: Record<string, Quiz> = Object.fromEntries(
    lessons.filter(hasQuestions).map((q) => [q.slug, q]),
  )

  const grouped = raw.data.sections
    .map((sec) => ({
      title: sec.title,
      lessons: sec.lessons
        .map((l) => lessonByLesson[l])
        .filter((lesson): lesson is Lesson => {
          if (!lesson) return false
          return hasContent(raw.slug, lesson.slug) || hasQuestions(lesson)
        }),
    }))
    .filter((sec) => sec.lessons.length > 0)

  const sidebarSections: SidebarSection[] = grouped.map((sec) => ({
    title: sec.title,
    items: sec.lessons.flatMap((lesson) => {
      const items: SidebarItem[] = []
      if (hasContent(raw.slug, lesson.slug)) {
        items.push({
          lesson: lesson.lesson,
          slug: lesson.slug,
          title: lesson.title,
          kind: 'content',
          href: lessonContentPath(raw.slug, lesson.slug),
          label: '강의 내용',
        })
      }
      if (hasQuestions(lesson)) {
        items.push({
          lesson: lesson.lesson,
          slug: lesson.slug,
          title: lesson.title,
          kind: 'quiz',
          href: lessonQuizPath(raw.slug, lesson.slug),
          label: '복습 퀴즈',
        })
      }
      return items
    }),
  }))

  const firstItem = sidebarSections.flatMap((s) => s.items)[0] ?? null
  const firstSlug = firstItem?.slug ?? ''
  const firstHref = firstItem?.href ?? ''

  return {
    slug: raw.slug,
    title: raw.title,
    shortTitle: raw.shortTitle,
    sidebarSections,
    lessonBySlug,
    quizBySlug,
    firstSlug,
    firstHref,
    hasLessons: firstItem !== null,
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
    href: bundle.hasLessons ? bundle.firstHref : coursePath(c.slug),
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
