import { getCustomerList } from '@/manager/controller/customer.controller'
import { getDesignerServices } from '@/manager/controller/designer.controller'
import { createTreatment } from '@/manager/controller/treatment.controller'
import { useAppForm } from '@/ui/shared/components/form'
import { formOptions } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/treatments/new')({
  loader: async () => {
    const id = 1 // TODO: 디자이너 아이디 받아오기
    const clients = await getCustomerList()
    const services = await getDesignerServices({ data: id })
    return { clients, services }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateTreatment />
}

const treatmentsFormOptions = formOptions({
  defaultValues: {
    date: new Date().toISOString().split('T')[0],
    time: '',
    customer_id: '',
    notes: '',
    customer_name: '',
    serviceId: '',
    beforeImage: '',
    afterImage: '',
  },
})

function CreateTreatment() {
  const { clients, services } = Route.useLoaderData()

  const form = useAppForm({
    ...treatmentsFormOptions,
    onSubmit: async ({ value }) => {
      await createTreatment({ data: value })
    },
  })

  return (
    <form.AppForm>
      <section className="flex flex-col gap-4">
        <form.AppField
          name="customer_id"
          children={(field) => (
            <field.SelectField
              label="Client"
              options={clients.map((client) => ({
                label: client.name,
                value: client.id.toString(),
              }))}
              placeholder="Select a client"
            />
          )}
        />

        <form.AppField
          name="date"
          children={(field) => <field.CalendarField label="Date" />}
        />

        <form.AppField
          name="serviceId"
          children={(field) => (
            <field.BadgeField
              label="Service"
              options={
                services?.map((service) => ({
                  label: service,
                  value: service,
                })) || []
              }
            />
          )}
        />

        <form.AppField
          name="notes"
          children={(field) => <field.TextareaField label="Notes" />}
        />

        <form.AppField
          name="beforeImage"
          children={(field) => <field.FileInputField label="Before Image" />}
        />

        <form.AppField
          name="afterImage"
          children={(field) => <field.FileInputField label="After Image" />}
        />

        <form.SubscribeButton label="Create Treatment" />
      </section>
    </form.AppForm>
  )
}
