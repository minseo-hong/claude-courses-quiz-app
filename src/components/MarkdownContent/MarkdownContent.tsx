'use client'

import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkGfm from 'remark-gfm'
import markdownComponents from './markdownComponents'

type Props = {
  source: string
}

const YOUTUBE_RE = /<!--\s*youtube:\s*([\w-]+)\s*-->/g

type Part = { type: 'md'; text: string } | { type: 'youtube'; id: string }

function splitParts(source: string): Part[] {
  const parts: Part[] = []
  let last = 0
  YOUTUBE_RE.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = YOUTUBE_RE.exec(source))) {
    parts.push({ type: 'md', text: source.slice(last, match.index) })
    parts.push({ type: 'youtube', id: match[1] })
    last = match.index + match[0].length
  }
  parts.push({ type: 'md', text: source.slice(last) })
  return parts
}

export default function MarkdownContent({ source }: Props) {
  const parts = splitParts(source)

  return (
    <article className="max-w-none">
      {parts.map((part, i) => {
        if (part.type === 'youtube') {
          return (
            <div
              key={i}
              className="aspect-video my-6 rounded-card overflow-hidden border border-stroke bg-card"
            >
              <iframe
                src={`https://www.youtube.com/embed/${part.id}`}
                title="YouTube 영상"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )
        }
        if (!part.text.trim()) return <Fragment key={i} />
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm, remarkCjkFriendly]}
            components={markdownComponents}
          >
            {part.text}
          </ReactMarkdown>
        )
      })}
    </article>
  )
}
