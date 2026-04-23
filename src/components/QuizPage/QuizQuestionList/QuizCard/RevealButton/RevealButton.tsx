'use client'

type Props = {
  onClick: () => void
  isChoice: boolean
}

export default function RevealButton({ onClick, isChoice }: Props) {
  return (
    <button
      className="px-4 py-2 text-[13px] font-semibold border border-accent-border rounded-lg bg-accent-tint text-accent-dim cursor-pointer hover:bg-accent/10 transition-colors active:scale-95"
      onClick={onClick}
    >
      {isChoice ? '정답 확인' : '정답 · 해설 보기'}
    </button>
  )
}
