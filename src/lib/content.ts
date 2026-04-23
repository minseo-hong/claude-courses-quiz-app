import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

const contentDir = path.join(process.cwd(), 'src/content')

export function hasContent(slug: string): boolean {
  return fs.existsSync(path.join(contentDir, `${slug}.md`))
}

export function getContent(slug: string): string | null {
  const file = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, 'utf8')
}

export function getContentSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
