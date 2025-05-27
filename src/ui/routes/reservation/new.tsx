import { createFileRoute } from '@tanstack/react-router'
import { formOptions } from '@tanstack/react-form'
import { Suspense } from 'react'
import { getCustomerList } from '@/manager/controller/customer.controller'
import { createReservation } from '@/manager/controller/reservation.controller'
import { zodRequiredString } from '@/utils/zod'
import { useAppForm } from '@/ui/shared/components/form'

export const Route = createFileRoute('/reservation/new')({
  component: RouteComponent,
  loader: async () => ({
    customers: await getCustomerList(),
  }),
})

function RouteComponent() {
  return (
    <Suspense>
      <NewReservationPage />
    </Suspense>
  )
}

const reservationFormOpts = formOptions({
  defaultValues: {
    date: new Date().toISOString().split('T')[0],
    time: '',
    customer_id: '',
    memo: '',
    customer_name: '',
    serviceId: '',
  },
})

const validators = {
  onChange: zodRequiredString(),
  onSubmit: zodRequiredString(),
}

function NewReservationPage() {
  const { customers } = Route.useLoaderData()

  const form = useAppForm({
    ...reservationFormOpts,
    onSubmit: async ({ value }) => {
      await createReservation({ data: value })
    },
  })

  const selectOptions = [
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
  ]

  const customerOptions = customers.map((c) => ({
    label: c.name,
    value: c.id,
  }))

  const serviceOptions = [
    { label: '시술 1', value: 'service1' },
    { label: '시술 2', value: 'service2' },
  ]

  return (
    <form.AppForm>
      <form.AppField
        name="date"
        validators={validators}
        children={(field) => <field.TextField label="날짜" />}
      />

      <form.AppField
        name="time"
        validators={validators}
        children={(field) => (
          <field.SelectField
            label="시간"
            options={selectOptions}
            placeholder="시간 선택"
          />
        )}
      />

      <form.AppField
        name="customer_id"
        validators={validators}
        children={(field) => (
          <field.SelectField
            label="고객 선택"
            options={customerOptions}
            placeholder="고객 선택"
          />
        )}
      />

      <form.AppField
        name="serviceId"
        validators={validators}
        children={(field) => (
          <field.SelectField
            label="시술 선택"
            options={serviceOptions}
            placeholder="시술 선택"
          />
        )}
      />

      <form.AppField
        name="memo"
        validators={validators}
        children={(field) => <field.TextareaField label="특이사항 메모" />}
      />

      <form.SubscribeButton label="예약 추가" />
    </form.AppForm>
  )
}
