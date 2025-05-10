import { NewRecordForm } from '@/ui/shared/components/NewRecordForm'
import type { Booking } from '@/types/supabase'
import { getSupabaseServerClient } from '@/manager/client/supabase'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const loginFn = createServerFn({ method: 'POST' })
  .validator((d: Booking) => d)
  .handler(async ({ data }) => {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from('bookings').insert(data)

    if (error) {
      return {
        error: true,
        message: error.message,
      }
    }
  })

export const Route = createFileRoute('/_authed/record/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NewRecordPage />
}

async function NewRecordPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">시술 기록 작성</h1>
      <NewRecordForm />
    </div>
  )
}
