import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import markdownComponents from './markdownComponents'

export default function MarkdownContent({ source }) {
  return (
    <article className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {source}
      </ReactMarkdown>
    </article>
  )
}
