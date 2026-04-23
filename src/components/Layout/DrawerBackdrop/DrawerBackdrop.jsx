export default function DrawerBackdrop({ open, onClick }) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClick}
    />
  )
}
