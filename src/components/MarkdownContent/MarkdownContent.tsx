'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import markdownComponents from './markdownComponents'

type Props = {
  source: string
}

export default function MarkdownContent({ source }: Props) {
  return (
    <article className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {source}
      </ReactMarkdown>
    </article>
  )
}
