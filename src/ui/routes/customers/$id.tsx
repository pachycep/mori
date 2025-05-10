import { createFileRoute } from '@tanstack/react-router'
import { getCustomerList } from '@/manager/controller/customer.controller'
import { getTreatmentsByCustomerId } from '@/manager/controller/treatment.controller'
import type { Treatment } from '@/types/supabase'

export const Route = createFileRoute('/customers/$id')({
  loader: async ({ params }) => {
    const customers = await getCustomerList()
    const customer = customers.find((c) => c.id === params.id)

    if (!customer) {
      throw new Error('해당 고객을 찾을 수 없습니다')
    }

    const treatments = await getTreatmentsByCustomerId({ data: customer.id })

    return { customer, treatments }
  },
  component: CustomerDetailPage,
})

function CustomerDetailPage() {
  const { customer, treatments } = Route.useLoaderData()

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">고객 상세</h2>
      <div className="text-sm text-gray-700 space-y-2">
        <p>
          <strong>이름:</strong> {customer.name}
        </p>
        <p>
          <strong>전화번호:</strong> {customer.phone}
        </p>
        <p>
          <strong>등급:</strong> {customer.grade}
        </p>
        <p>
          <strong>총 매출:</strong> {customer.total_spent.toLocaleString()}원
        </p>
        <p>
          <strong>최근 방문일:</strong> {customer.last_visit}
        </p>
        {customer.memo && (
          <p>
            <strong>메모:</strong> {customer.memo}
          </p>
        )}
      </div>
      <TreatmentList treatments={treatments} />
    </div>
  )
}

function TreatmentList({ treatments }: { treatments: Treatment[] }) {
  if (treatments.length === 0) {
    return <div>시술 목록이 없습니다.</div>
  }

  return (
    <ul className="space-y-3">
      {treatments.map((t) => (
        <li key={t.id} className="border rounded-md p-3 bg-white shadow-sm">
          <p className="text-sm font-medium">{t.name}</p>
          <p className="text-sm text-gray-500">{t.price.toLocaleString()}원</p>
          {t.memo && <p className="text-xs text-gray-400">메모: {t.memo}</p>}
        </li>
      ))}
    </ul>
  )
}
