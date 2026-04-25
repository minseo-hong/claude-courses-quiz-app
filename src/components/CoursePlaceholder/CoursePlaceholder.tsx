import { Sparkles } from 'lucide-react'

type Props = {
  title: string
}

export default function CoursePlaceholder({ title }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 md:pt-12 pb-20">
      <div className="bg-card border border-stroke rounded-card p-10 sm:p-14 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-tint text-accent-dim mb-5">
          <Sparkles size={26} strokeWidth={2} />
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.5px] mb-2">
          {title}
        </h1>
        <p className="text-sm text-ink-2 leading-relaxed">
          이 코스는 곧 공개될 예정이에요. 강의가 추가되면 사이드바에서 바로 학습을 시작할 수 있어요.
        </p>
      </div>
    </div>
  )
}
