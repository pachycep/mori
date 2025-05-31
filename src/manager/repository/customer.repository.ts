import type { Customer, NewCustomer } from '@/types/supabase'

export const customerRepository = {
  async getAll(): Promise<Customer[]> {
    // TODO: 실제 DB 연동 구현
    return []
  },

  async create(data: NewCustomer): Promise<Customer> {
    // TODO: 실제 DB 연동 구현
    throw new Error('Not implemented')
  },

  async getById(id: number): Promise<Customer> {
    // TODO: 실제 DB 연동 구현
    throw new Error('Not implemented')
  },
}
