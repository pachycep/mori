import { useLocation } from '@tanstack/react-router'

export function Header() {
  const { pathname } = useLocation()

  const title = pathname.toUpperCase()

  return (
    <header className="fixed top-0 w-full bg-white text-neutral-900 shadow-sm z-50">
      <div className="flex items-center justify-between p-4 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <h1 className="text-xl font-medium text-neutral-800">{title}</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
            <i className="fa-solid fa-bell" />
          </button>
          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
            <i className="fa-solid fa-gear" />
          </button>
        </div>
      </div>
    </header>
  )
}
