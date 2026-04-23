const modules = import.meta.glob('./content/*.jsx', { eager: true })

export const contentBySlug = Object.fromEntries(
  Object.entries(modules)
    .map(([path, m]) => {
      const slug = path.match(/\/([^/]+)\.jsx$/)?.[1]
      return slug ? [slug, m.default] : null
    })
    .filter(Boolean)
)
