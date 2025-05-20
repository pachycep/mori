import { customerRepository } from '../repository/customer.repository'
import type { NewCustomer } from '@/types/supabase'

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
