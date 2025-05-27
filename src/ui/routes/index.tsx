import { createFileRoute } from '@tanstack/react-router'
import { BellIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import React, { useRef, useLayoutEffect, useState, forwardRef } from 'react'
import { getNext7Days } from '../shared/utils/date'
import { getDesignerById } from '@/manager/controller/designer.controller'
import type { Designer, Reservation } from '@/types/supabase'
import { getReservationList } from '@/manager/controller/reservation.controller'
import { Badge } from '../shared/components/badge'

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const designer = await getDesignerById({ data: 1 })
    const reservations = await getReservationList()
    return { designer, reservations }
  },
})

export function Home() {
  const { designer, reservations } = Route.useLoaderData()

  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [])

  return (
    <div data-testid="home-wrapper" style={{ paddingTop: headerHeight }}>
      <Header ref={headerRef} designer={designer} />
      <ReservationList reservations={reservations} />
    </div>
  )
}

const today = new Date()
const dates = getNext7Days(today)

const Header = forwardRef<HTMLDivElement, { designer: Designer | undefined }>(
  ({ designer }, ref) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    return (
      <div
        ref={ref}
        className="fixed top-0 left-0 right-0 flex flex-col gap-4 items-center p-4 bg-white shadow-sm w-full"
      >
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-medium text-neutral-800 truncate">
            안녕하세요, {designer?.name || ''}님
          </p>
          <div className="flex gap-4 items-center">
            <SearchIcon size={16} />
            <BellIcon size={16} />
            <SettingsIcon size={16} />
          </div>
        </div>

        <div className="flex gap-1 justify-start items-center w-full overflow-x-auto scrollbar-hide">
          {dates.map((item, idx) => (
            <div
              key={item.day + item.date}
              className={`flex flex-col items-center p-2 rounded-lg min-w-[54px] ${selectedIndex === idx ? 'bg-amber-600' : ''}`}
              onClick={() => setSelectedIndex(idx)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`flex flex-col items-center`}>
                <div
                  className={`text-xs ${selectedIndex === idx ? 'text-white' : 'text-neutral-900'}`}
                >
                  {item.day}
                </div>
                <div
                  className={`text-sm font-medium ${selectedIndex === idx ? 'text-white' : 'text-neutral-900'}`}
                >
                  {item.date}
                </div>
                {selectedIndex === idx && (
                  <div className="flex items-start pt-1">
                    <div className="flex items-start bg-white rounded-full h-[3.5px] w-[3.5px]" />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-col justify-center items-center p-2 rounded-lg min-w-[54px] h-full">
            <p className="text-xs text-neutral-600">+More</p>
          </div>
        </div>
      </div>
    )
  },
)
Header.displayName = 'Header'

function ReservationList({ reservations }: { reservations: Reservation[] }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {reservations.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}

function ReservationCard({ reservation }: { reservation: Reservation }) {
  const {
    customer: { name, imageUrl, phone },
    services,
    time,
    status,
    memo,
    date,
  } = reservation
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
      <img
        src={imageUrl || '/default-profile.png'}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-bold text-base text-neutral-900 truncate">
            {name}
          </p>
          <p className="text-xs text-neutral-400">{phone}</p>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === '완료'
                ? 'bg-green-100 text-green-700'
                : status === '진행중'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-500'
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <Badge key={service} variant="outline">
              {service}
            </Badge>
          ))}
        </div>

        <div>
          <p className="text-xs text-neutral-400">{memo}</p>
        </div>

        <div className="text-xs text-neutral-400">{time}</div>
      </div>
    </div>
  )
}
