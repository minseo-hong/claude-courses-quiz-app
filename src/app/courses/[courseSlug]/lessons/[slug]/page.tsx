import { notFound } from 'next/navigation'
import ContentPage from '@/components/ContentPage'
import { getContent, getContentSlugs } from '@/lib/content'
import {
  courseSlug,
  getNextSidebarItem,
  getPrevSidebarItem,
  quizBySlug,
} from '@/lib/quizzes'
import { lessonContentPath } from '@/lib/urls'

export function generateStaticParams() {
  return getContentSlugs()
    .filter((slug) => quizBySlug[slug])
    .map((slug) => ({ courseSlug, slug }))
}

export default async function LessonContentPage(
  props: PageProps<'/courses/[courseSlug]/lessons/[slug]'>,
) {
  const { slug } = await props.params
  const quiz = quizBySlug[slug]
  const source = getContent(slug)
  if (!quiz || !source) notFound()
  const href = lessonContentPath(slug)
  const prevItem = getPrevSidebarItem(href)
  const nextItem = getNextSidebarItem(href)
  return (
    <ContentPage
      quiz={quiz}
      source={source}
      prevItem={prevItem}
      nextItem={nextItem}
    />
  )
}
