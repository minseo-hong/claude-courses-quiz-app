import { notFound } from 'next/navigation'
import QuizPage from '@/components/QuizPage'
import {
  courseSlugs,
  getCourse,
  getNextSidebarItem,
  getPrevSidebarItem,
} from '@/lib/quizzes'
import { lessonQuizPath } from '@/lib/urls'

export function generateStaticParams() {
  return courseSlugs.flatMap((courseSlug) => {
    const course = getCourse(courseSlug)
    if (!course) return []
    return Object.values(course.quizBySlug).map((q) => ({
      courseSlug,
      slug: q.slug,
    }))
  })
}

export default async function LessonQuizPage(
  props: PageProps<'/courses/[courseSlug]/lessons/[slug]/quiz'>,
) {
  const { courseSlug, slug } = await props.params
  const course = getCourse(courseSlug)
  if (!course) notFound()
  const quiz = course.quizBySlug[slug]
  if (!quiz) notFound()
  const href = lessonQuizPath(courseSlug, slug)
  const prevItem = getPrevSidebarItem(courseSlug, href)
  const nextItem = getNextSidebarItem(courseSlug, href)
  return (
    <QuizPage
      courseTitle={course.title}
      quiz={quiz}
      prevItem={prevItem}
      nextItem={nextItem}
    />
  )
}
