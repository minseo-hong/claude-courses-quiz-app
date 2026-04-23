import { redirect } from 'next/navigation'
import { firstSlug } from '@/lib/quizzes'
import { lessonPath } from '@/lib/urls'

export default function Page() {
  redirect(lessonPath(firstSlug))
}
