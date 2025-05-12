import { createFileRoute } from '@tanstack/react-router'
import { type AnyFieldApi, formOptions, useForm } from '@tanstack/react-form'
import { Label } from '@/ui/shared/components/label'
import { Suspense } from 'react'
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Select,
} from '@/ui/shared/components/select'
import { Button } from '@/ui/shared/components/button'
import { Textarea } from '@/ui/shared/components/textarea'
import { getCustomerList } from '@/manager/controller/customer.controller'
import { createReservation } from '@/manager/controller/reservation.controller'
import { CalendarInput } from '@/ui/shared/components/calendar-input'
import { zodRequiredString } from '@/utils/zod'

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

export const reservationFormOpts = formOptions({
  defaultValues: {
    date: new Date().toISOString().split('T')[0],
    time: '',
    customer_id: '',
    notes: '',
    customer_name: '',
    service_id: '',
  },
})

function NewReservationPage() {
  const { customers } = Route.useLoaderData()

  const form = useForm({
    ...reservationFormOpts,
    onSubmit: async ({ value }) => {
      await createReservation({ data: value })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="date"
        validators={{
          onChange: zodRequiredString(),
          onSubmit: zodRequiredString(),
        }}
      >
        {(field) => {
          return (
            <>
              <Label>날짜</Label>
              <CalendarInput
                value={
                  field.state.value ? new Date(field.state.value) : undefined
                }
                onChange={(value) => {
                  if (value) {
                    field.handleChange(value.toISOString())
                  }
                }}
                placeholder="날짜를 선택하세요"
                disabledDates={(date) => date < new Date()}
              />
              <FieldInfo field={field} />
            </>
          )
        }}
      </form.Field>

      <form.Field
        name="time"
        validators={{
          onChange: zodRequiredString(),
          onSubmit: zodRequiredString(),
        }}
      >
        {(field) => {
          return (
            <>
              <Label>시간</Label>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="시간 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </>
          )
        }}
      </form.Field>

      <form.Field
        name="customer_id"
        validators={{
          onChange: zodRequiredString(),
          onSubmit: zodRequiredString(),
        }}
      >
        {(field) => {
          return (
            <>
              <Label>고객 선택</Label>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value)
                  const selectedCustomer = customers.find((c) => c.id === value)
                  if (selectedCustomer) {
                    form.setFieldValue('customer_name', selectedCustomer.name)
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="고객 선택" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </>
          )
        }}
      </form.Field>

      <form.Field
        name="service_id"
        validators={{
          onChange: zodRequiredString(),
          onSubmit: zodRequiredString(),
        }}
      >
        {(field) => {
          return (
            <>
              <Label>시술 선택</Label>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="시술 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service1">시술 1</SelectItem>
                  <SelectItem value="service2">시술 2</SelectItem>
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </>
          )
        }}
      </form.Field>

      <form.Field
        name="notes"
        validators={{
          onChange: zodRequiredString(),
          onSubmit: zodRequiredString(),
        }}
      >
        {(field) => {
          return (
            <>
              <Label>메모</Label>
              <Textarea
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="특이사항 메모"
              />
              <FieldInfo field={field} />
            </>
          )
        }}
      </form.Field>

      <form.Subscribe
        selector={({ canSubmit, isSubmitting, isDirty }) => [
          canSubmit,
          isSubmitting,
          isDirty,
        ]}
      >
        {([canSubmit, isSubmitting, isDirty]) => (
          <Button
            type="submit"
            disabled={!canSubmit || !isDirty || isSubmitting}
            aria-disabled={!canSubmit || !isDirty || isSubmitting}
          >
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}
