const modules = import.meta.glob('./content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const contentBySlug = Object.fromEntries(
  Object.entries(modules)
    .map(([path, source]) => {
      const slug = path.match(/\/([^/]+)\.md$/)?.[1]
      return slug ? [slug, source] : null
    })
    .filter(Boolean)
)
