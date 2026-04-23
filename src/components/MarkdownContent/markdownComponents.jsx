const markdownComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-[1.875rem] sm:text-[2rem] font-bold text-ink tracking-[-0.5px] mt-0 mb-5 scroll-mt-24"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-[1.375rem] sm:text-[1.5rem] font-bold text-ink tracking-[-0.3px] mt-12 mb-4 pb-2 border-b border-stroke scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-[1.0625rem] sm:text-[1.125rem] font-semibold text-ink mt-8 mb-3 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-[0.9375rem] font-semibold text-ink mt-6 mb-2 scroll-mt-24" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-ink-2 leading-[1.8] my-4" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent-dim underline decoration-accent-border decoration-1 underline-offset-2 hover:decoration-accent-dim"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc pl-6 my-4 space-y-2 text-ink-2 leading-[1.8] marker:text-ink-3"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal pl-6 my-4 space-y-2 text-ink-2 leading-[1.8] marker:text-ink-3"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => <em {...props}>{children}</em>,
  hr: (props) => <hr className="my-10 border-stroke" {...props} />,
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-5 border-l-4 border-accent bg-accent-tint/60 text-ink-2 px-5 py-3 rounded-r-card [&>p]:my-1"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = typeof className === 'string' && className.startsWith('language-')
    if (isBlock) {
      return (
        <code className={`font-mono ${className}`} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-tint text-ink font-mono text-[0.85em] break-words"
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-5 bg-ink text-canvas rounded-card p-5 overflow-x-auto text-[0.85rem] leading-6"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto border border-stroke rounded-card">
      <table className="w-full text-sm border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-tint" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => (
    <tr className="border-b border-stroke last:border-b-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="text-left px-4 py-3 font-semibold text-ink align-top"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-3 text-ink-2 leading-[1.7] align-top"
      {...props}
    >
      {children}
    </td>
  ),
  img: ({ alt, src, ...props }) => (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="my-5 rounded-card border border-stroke max-w-full"
      {...props}
    />
  ),
}

export default markdownComponents
