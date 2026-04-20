export default function Chip({ children }) {
  return (
    <span className="inline-block bg-tint rounded-md px-2.5 py-0.75 text-sm font-semibold text-ink">
      {children}
    </span>
  )
}
