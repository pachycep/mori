import type { Treatment, NewTreatment } from '@/types/supabase'
import { getSupabaseServerClient } from '@/manager/client/supabase'

export const treatmentRepository = {
  async getAll(): Promise<Treatment[]> {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from('treatments').select('*')
    if (error) throw new Error(error.message)
    return data as Treatment[]
  },

  async create(treatment: NewTreatment): Promise<Treatment> {
    const supabase = getSupabaseServerClient()
    const { data: inserted, error } = await supabase
      .from('treatments')
      .insert(treatment)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return inserted as Treatment
  },

  async getByReservation(reservationId: string): Promise<Treatment | null> {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('reservation_id', reservationId)
      .single()
    if (error) throw new Error(error.message)
    return data as Treatment
  },

  async getById(id: string): Promise<Treatment | null> {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw new Error(error.message)
    return data as Treatment
  },

  async getByCustomerId(customerId: number): Promise<Treatment[]> {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('customer_id', customerId)
    if (error) throw new Error(error.message)
    return data as Treatment[]
  },
}
