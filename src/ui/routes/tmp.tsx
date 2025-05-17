import type React from 'react'
import { Button } from '../shared/components/button'
import { useLocation, useRouter } from '@tanstack/react-router'

interface BottomNavItem {
  icon: string
  path: string
}

const BottomNavigation: React.FC = () => {
  const router = useRouter()
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  const navItems: BottomNavItem[] = [
    {
      icon: 'fa-house',
      path: '/',
    },
    {
      icon: 'fa-calendar',
      path: '/calendar',
    },
    {
      icon: 'fa-plus',
      path: '/add',
    },
    {
      icon: 'fa-users',
      path: '/clients',
    },
    {
      icon: 'fa-chart-simple',
      path: '/reports',
    },
  ]

  return (
    <footer className="fixed bottom-0 w-full bg-white border-t border-neutral-200 z-50">
      <div className="grid grid-cols-5 h-[60px]">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => router.navigate({ to: item.path })}
            className="flex items-center justify-center"
          >
            <i
              className={`fa-solid ${item.icon} ${
                isActive(item.path) ? 'text-amber-600' : 'text-neutral-400'
              }`}
            />
          </Button>
        ))}
      </div>
    </footer>
  )
}

const App: React.FC = () => {
  return (
    <div>
      <BottomNavigation />
    </div>
  )
}

export default App
