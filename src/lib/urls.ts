export const defaultCourseSlug = 'claude-101'

export const coursePath = (courseSlug: string) => `/courses/${courseSlug}`

export const lessonContentPath = (courseSlug: string, slug: string) =>
  `${coursePath(courseSlug)}/lessons/${slug}`

export const lessonQuizPath = (courseSlug: string, slug: string) =>
  `${lessonContentPath(courseSlug, slug)}/quiz`
