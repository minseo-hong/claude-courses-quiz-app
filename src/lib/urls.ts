export const courseSlug = 'claude-101'

export const lessonContentPath = (slug: string) => `/courses/${courseSlug}/lessons/${slug}`

export const lessonQuizPath = (slug: string) => `${lessonContentPath(slug)}/quiz`
