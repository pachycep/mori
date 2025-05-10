import type { Customer, NewCustomer } from '@/types/supabase'

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '김미용',
    phone: '010-1111-2222',
    grade: 'VIP',
    memo: '탈색 이력 있음',
    total_spent: 1200000,
    last_visit: '2024-05-01',
  },
  {
    id: '2',
    name: '박시술',
    phone: '010-3333-4444',
    grade: '일반',
    memo: '',
    total_spent: 450000,
    last_visit: '2024-04-25',
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
      id: String(Date.now()),
      total_spent: data.total_spent ?? 0,
    }
    mockCustomers.push(newCustomer)
    return new Promise((resolve) => setTimeout(() => resolve(newCustomer), 300))
  },
}
