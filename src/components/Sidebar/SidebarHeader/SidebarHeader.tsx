'use client'

import { X } from 'lucide-react'

type Props = {
  onClose: () => void
}

export default function SidebarHeader({ onClose }: Props) {
  return (
    <div className="px-5 py-5 border-b border-stroke flex items-center justify-between">
      <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3">Claude Courses</p>
      <button
        className="md:hidden p-1 -mr-1 text-ink-3 hover:text-ink cursor-pointer"
        onClick={onClose}
        aria-label="메뉴 닫기"
      >
        <X size={18} />
      </button>
    </div>
  )
}
