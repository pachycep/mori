import { getCustomerById } from '@/manager/controller/customer.controller'
import { getTreatmentsByCustomerId } from '@/manager/controller/treatment.controller'
import type { Customer, Treatment } from '@/types/supabase'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/ui/shared/components/avatar'
import { Badge } from '@/ui/shared/components/badge'
import { Button } from '@/ui/shared/components/button'
import { Card } from '@/ui/shared/components/card'
import { ClientTag } from '@/ui/shared/components/client-tag'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/clients/$id')({
  component: CustomerDetailPage,
  loader: async ({ params }) => {
    const customerId = Number(params.id)
    const customer = await getCustomerById({ data: customerId })
    const treatments = await getTreatmentsByCustomerId({ data: customerId })
    return { customer, treatments }
  },
})

function CustomerDetailPage() {
  const { customer, treatments } = Route.useLoaderData()
  return (
    <div className="space-y-6">
      <CustomerProfileCard customer={customer} />
      <ContactInformation customer={customer} />
      <QuickActions />
      <ClientPreferences customer={customer} />
      <VisitHistory treatments={treatments} />
    </div>
  )
}

function CustomerProfileCard({ customer }: { customer: Customer }) {
  const { imageUrl, name, tags } = customer

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="!rounded-button h-10 w-10 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
        >
          <i className="fa-solid fa-share-nodes" />
        </Button>
        <Button
          variant="outline"
          className="!rounded-button h-10 w-10 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
        >
          <i className="fa-solid fa-ellipsis" />
        </Button>
      </div>
      <div className="relative h-40 bg-gradient-to-br from-amber-100 via-amber-50 to-white">
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 ring-4 ring-white rounded-full shadow-sm">
          <Avatar className="h-28 w-28">
            <AvatarImage src={imageUrl} alt={name} className="object-cover" />
            <AvatarFallback className="text-xl bg-amber-100 text-amber-600">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="pt-16 px-4 pb-5 text-center">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-2">{name}</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {tags?.map((tag, index) => (
            <ClientTag key={index} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactInformation({ customer }: { customer: Customer }) {
  const { phone, email, lastVisit } = customer
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-medium text-neutral-500 mb-4">
        Contact Information
      </h3>
      <div className="space-y-4">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-between p-3 hover:bg-amber-50 rounded-xl transition-colors group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
              <i className="fa-solid fa-phone text-amber-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral-500">Phone</span>
              <span className="text-neutral-800 font-medium">{phone}</span>
            </div>
          </div>
          <i className="fa-solid fa-phone-volume text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center justify-between p-3 hover:bg-amber-50 rounded-xl transition-colors group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
              <i className="fa-solid fa-envelope text-amber-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral-500">Email</span>
              <span className="text-neutral-800 font-medium">{email}</span>
            </div>
          </div>
          <i className="fa-solid fa-paper-plane text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <div className="flex items-center p-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
            <i className="fa-solid fa-clock-rotate-left text-amber-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-neutral-500">Last Visit</span>
            <span className="text-neutral-800 font-medium">{lastVisit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
      >
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
          <i className="fa-solid fa-calendar-plus text-amber-600" />
        </div>
        <span className="text-xs">Book</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
      >
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
          <i className="fa-solid fa-message text-amber-600" />
        </div>
        <span className="text-xs">Message</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
      >
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
          <i className="fa-solid fa-pen-to-square text-amber-600" />
        </div>
        <span className="text-xs">Edit</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
      >
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
          <i className="fa-solid fa-chart-line text-amber-600" />
        </div>
        <span className="text-xs">History</span>
      </Button>
    </div>
  )
}

function ClientPreferences({ customer }: { customer: Customer }) {
  const { favoriteServices, memo } = customer
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-medium text-neutral-500 mb-3">
        Client Preferences
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">
            Favorite Services
          </h4>
          <div className="flex flex-wrap gap-2">
            {favoriteServices?.map((service, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Memo</h4>
          <div className="bg-neutral-50 rounded-lg p-3">
            <p className="text-neutral-600 text-sm whitespace-pre-line">
              {memo}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisitHistory({ treatments }: { treatments: Treatment[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-neutral-500">Visit History</h3>
        <Button variant="ghost" className="text-amber-600 text-sm h-8 px-2">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {treatments?.map(({ id, createdAt, price, services }) => (
          <Card
            key={id}
            className="p-3 border border-neutral-100 hover:border-amber-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-scissors text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="font-medium text-neutral-800">
                    {createdAt}
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    {price}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {services.map((service, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-neutral-100 text-neutral-600 text-xs"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
