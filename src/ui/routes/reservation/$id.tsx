import { createFileRoute, Link } from '@tanstack/react-router'
import { getReservationList } from '@/manager/controller/reservation.controller'
import { getTreatmentsByReservation } from '@/manager/controller/treatment.controller'
import type { Treatment } from '@/types/supabase'

export const Route = createFileRoute('/reservation/$id')({
  loader: async ({ params }) => {
    // FIXME: @dmdm 0510 상세 API로 수정
    const all = await getReservationList()
    const reservation = all.find((r) => r.id === Number(params.id))

    if (!reservation) {
      throw new Error('예약을 찾을 수 없습니다')
    }

    const treatment = await getTreatmentsByReservation({
      data: reservation.id.toString(),
    })

    return { reservation, treatment }
  },
  component: ReservationDetailPage,
})

function ReservationDetailPage() {
  const { reservation, treatment } = Route.useLoaderData()

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">예약 상세</h2>
      <div className="text-sm text-gray-700">
        <div>
          <strong>날짜:</strong> {reservation.date}
        </div>
        <div>
          <strong>시간:</strong> {reservation.time}
        </div>
        <div>
          <strong>고객 ID:</strong>
          <CustomerInfo
            id={reservation.customer.id}
            name={reservation.customer.name}
          />
        </div>
        <TreatmentInfo treatment={treatment} />
        {reservation.notes && (
          <div>
            <strong>메모:</strong> {reservation.notes}
          </div>
        )}
      </div>
    </div>
  )
}

function CustomerInfo({ id, name }: { id: number; name: string }) {
  return (
    <div>
      <strong>이름:</strong>
      <Link
        to="/customers/$id"
        params={{ id: id.toString() }}
        className="text-blue-500 underline"
      >
        <p>{name}</p>
      </Link>
    </div>
  )
}

function TreatmentInfo({ treatment }: { treatment: Treatment | null }) {
  if (!treatment)
    return <p className="text-sm text-gray-500">등록된 시술이 없습니다.</p>

  const { id, name, price, memo } = treatment
  return (
    <>
      <h3 className="text-md font-semibold mb-2">시술 정보</h3>
      <Link
        to="/treatments/$id"
        params={{ id: id.toString() }}
        className="text-blue-500 underline"
      >
        <div className="border rounded-md p-3 bg-white shadow-sm">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-sm text-gray-500">{price.toLocaleString()}원</p>
          {memo && <p className="text-xs text-gray-400">메모: {memo}</p>}
        </div>
      </Link>
    </>
  )
}
