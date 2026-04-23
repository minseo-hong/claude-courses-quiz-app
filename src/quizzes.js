import SECTIONS from './data/sections'

export const courseSlug = 'claude-101'
export const lessonPath = (slug) => `/courses/${courseSlug}/lessons/${slug}`
export const lessonContentPath = (slug) => `${lessonPath(slug)}/content`

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^lesson-\d+-/, '')
}

const modules = import.meta.glob('./data/*.js', { eager: true })
const quizzes = Object.values(modules)
  .filter((m) => m.default?.lesson)
  .map((m) => ({ ...m.default, slug: slugify(m.default.title) }))
  .sort((a, b) => {
    const na = Number(a.lesson), nb = Number(b.lesson)
    if (isNaN(na) && isNaN(nb)) return a.lesson.localeCompare(b.lesson)
    if (isNaN(na)) return 1
    if (isNaN(nb)) return -1
    return na - nb
  })

const quizByLesson = Object.fromEntries(quizzes.map((q) => [q.lesson, q]))
export const quizBySlug = Object.fromEntries(quizzes.map((q) => [q.slug, q]))

export const grouped = SECTIONS.map((sec) => ({
  ...sec,
  quizzes: sec.lessons.map((l) => quizByLesson[l]).filter(Boolean),
})).filter((sec) => sec.quizzes.length > 0)

const flat = grouped.flatMap((sec) => sec.quizzes)
export const firstSlug = flat[0]?.slug
