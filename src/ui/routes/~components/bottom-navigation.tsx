import {
  BarChartIcon,
  HomeIcon,
  PersonIcon,
  PlusIcon,
  ScissorsIcon,
} from '@radix-ui/react-icons'
import { useLocation, useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Button } from '../../shared/components/button'

export function BottomNavigation() {
  return (
    <footer className="fixed bottom-0 w-dvw flex justify-between items-center bg-white border-t border-neutral-200 z-10 p-4">
      <NavigationButton Icon={HomeIcon} path="/" label="홈" />
      <NavigationButton Icon={ScissorsIcon} path="/treatments" label="기록" />
      <ActionButton Icon={PlusIcon} label="추가" />
      <NavigationButton Icon={PersonIcon} path="/clients" label="고객" />
      <NavigationButton Icon={BarChartIcon} path="/reports" label="리포트" />
    </footer>
  )
}

function ActionButton({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  const router = useRouter()
  const { pathname } = useLocation()

  return (
    <Button
      variant="ghost"
      onClick={() => router.navigate({ to: `${pathname}/new` })}
      className="flex items-center justify-center"
      aria-label={label}
      title={label}
    >
      <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shadow-lg hover:bg-amber-700 transition-colors">
        <Icon className={`text-white`} />
      </div>
    </Button>
  )
}

function NavigationButton({
  Icon,
  path,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>
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
      <Icon
        className={`${isActive(path) ? 'text-amber-600' : 'text-neutral-400'}`}
      />
    </Button>
  )
}
