import { redirect } from 'next/navigation'
import { firstSlug } from '@/lib/quizzes'
import { lessonQuizPath } from '@/lib/urls'

export default function Page() {
  redirect(lessonQuizPath(firstSlug))
}
