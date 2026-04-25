import { notFound } from 'next/navigation'
import ContentPage from '@/components/ContentPage'
import { getContent, getContentSlugs } from '@/lib/content'
import {
  courseSlugs,
  getCourse,
  getNextSidebarItem,
  getPrevSidebarItem,
} from '@/lib/quizzes'
import { lessonContentPath } from '@/lib/urls'

export function generateStaticParams() {
  return courseSlugs.flatMap((courseSlug) => {
    const course = getCourse(courseSlug)
    if (!course) return []
    return getContentSlugs(courseSlug)
      .filter((slug) => course.quizBySlug[slug])
      .map((slug) => ({ courseSlug, slug }))
  })
}

export default async function LessonContentPage(
  props: PageProps<'/courses/[courseSlug]/lessons/[slug]'>,
) {
  const { courseSlug, slug } = await props.params
  const course = getCourse(courseSlug)
  if (!course) notFound()
  const quiz = course.quizBySlug[slug]
  const source = getContent(courseSlug, slug)
  if (!quiz || !source) notFound()
  const href = lessonContentPath(courseSlug, slug)
  const prevItem = getPrevSidebarItem(courseSlug, href)
  const nextItem = getNextSidebarItem(courseSlug, href)
  return (
    <ContentPage
      courseTitle={course.title}
      quiz={quiz}
      source={source}
      prevItem={prevItem}
      nextItem={nextItem}
    />
  )
}
