import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { courseSummaries, courseSlugs, getCourse } from '@/lib/quizzes'

export function generateStaticParams() {
  return courseSlugs.map((courseSlug) => ({ courseSlug }))
}

export default async function CourseLayout(
  props: LayoutProps<'/courses/[courseSlug]'>,
) {
  const { courseSlug } = await props.params
  const course = getCourse(courseSlug)
  if (!course) notFound()
  return (
    <AppShell
      sections={course.sidebarSections}
      courses={courseSummaries}
      currentCourseSlug={course.slug}
      currentCourseTitle={course.title}
    >
      {props.children}
    </AppShell>
  )
}
