import type { NewCustomer } from '@/types/supabase'
import { customerRepository } from '../repository/customer.repository'

export const customerService = {
  async getCustomerList() {
    return customerRepository.getAll()
  },

  async registerCustomer(data: NewCustomer) {
    return customerRepository.create(data)
  },

  async getCustomerById(id: number) {
    return customerRepository.getById(id)
  },
}
