import { createFileRoute } from '@tanstack/react-router'
import {
  type AnyFieldApi,
  formOptions,
  useForm,
  useStore,
} from '@tanstack/react-form'
import { Label } from '@/ui/shared/components/label'
import { Input } from '@/ui/shared/components/input'
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
  },
})

function NewReservationPage() {
  const { customers } = Route.useLoaderData()

  const form = useForm({
    ...reservationFormOpts,
    onSubmit: async (data) => {
      console.log(data)
    },
    onSubmitInvalid: (errors) => {
      console.log(errors)
    },
  })

  const formErrors = useStore(form.store, (formState) => formState.errors)

  return (
    <form
      action={createReservation.url}
      method="post"
      encType={'multipart/form-data'}
    >
      {formErrors.map((error) => (
        <p key={error as never as string}>{error}</p>
      ))}

      <form.Field
        name="date"
        validators={{
          onChange: zodRequiredString(),
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
              {field.state.meta.errors.map((error) => (
                <p key={error?.message}>{error?.message}</p>
              ))}
            </>
          )
        }}
      </form.Field>

      <form.Field
        name="time"
        validators={{
          onChange: zodRequiredString(),
          onSubmitAsync: zodRequiredString(),
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
              {field.state.meta.errors.map((error) => (
                <p key={error?.message}>{error?.message}</p>
              ))}
            </>
          )
        }}
      </form.Field>

      <form.Field
        name="customer_id"
        validators={{
          onChange: zodRequiredString(),
          onSubmitAsync: zodRequiredString(),
        }}
      >
        {(field) => {
          return (
            <>
              <Label>고객 선택</Label>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
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
              {field.state.meta.errors.map((error) => (
                <p key={error as never as string}>{error}</p>
              ))}
            </>
          )
        }}
      </form.Field>

      <form.Field
        name="notes"
        validators={{
          onChange: zodRequiredString(),
          onSubmitAsync: zodRequiredString(),
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
