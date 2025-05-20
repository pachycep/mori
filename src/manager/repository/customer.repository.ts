import type { Customer, NewCustomer } from '@/types/supabase'

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: '김미용',
    phone: '010-1111-2222',
    grade: 'VIP',
    memo: '탈색 이력 있음',
    totalSpent: 1200000,
    lastVisit: '2024-05-01',
    email: 'kimmiyong@gmail.com',
    imageUrl:
      'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=101&orientation=squarish',
    tags: ['Color Client', 'Monthly', 'Premium'],
    favoriteServices: ['Balayage', 'Deep Conditioning', 'Blowout'],
  },
  {
    id: 2,
    name: '박시술',
    phone: '010-3333-4444',
    grade: '일반',
    memo: '',
    totalSpent: 450000,
    lastVisit: '2024-04-25',
    email: 'parkshisul@gmail.com',
    imageUrl:
      'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=101&orientation=squarish',
    tags: ['Color Client', 'Monthly', 'Premium'],
    favoriteServices: ['Balayage', 'Deep Conditioning', 'Blowout'],
  },
]

export const customerRepository = {
  async getAll(): Promise<Customer[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockCustomers), 300),
    )
  },

  async create(data: NewCustomer): Promise<Customer> {
    const newCustomer: Customer = {
      ...data,
      id: Date.now(),
      totalSpent: data.totalSpent ?? 0,
    }
    mockCustomers.push(newCustomer)
    return new Promise((resolve) => setTimeout(() => resolve(newCustomer), 300))
  },

  async getById(id: number): Promise<Customer> {
    const customer = mockCustomers.find((customer) => customer.id === id)
    if (!customer) {
      throw new Error('Customer not found')
    }
    return new Promise((resolve) => setTimeout(() => resolve(customer), 300))
  },
}
