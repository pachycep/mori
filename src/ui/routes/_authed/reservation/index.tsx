import { getReservationList } from '@/manager/controller/reservation.controller'
import type { Reservation } from '@/types/supabase'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CalendarProvider,
  CalendarDate,
  CalendarDatePicker,
  CalendarDatePagination,
  CalendarMonthPicker,
  CalendarHeader,
  CalendarYearPicker,
  CalendarBody,
  CalendarItem,
} from '@/ui/shared/components/calendar/index'
import { Button } from '@/ui/shared/components/button'

export const Route = createFileRoute('/_authed/reservation/')({
  loader: async () => ({
    reservations: await getReservationList(),
  }),
  component: ReservationListPage,
})

function ReservationListPage() {
  const { reservations } = Route.useLoaderData()

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">예약 목록</h2>
      <CreateReservationButton />
      <ReservationList reservations={reservations} />
      <ReservationCalendar />
    </div>
  )
}
function CreateReservationButton() {
  return (
    <Link to="/reservation/new">
      <Button variant="secondary">예약 추가</Button>
    </Link>
  )
}

function ReservationList({ reservations }: { reservations: Reservation[] }) {
  return (
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-300">
      {reservations.map((reservation) => (
        <ReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </ul>
  )
}

function ReservationItem({ reservation }: { reservation: Reservation }) {
  const { id, date, time, customer, memo } = reservation
  return (
    <Link key={id} to="/reservation/$id" params={{ id: id.toString() }}>
      <li className="p-4 hover:bg-gray-50 transition-all">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium text-gray-800">
            {date} {time}
          </div>
        </div>
        <p>
          <strong>이름:</strong>
          {customer.name}
        </p>
        {memo && <div className="text-xs text-gray-500 mt-1">메모: {memo}</div>}
      </li>
    </Link>
  )
}

function ReservationCalendar() {
  const statuses = [
    { id: '123', name: 'Planned', color: '#6B7280' },
    { id: '12', name: 'In Progress', color: '#F59E0B' },
    { id: '13', name: 'Done', color: '#10B981' },
  ]

  const exampleFeatures = Array.from({ length: 20 })
    .fill(null)
    .map(() => ({
      id: 123,
      name: '예약',
      startAt: new Date(),
      endAt: new Date(),
      status: {
        id: 123,
        name: '예약',
        color: 'red',
      },
    }))
  const earliestYear =
    exampleFeatures
      .map((feature) => feature.startAt.getFullYear())
      .sort()
      .at(0) ?? new Date().getFullYear()
  const latestYear =
    exampleFeatures
      .map((feature) => feature.endAt.getFullYear())
      .sort()
      .at(-1) ?? new Date().getFullYear()

  return (
    <CalendarProvider>
      <CalendarDate>
        <CalendarDatePicker>
          <CalendarMonthPicker />
          <CalendarYearPicker start={earliestYear} end={latestYear} />
        </CalendarDatePicker>
        <CalendarDatePagination />
      </CalendarDate>
      <CalendarHeader />
      <CalendarBody features={exampleFeatures}>
        {({ feature }) => <CalendarItem key={feature.id} feature={feature} />}
      </CalendarBody>
    </CalendarProvider>
  )
}
