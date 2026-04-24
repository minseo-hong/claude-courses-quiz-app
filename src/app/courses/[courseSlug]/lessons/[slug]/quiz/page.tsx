import { notFound } from 'next/navigation'
import QuizPage from '@/components/QuizPage'
import { courseSlug, quizBySlug } from '@/lib/quizzes'

export function generateStaticParams() {
  return Object.values(quizBySlug).map((q) => ({ courseSlug, slug: q.slug }))
}

export default async function LessonQuizPage(
  props: PageProps<'/courses/[courseSlug]/lessons/[slug]/quiz'>,
) {
  const { slug } = await props.params
  const quiz = quizBySlug[slug]
  if (!quiz) notFound()
  return <QuizPage quiz={quiz} />
}
