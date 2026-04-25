import { notFound, redirect } from 'next/navigation'
import CoursePlaceholder from '@/components/CoursePlaceholder'
import { courseSlugs, getCourse } from '@/lib/quizzes'
import { lessonQuizPath } from '@/lib/urls'

export function generateStaticParams() {
  return courseSlugs.map((courseSlug) => ({ courseSlug }))
}

export default async function CourseIndexPage(
  props: PageProps<'/courses/[courseSlug]'>,
) {
  const { courseSlug } = await props.params
  const course = getCourse(courseSlug)
  if (!course) notFound()
  if (course.hasLessons) redirect(lessonQuizPath(course.slug, course.firstSlug))
  return <CoursePlaceholder title={course.title} />
}
