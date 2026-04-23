export const courseSlug = 'claude-101'

export const lessonPath = (slug: string) => `/courses/${courseSlug}/lessons/${slug}`

export const lessonContentPath = (slug: string) => `${lessonPath(slug)}/content`
