// app/routes/treatments/$id.tsx
import { createFileRoute } from '@tanstack/react-router'
import { getTreatmentById } from '@/manager/controller/treatment.controller'

export const Route = createFileRoute('/treatments/$id')({
  loader: async ({ params }) => {
    const treatment = await getTreatmentById({ data: params.id })

    if (!treatment) {
      throw new Error('시술 정보를 찾을 수 없습니다')
    }

    return { treatment }
  },
  component: TreatmentDetailPage,
})

function TreatmentDetailPage() {
  const { treatment } = Route.useLoaderData()

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">시술 상세</h2>
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <strong>시술명:</strong> {treatment.name}
        </p>
        <p>
          <strong>금액:</strong> {treatment.price.toLocaleString()}원
        </p>
        {treatment.memo && (
          <p>
            <strong>메모:</strong> {treatment.memo}
          </p>
        )}
        {treatment.image_urls && treatment.image_urls.length > 0 && (
          <div className="mt-2 space-x-2">
            {treatment.image_urls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`시술 이미지 ${idx + 1}`}
                className="inline-block w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
