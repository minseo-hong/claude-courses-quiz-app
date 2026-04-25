import { redirect } from 'next/navigation'
import { getDefaultCourse } from '@/lib/quizzes'
import { coursePath } from '@/lib/urls'

export default function Page() {
  const course = getDefaultCourse()
  if (!course.hasLessons) redirect(coursePath(course.slug))
  redirect(course.firstHref)
}
