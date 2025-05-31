import { getCustomerList } from '@/manager/controller/customer.controller'
import type { Customer } from '@/types/supabase'
import { Badge } from '@/ui/shared/components/badge'
import { Card } from '@/ui/shared/components/card'
import { ClientTag } from '@/ui/shared/components/client-tag'
import { SearchFilter } from '@/ui/shared/components/search-filter'
import { Tabs, TabsList, TabsTrigger } from '@/ui/shared/components/tabs'
import { UserInfo } from '@/ui/shared/components/user-info'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_authed/clients/')({
  loader: async () => ({
    customers: await getCustomerList(),
  }),
  component: ClientsPage,
})

function ClientsPage() {
  const { customers } = Route.useLoaderData()
  const hasClients = customers.length > 0

  // TODO: Search filter, active tab filter
  const [search, onChangeSearch] = useState('')
  const [activeTab, setActiveTab] = useState<string>('all')

  return (
    <section className="flex-1 pt-40 pb-20 overflow-y-auto">
      <SearchFilter value={search} onChange={onChangeSearch} />
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-neutral-100 p-1 rounded-lg">
          <TabsTrigger
            value="all"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm"
          >
            Recent
          </TabsTrigger>
          <TabsTrigger
            value="vip"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm"
          >
            VIP
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {hasClients ? (
        <CustomerList customers={customers} />
      ) : (
        <NoClients search={search} />
      )}
    </section>
  )
}

function CustomerList({ customers }: { customers: Customer[] }) {
  const navigate = Route.useNavigate()
  const navigateToDetail = (customerId: number) => {
    navigate({ to: '/clients/$id', params: { id: customerId.toString() } })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {customers.map(({ id, name, phone, imageUrl, lastVisit, tags = [] }) => (
        <Card
          key={id}
          className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
          onClick={() => navigateToDetail(id)}
        >
          <div className="flex justify-between items-start flex-col gap-2">
            <div className="w-full flex justify-between items-start">
              <UserInfo name={name} imageUrl={imageUrl} phone={phone} />
              <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                {lastVisit}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {tags?.slice(0, 2).map((tag, index) => (
                <ClientTag key={index} tag={tag} />
              ))}

              {tags?.length > 2 && (
                <Badge
                  variant="outline"
                  className="bg-neutral-100 text-neutral-600 border-neutral-200 text-xs px-1.5 py-0.5"
                >
                  +{tags?.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function NoClients({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
        <i className="fa-solid fa-user-slash text-neutral-400 text-xl" />
      </div>
      <h3 className="text-lg font-medium text-neutral-800 mb-2">
        No clients found
      </h3>
      <p className="text-neutral-500 text-sm max-w-xs">
        {search
          ? 'Try adjusting your search terms or filters'
          : 'Add your first client to get started'}
      </p>
    </div>
  )
}
