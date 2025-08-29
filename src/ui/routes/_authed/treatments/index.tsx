import { getTreatmentList } from '@/manager/controller/treatment.controller'
import type { Treatment } from '@/types/supabase'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/ui/shared/components/avatar'
import { Badge } from '@/ui/shared/components/badge'
import { Button } from '@/ui/shared/components/button'
import { Card } from '@/ui/shared/components/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/shared/components/dialog'
import { ScrollArea } from '@/ui/shared/components/scroll-area'
import { SearchFilter } from '@/ui/shared/components/search-filter'
import { TabsContent, TabsList, TabsTrigger } from '@/ui/shared/components/tabs'
import { Tabs } from '@/ui/shared/components/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { useState } from 'react'

export const Route = createFileRoute('/_authed/treatments/')({
  loader: async () => {
    try {
      const treatments = await getTreatmentList()
      return { treatments }
    } catch (error) {
      console.error('Failed to load treatments:', error)
      return { treatments: [] }
    }
  },
  component: TreatmentPage,
})

function TreatmentPage() {
  const navigate = Route.useNavigate()
  const { treatments } = Route.useLoaderData()

  // TODO: Search filter
  const [search, onChangeSearch] = useState('')

  const onAddRecord = () => {
    navigate({ to: '/treatments/new' })
  }

  return (
    <section className="flex-1 pt-36 pb-20 overflow-y-auto">
      <SearchFilter value={search} onChange={onChangeSearch} />

      <div className="container max-w-md mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-medium text-neutral-800">
              All Treatments
            </h2>
            <p className="text-neutral-500 text-sm">
              {treatments.length}{' '}
              {treatments.length === 1 ? 'record' : 'records'} found
            </p>
          </div>
          <Button variant="default" onClick={onAddRecord}>
            <i className="fa-solid fa-plus mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      <TreatmentList treatments={treatments} />
    </section>
  )
}

function TreatmentList({ treatments }: { treatments: Treatment[] }) {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null,
  )
  const [open, setOpen] = useState(false)

  const onSelectTreatment = (treatment: Treatment) => {
    setSelectedTreatment(treatment)
    setOpen(true)
  }

  return (
    <>
      <div className="space-y-4 mb-6">
        {treatments.length === 0 ? (
          <EmptyTreatmentCard />
        ) : (
          treatments.map((treatment) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              onClick={onSelectTreatment}
            />
          ))
        )}
      </div>

      <TreatmentDetailDialog
        open={open}
        onOpenChange={setOpen}
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
      />
    </>
  )
}

function EmptyTreatmentCard() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
        <i className="fa-solid fa-search text-2xl text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-700 mb-1">
        No records found
      </h3>
      <p className="text-neutral-500">Try adjusting your search or filters</p>
    </div>
  )
}

function TreatmentCard({
  treatment,
  onClick,
}: {
  treatment: Treatment
  onClick: (treatment: Treatment) => void
}) {
  // 실제 데이터베이스 스키마에 맞게 수정
  const {
    customer_id,
    created_at,
    services,
    style_tags,
    after_image_url,
    name,
    memo,
  } = treatment

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return format(date, 'MMM d, yyyy')
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(treatment)}
    >
      <div className="flex">
        <div className="w-24 h-24 bg-neutral-100 overflow-hidden">
          {after_image_url ? (
            <img
              src={after_image_url}
              alt={`Treatment ${name}`}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <i className="fa-solid fa-image text-2xl" />
            </div>
          )}
        </div>
        <div className="flex-1 p-3">
          <div className="flex justify-between items-start mb-1">
            <div className="font-medium">{name}</div>
            <div className="text-xs text-neutral-500">
              {formatDate(created_at)}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {services && services.length > 0 ? (
              services.map((service, idx) => (
                <span key={idx} className="text-xs text-neutral-600">
                  {idx > 0 && <span className="mx-1">•</span>}
                  {service}
                </span>
              ))
            ) : (
              <span className="text-xs text-neutral-400">No services</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {style_tags && style_tags.length > 0 ? (
              <>
                {style_tags.slice(0, 3).map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs px-2 py-0 bg-amber-50 text-amber-700 border-amber-200"
                  >
                    {tag}
                  </Badge>
                ))}
                {style_tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs px-2 py-0 bg-neutral-100 text-neutral-600 border-neutral-200"
                  >
                    +{style_tags.length - 3}
                  </Badge>
                )}
              </>
            ) : (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0 bg-neutral-100 text-neutral-400 border-neutral-200"
              >
                No tags
              </Badge>
            )}
          </div>
          {customer_id && (
            <div className="text-xs text-neutral-500 mt-1">
              Customer ID: {customer_id}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function TreatmentDetailDialog({
  open,
  onOpenChange,
  treatment,
  onClose,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  treatment: Treatment | null
  onClose: () => void
}) {
  if (!treatment) return null

  // 실제 데이터베이스 스키마에 맞게 수정
  const {
    customer_id,
    created_at,
    services,
    style_tags,
    after_image_url,
    memo,
    before_image_url,
    name,
  } = treatment

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return format(date, 'MMM d, yyyy')
  }

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'haircut':
        return 'fa-solid fa-scissors'
      case 'color':
        return 'fa-solid fa-palette'
      case 'treatment':
        return 'fa-solid fa-pump-soap'
      case 'blowout':
        return 'fa-solid fa-fan'
      case 'updo':
        return 'fa-solid fa-up-long'
      default:
        return 'fa-solid fa-spa'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Treatment Details</DialogTitle>
          <DialogDescription className="text-neutral-500">
            {formatDate(created_at)} • {name}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="pr-4 max-h-[calc(90vh-180px)]">
          <Tabs defaultValue="after" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              {before_image_url && (
                <>
                  <TabsTrigger value="before" className="!rounded-button">
                    Before
                  </TabsTrigger>
                  <TabsTrigger value="after" className="!rounded-button">
                    After
                  </TabsTrigger>
                </>
              )}
              {!before_image_url && (
                <TabsTrigger
                  value="after"
                  className="col-span-2 !rounded-button"
                >
                  Result
                </TabsTrigger>
              )}
            </TabsList>
            {before_image_url && (
              <TabsContent value="before" className="mt-0">
                <div className="rounded-lg overflow-hidden bg-neutral-100 mb-4">
                  <img
                    src={before_image_url}
                    alt="Before treatment"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </TabsContent>
            )}
            <TabsContent value="after" className="mt-0">
              <div className="rounded-lg overflow-hidden bg-neutral-100 mb-4">
                {after_image_url ? (
                  <img
                    src={after_image_url}
                    alt="After treatment"
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-neutral-400">
                    <i className="fa-solid fa-image text-4xl" />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">
                Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {services && services.length > 0 ? (
                  services.map((service) => (
                    <Badge
                      key={service}
                      className="bg-neutral-100 text-neutral-700 px-3 py-1"
                    >
                      <i className={`${getServiceIcon(service)} mr-2`} />
                      {service}
                    </Badge>
                  ))
                ) : (
                  <span className="text-neutral-400">No services</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">
                Style Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {style_tags && style_tags.length > 0 ? (
                  style_tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-neutral-400">No tags</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">
                Memo
              </h3>
              <div className="bg-neutral-50 p-3 rounded-lg text-neutral-700 text-sm">
                {memo || 'No memo'}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">
                Customer
              </h3>
              <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-medium">Customer ID: {customer_id || 'Unknown'}</div>
                  <div className="text-sm text-neutral-500">
                    Treatment: {name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="flex gap-3 sm:gap-0">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none !rounded-button"
            onClick={onClose}
          >
            Close
          </Button>
          <Button className="flex-1 sm:flex-none !rounded-button">
            <i className="fa-solid fa-pen-to-square mr-2" />
            Edit Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
