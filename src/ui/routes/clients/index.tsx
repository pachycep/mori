// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
interface Customer {
  id: number
  name: string
  phone: string
  email: string
  avatar: string
  lastVisit: string
  tags: string[]
  notes: string
  favoriteServices: string[]
}
interface Treatment {
  id: number
  date: string
  services: string[]
  notes: string
  stylist: string
  price: string
  images: string[]
}
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  )
  const [activeTab, setActiveTab] = useState<string>('all')
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const customers: Customer[] = [
    {
      id: 1,
      name: 'Olivia Parker',
      phone: '(555) 123-4567',
      email: 'olivia.parker@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=101&orientation=squarish',
      lastVisit: 'May 10, 2025',
      tags: ['Color Client', 'Monthly', 'Premium'],
      notes:
        'Prefers ammonia-free color. Sensitive scalp. Always books on Saturdays. Likes to chat about travel and food. Has two children. Allergic to certain fragrances.',
      favoriteServices: ['Balayage', 'Deep Conditioning', 'Blowout'],
    },
    {
      id: 2,
      name: 'Ethan Reynolds',
      phone: '(555) 234-5678',
      email: 'ethan.r@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20man%20with%20short%20dark%20hair%20and%20beard%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=102&orientation=squarish',
      lastVisit: 'May 2, 2025',
      tags: ['New Client', 'Referral'],
      notes:
        'Referred by Sophia Martinez. Prefers quick appointments. Works in finance, often on calls during appointment.',
      favoriteServices: ["Men's Cut", 'Beard Trim'],
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      phone: '(555) 345-6789',
      email: 'sophia.m@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20latina%20woman%20with%20curly%20dark%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=103&orientation=squarish',
      lastVisit: 'April 28, 2025',
      tags: ['Curly Specialist', 'Product Buyer'],
      notes:
        'Curly hair specialist. Buys a lot of products. Prefers afternoon appointments. Has referred 3 clients.',
      favoriteServices: ['Curly Cut', 'Highlights', 'Deep Treatment'],
    },
    {
      id: 4,
      name: 'Jackson Kim',
      phone: '(555) 456-7890',
      email: 'jackson.k@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20an%20asian%20man%20with%20stylish%20haircut%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=104&orientation=squarish',
      lastVisit: 'April 15, 2025',
      tags: ['Bi-weekly', 'Early Bird'],
      notes:
        'Always books 8 AM appointments. Works as a creative director. Particular about styling products.',
      favoriteServices: ["Men's Cut", 'Color', 'Styling'],
    },
    {
      id: 5,
      name: 'Emma Wilson',
      phone: '(555) 567-8901',
      email: 'emma.w@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20blonde%20woman%20with%20shoulder%20length%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=105&orientation=squarish',
      lastVisit: 'April 8, 2025',
      tags: ['Blonde Specialist', 'VIP'],
      notes:
        'Maintains platinum blonde. Books 3 hours for full service. Prefers champagne during appointments. Works as a real estate agent.',
      favoriteServices: ['Full Highlights', 'Toner', 'Olaplex Treatment'],
    },
    {
      id: 6,
      name: 'Aiden Thompson',
      phone: '(555) 678-9012',
      email: 'aiden.t@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20man%20with%20fade%20haircut%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=106&orientation=squarish',
      lastVisit: 'March 30, 2025',
      tags: ['Student Discount', 'Monthly'],
      notes:
        'College student. Gets fade haircut. Price sensitive. Referred by Jackson Kim.',
      favoriteServices: ['Fade Cut', 'Line Up'],
    },
    {
      id: 7,
      name: 'Isabella Rodriguez',
      phone: '(555) 789-0123',
      email: 'isabella.r@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20latina%20woman%20with%20long%20black%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=107&orientation=squarish',
      lastVisit: 'March 22, 2025',
      tags: ['Extension Specialist', 'Bi-monthly'],
      notes:
        'Has tape-in extensions. Books every 6-8 weeks for maintenance. Prefers late appointments after work.',
      favoriteServices: ['Extension Maintenance', 'Haircut', 'Blowout'],
    },
    {
      id: 8,
      name: 'Noah Chen',
      phone: '(555) 890-1234',
      email: 'noah.c@example.com',
      avatar:
        'https://readdy.ai/api/search-image?query=portrait%20of%20an%20asian%20man%20with%20glasses%20and%20modern%20haircut%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=108&orientation=squarish',
      lastVisit: 'March 15, 2025',
      tags: ['Tech Industry', 'Quarterly'],
      notes:
        'Works in tech. Prefers minimal styling. Books quarterly for maintenance cuts. Quiet during appointments, prefers to work on laptop.',
      favoriteServices: ["Men's Cut", 'Scalp Treatment'],
    },
  ]
  const treatments: Record<number, Treatment[]> = {
    1: [
      {
        id: 101,
        date: 'May 10, 2025',
        services: ['Balayage', 'Haircut', 'Blowout'],
        notes:
          'Lightened balayage by 2 levels. Trimmed 1 inch. Used Olaplex No.3 treatment.',
        stylist: 'Sarah',
        price: '$285',
        images: [
          'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20balayage%20hair%20result%20on%20brunette%20woman%2C%20back%20view%2C%20soft%20waves%2C%20high%20quality%2C%20beauty%20salon%20photography%2C%20neutral%20studio%20background%2C%20soft%20lighting%2C%20hair%20styling%20result&width=150&height=200&seq=201&orientation=portrait',
        ],
      },
      {
        id: 102,
        date: 'April 12, 2025',
        services: ['Root Touch-up', 'Deep Conditioning'],
        notes: 'Used 6N color on roots. Applied Kerastase mask for 20 minutes.',
        stylist: 'Sarah',
        price: '$150',
        images: [],
      },
      {
        id: 103,
        date: 'March 15, 2025',
        services: ['Haircut', 'Blowout'],
        notes: 'Cut layers and face-framing pieces. Styled with round brush.',
        stylist: 'Sarah',
        price: '$95',
        images: [
          'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20layered%20haircut%20on%20brunette%20woman%2C%20side%20view%2C%20soft%20waves%2C%20high%20quality%2C%20beauty%20salon%20photography%2C%20neutral%20studio%20background%2C%20soft%20lighting%2C%20hair%20styling%20result&width=150&height=200&seq=202&orientation=portrait',
        ],
      },
    ],
    2: [
      {
        id: 201,
        date: 'May 2, 2025',
        services: ["Men's Cut", 'Beard Trim'],
        notes:
          'First visit. Fade on sides, textured on top. Beard shaped and trimmed.',
        stylist: 'Sarah',
        price: '$65',
        images: [
          'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20mens%20haircut%20fade%20style%2C%20side%20view%2C%20high%20quality%2C%20beauty%20salon%20photography%2C%20neutral%20studio%20background%2C%20soft%20lighting%2C%20hair%20styling%20result&width=150&height=200&seq=203&orientation=portrait',
        ],
      },
    ],
    3: [
      {
        id: 301,
        date: 'April 28, 2025',
        services: ['Curly Cut', 'Deep Treatment'],
        notes: 'Dry cut technique for curls. Used DevaCurl products.',
        stylist: 'Sarah',
        price: '$120',
        images: [
          'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20curly%20haircut%20on%20latina%20woman%2C%20front%20view%2C%20defined%20curls%2C%20high%20quality%2C%20beauty%20salon%20photography%2C%20neutral%20studio%20background%2C%20soft%20lighting%2C%20hair%20styling%20result&width=150&height=200&seq=204&orientation=portrait',
        ],
      },
      {
        id: 302,
        date: 'March 30, 2025',
        services: ['Highlights', 'Curly Cut'],
        notes: 'Added caramel highlights. Refreshed curl shape.',
        stylist: 'Sarah',
        price: '$195',
        images: [],
      },
    ],
  }
  useEffect(() => {
    if (searchQuery.trim() === '') {
      if (activeTab === 'all') {
        setFilteredCustomers(customers)
      } else if (activeTab === 'recent') {
        // Filter customers who visited in the last 30 days
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        setFilteredCustomers(
          customers.filter((customer) => {
            const visitDate = new Date(customer.lastVisit)
            return visitDate >= thirtyDaysAgo
          }),
        )
      } else if (activeTab === 'vip') {
        setFilteredCustomers(
          customers.filter((customer) =>
            customer.tags.some((tag) => tag === 'VIP' || tag === 'Premium'),
          ),
        )
      }
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredCustomers(
        customers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(query) ||
            customer.phone.includes(query) ||
            customer.email.toLowerCase().includes(query),
        ),
      )
    }
  }, [searchQuery, activeTab])
  const getTagColor = (tag: string): string => {
    const tagColors: Record<string, string> = {
      VIP: 'bg-purple-100 text-purple-800 border-purple-200',
      Premium: 'bg-amber-100 text-amber-800 border-amber-200',
      'New Client': 'bg-green-100 text-green-800 border-green-200',
      Referral: 'bg-blue-100 text-blue-800 border-blue-200',
      Monthly: 'bg-pink-100 text-pink-800 border-pink-200',
      'Bi-weekly': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Bi-monthly': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      Quarterly: 'bg-orange-100 text-orange-800 border-orange-200',
      'Student Discount': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Early Bird': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Color Client': 'bg-rose-100 text-rose-800 border-rose-200',
      'Curly Specialist': 'bg-violet-100 text-violet-800 border-violet-200',
      'Blonde Specialist': 'bg-amber-100 text-amber-800 border-amber-200',
      'Extension Specialist':
        'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      'Product Buyer': 'bg-teal-100 text-teal-800 border-teal-200',
      'Tech Industry': 'bg-sky-100 text-sky-800 border-sky-200',
    }
    return tagColors[tag] || 'bg-gray-100 text-gray-800 border-gray-200'
  }
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white text-neutral-900 shadow-sm z-50">
        <div className="px-4 py-4 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-medium text-neutral-800">Clients</h1>
            <div className="flex items-center gap-3">
              <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer">
                <i className="fa-solid fa-bell"></i>
              </button>
              <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fa-solid fa-search text-neutral-400"></i>
            </div>
            <Input
              type="search"
              placeholder="Search by name, phone or email..."
              className="pl-10 pr-4 py-2 bg-white border-neutral-200 focus:border-amber-500 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setSearchQuery('')}
              >
                <i className="fa-solid fa-times text-neutral-400 hover:text-neutral-600"></i>
              </button>
            )}
          </div>
          {/* Tabs */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
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
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 pt-40 pb-20 overflow-y-auto">
        <div className="container max-w-md mx-auto px-4">
          {selectedCustomer ? (
            // Customer Detail View
            <div className="space-y-6">
              {/* Back Button and Actions */}
              <div className="flex items-center justify-between">
                <button
                  className="flex items-center text-amber-600 font-medium cursor-pointer hover:text-amber-700 transition-colors"
                  onClick={() => setSelectedCustomer(null)}
                >
                  <i className="fa-solid fa-chevron-left mr-2"></i>
                  Back to Clients
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="!rounded-button h-10 w-10 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    <i className="fa-solid fa-share-nodes"></i>
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button h-10 w-10 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </Button>
                </div>
              </div>
              {/* Customer Profile Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-amber-100 via-amber-50 to-white">
                  <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 ring-4 ring-white rounded-full shadow-sm">
                    <Avatar className="h-28 w-28">
                      <AvatarImage
                        src={selectedCustomer.avatar}
                        alt={selectedCustomer.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xl bg-amber-100 text-amber-600">
                        {selectedCustomer.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="pt-16 px-4 pb-5 text-center">
                  <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
                    {selectedCustomer.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedCustomer.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`${getTagColor(tag)} text-xs px-2 py-0.5`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-sm font-medium text-neutral-500 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${selectedCustomer.phone}`}
                    className="flex items-center justify-between p-3 hover:bg-amber-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                        <i className="fa-solid fa-phone text-amber-600"></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-neutral-500">Phone</span>
                        <span className="text-neutral-800 font-medium">
                          {selectedCustomer.phone}
                        </span>
                      </div>
                    </div>
                    <i className="fa-solid fa-phone-volume text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </a>
                  <a
                    href={`mailto:${selectedCustomer.email}`}
                    className="flex items-center justify-between p-3 hover:bg-amber-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                        <i className="fa-solid fa-envelope text-amber-600"></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-neutral-500">Email</span>
                        <span className="text-neutral-800 font-medium">
                          {selectedCustomer.email}
                        </span>
                      </div>
                    </div>
                    <i className="fa-solid fa-paper-plane text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </a>
                  <div className="flex items-center p-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <i className="fa-solid fa-clock-rotate-left text-amber-600"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-500">
                        Last Visit
                      </span>
                      <span className="text-neutral-800 font-medium">
                        {selectedCustomer.lastVisit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                    <i className="fa-solid fa-calendar-plus text-amber-600"></i>
                  </div>
                  <span className="text-xs">Book</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                    <i className="fa-solid fa-message text-amber-600"></i>
                  </div>
                  <span className="text-xs">Message</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                    <i className="fa-solid fa-pen-to-square text-amber-600"></i>
                  </div>
                  <span className="text-xs">Edit</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 bg-white !rounded-button"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                    <i className="fa-solid fa-chart-line text-amber-600"></i>
                  </div>
                  <span className="text-xs">History</span>
                </Button>
              </div>
              {/* Client Preferences */}
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
                      {selectedCustomer.favoriteServices.map(
                        (service, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1"
                          >
                            {service}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">
                      Notes
                    </h4>
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <p className="text-neutral-600 text-sm whitespace-pre-line">
                        {selectedCustomer.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Visit History */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-neutral-500">
                    Visit History
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-amber-600 text-sm h-8 px-2"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {treatments[selectedCustomer.id]?.map((treatment) => (
                    <Card
                      key={treatment.id}
                      className="p-3 border border-neutral-100 hover:border-amber-200 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                          <i className="fa-solid fa-scissors text-amber-600"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div className="font-medium text-neutral-800">
                              {treatment.date}
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              {treatment.price}
                            </Badge>
                          </div>
                          <div className="text-sm text-neutral-500 mb-2">
                            Stylist: {treatment.stylist}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {treatment.services.map((service, index) => (
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
            </div>
          ) : (
            // Customer List View
            <div className="space-y-4">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <Card
                    key={customer.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-14 w-14 mr-3">
                        <AvatarImage
                          src={customer.avatar}
                          alt={customer.name}
                        />
                        <AvatarFallback>
                          {customer.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-neutral-800 truncate">
                            {customer.name}
                          </h3>
                          <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                            {customer.lastVisit}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-600 mt-0.5">
                          {customer.phone}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {customer.tags.slice(0, 2).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={`${getTagColor(tag)} text-xs px-1.5 py-0.5`}
                            >
                              {tag}
                            </Badge>
                          ))}
                          {customer.tags.length > 2 && (
                            <Badge
                              variant="outline"
                              className="bg-neutral-100 text-neutral-600 border-neutral-200 text-xs px-1.5 py-0.5"
                            >
                              +{customer.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <button className="p-2 text-neutral-400 hover:text-neutral-600">
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-solid fa-user-slash text-neutral-400 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-800 mb-2">
                    No clients found
                  </h3>
                  <p className="text-neutral-500 text-sm max-w-xs">
                    {searchQuery
                      ? 'Try adjusting your search terms or filters'
                      : 'Add your first client to get started'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Add Client Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the client's information below to add them to your client
              list.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input id="name" placeholder="Enter client name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input id="phone" placeholder="(555) 123-4567" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email (Optional)
              </label>
              <Input id="email" type="email" placeholder="client@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (Optional)
              </label>
              <Input id="tags" placeholder="Add tags separated by commas" />
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Input id="notes" placeholder="Add any notes about this client" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(false)}
              className="!rounded-button"
            >
              Cancel
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 !rounded-button">
              Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default App
