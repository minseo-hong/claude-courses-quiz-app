import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

const contentRoot = path.join(process.cwd(), 'src/content')

const courseDir = (courseSlug: string) => path.join(contentRoot, courseSlug)

export function hasContent(courseSlug: string, slug: string): boolean {
  return fs.existsSync(path.join(courseDir(courseSlug), `${slug}.md`))
}

export function getContent(courseSlug: string, slug: string): string | null {
  const file = path.join(courseDir(courseSlug), `${slug}.md`)
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, 'utf8')
}

export function getContentSlugs(courseSlug: string): string[] {
  const dir = courseDir(courseSlug)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
