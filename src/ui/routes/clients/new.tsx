import { createCustomer } from '@/manager/controller/customer.controller'
import { Button } from '@/ui/shared/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/ui/shared/components/drawer'
import { useAppForm } from '@/ui/shared/components/form'
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from '@tanstack/react-router'

export const Route = createFileRoute('/clients/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateClient />
}

function CreateClient() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const form = useAppForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      grade: '신규',
      memo: '',
      lastVisit: '',
    },
    onSubmit: async ({ value }) => {
      await createCustomer({ data: value })
    },
  })

  return (
    <form.AppForm>
      <Drawer open={true}>
        <DrawerContent className="bg-white">
          <DrawerHeader>
            <DrawerTitle>Add New Client</DrawerTitle>
            <DrawerDescription>
              Enter the client's information below to add them to your client
              list.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4">
            <form.AppField
              name="name"
              children={(field) => <field.TextField label="Name" />}
            />
            <form.AppField
              name="phone"
              children={(field) => <field.TextField label="Phone" />}
            />
            <form.AppField
              name="email"
              children={(field) => <field.TextField label="Email" />}
            />
            <form.AppField
              name="grade"
              children={(field) => <field.TextField label="Grade" />}
            />
            <form.AppField
              name="memo"
              children={(field) => <field.TextField label="Memo" />}
            />
          </div>
          <DrawerFooter>
            <form.SubscribeButton label="Submit" />
            <Button
              variant="ghost"
              onClick={() =>
                canGoBack ? router.history.back() : router.navigate({ to: '/' })
              }
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form.AppForm>
  )
}
