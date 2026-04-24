import { notFound } from 'next/navigation'
import QuizPage from '@/components/QuizPage'
import {
  courseSlug,
  getNextSidebarItem,
  getPrevSidebarItem,
  quizBySlug,
} from '@/lib/quizzes'
import { lessonQuizPath } from '@/lib/urls'

export function generateStaticParams() {
  return Object.values(quizBySlug).map((q) => ({ courseSlug, slug: q.slug }))
}

export default async function LessonQuizPage(
  props: PageProps<'/courses/[courseSlug]/lessons/[slug]/quiz'>,
) {
  const { slug } = await props.params
  const quiz = quizBySlug[slug]
  if (!quiz) notFound()
  const href = lessonQuizPath(slug)
  const prevItem = getPrevSidebarItem(href)
  const nextItem = getNextSidebarItem(href)
  return <QuizPage quiz={quiz} prevItem={prevItem} nextItem={nextItem} />
}
