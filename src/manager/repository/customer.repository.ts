import type { Customer, NewCustomer } from '@/types/supabase'
import { getSupabaseServerClient } from '@/manager/client/supabase'

export const customerRepository = {
  async getAll(): Promise<Customer[]> {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from('customers').select('*')
    if (error) throw new Error(error.message)
    return data as Customer[]
  },

  async create(data: NewCustomer): Promise<Customer> {
    const supabase = await getSupabaseServerClient()
    const { data: inserted, error } = await supabase
      .from('customers')
      .insert(data)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return inserted as Customer
  },

  async getById(id: number): Promise<Customer> {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw new Error(error.message)
    return data as Customer
  },
}
