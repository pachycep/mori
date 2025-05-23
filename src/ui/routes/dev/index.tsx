import { useAppForm } from '@/ui/shared/components/form'
import { formOptions } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dev/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DevPage />
}

const formOpts = formOptions({
  defaultValues: {
    badges: [''],
    calendar: '',
  },
})

function DevPage() {
  const form = useAppForm(formOpts)
  return (
    <form.AppForm>
      <form.AppField
        name="badges"
        children={(field) => (
          <field.BadgeField
            label="고객 선택"
            options={[
              {
                value: '1',
                label: '고객 1',
              },
            ]}
          />
        )}
      />
      <form.AppField
        name="calendar"
        children={(field) => <field.CalendarField label="달력 선택" />}
      />
      <form.SubscribeButton label="Submit" />
    </form.AppForm>
  )
}
