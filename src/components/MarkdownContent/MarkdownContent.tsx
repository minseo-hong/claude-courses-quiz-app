'use client'

import ReactMarkdown from 'react-markdown'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkGfm from 'remark-gfm'
import markdownComponents from './markdownComponents'

type Props = {
  source: string
}

export default function MarkdownContent({ source }: Props) {
  return (
    <article className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkCjkFriendly]}
        components={markdownComponents}
      >
        {source}
      </ReactMarkdown>
    </article>
  )
}
