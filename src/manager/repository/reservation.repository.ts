import type { Reservation, NewReservation } from '@/types/supabase'
import { getSupabaseServerClient } from '@/manager/client/supabase'

export const reservationRepository = {
  async create(data: NewReservation): Promise<Reservation> {
    const supabase = await getSupabaseServerClient()
    const { data: inserted, error } = await supabase
      .from('reservations')
      .insert(data)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return inserted as Reservation
  },

  async getAll(): Promise<Reservation[]> {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from('reservations').select('*')
    if (error) throw new Error(error.message)
    return data as Reservation[]
  },
}
