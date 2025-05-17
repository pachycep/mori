import { Button } from '../../shared/components/button'
import { useLocation, useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'

export function BottomNavigation() {
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t border-neutral-200 z-50">
      <div className="grid grid-cols-5 h-[60px]">
        <NavigationButton icon="fa-house" path="/" label="홈" />
        <NavigationButton icon="fa-calendar" path="/calendar" label="캘린더" />
        <ActionButton icon="fa-plus" path="/add" label="추가" />
        <NavigationButton icon="fa-users" path="/clients" label="고객" />
        <NavigationButton
          icon="fa-chart-simple"
          path="/reports"
          label="리포트"
        />
      </div>
    </footer>
  )
}

function ActionButton({
  icon,
  path,
  label,
}: {
  icon: string
  path: string
  label: string
}) {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      onClick={() => router.navigate({ to: path })}
      className="flex items-center justify-center relative mt-[-20px]"
      aria-label={label}
      title={label}
    >
      <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shadow-lg hover:bg-amber-700 transition-colors">
        <i className={`fa-solid ${icon} text-white text-xl`} />
      </div>
    </Button>
  )
}

function NavigationButton({
  icon,
  path,
  label,
}: {
  icon: string
  path: string
  label: string
}) {
  const router = useRouter()
  const location = useLocation()

  const isActive = useMemo(() => {
    return (path: string) => {
      if (path === '/') {
        return location.pathname === '/'
      }
      return location.pathname.startsWith(path)
    }
  }, [location.pathname])

  return (
    <Button
      variant="ghost"
      onClick={() => router.navigate({ to: path })}
      className="flex items-center justify-center"
      aria-label={label}
      title={label}
    >
      <i
        className={`fa-solid ${icon} text-xl ${
          isActive(path) ? 'text-amber-600' : 'text-neutral-400'
        }`}
      />
    </Button>
  )
}
