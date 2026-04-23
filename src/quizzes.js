import SECTIONS from './data/sections'

const modules = import.meta.glob('./data/*.js', { eager: true })
const quizzes = Object.values(modules)
  .filter((m) => m.default?.lesson)
  .map((m) => m.default)
  .sort((a, b) => {
    const na = Number(a.lesson), nb = Number(b.lesson)
    if (isNaN(na) && isNaN(nb)) return a.lesson.localeCompare(b.lesson)
    if (isNaN(na)) return 1
    if (isNaN(nb)) return -1
    return na - nb
  })

export const quizByLesson = Object.fromEntries(quizzes.map((q) => [q.lesson, q]))

export const grouped = SECTIONS.map((sec) => ({
  ...sec,
  quizzes: sec.lessons.map((l) => quizByLesson[l]).filter(Boolean),
})).filter((sec) => sec.quizzes.length > 0)

const flat = grouped.flatMap((sec) => sec.quizzes)
export const firstLesson = flat[0]?.lesson
