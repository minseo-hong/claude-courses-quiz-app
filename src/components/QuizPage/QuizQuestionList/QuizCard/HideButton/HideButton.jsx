export default function HideButton({ onClick }) {
  return (
    <button
      className="mt-1 self-start px-4 py-2 text-[13px] font-semibold border border-stroke-2 rounded-lg bg-canvas text-ink-4 cursor-pointer hover:bg-lift transition-colors active:scale-95"
      onClick={onClick}
    >
      가리기
    </button>
  )
}
