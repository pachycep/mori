import type { Reservation, NewReservation } from '@/types/supabase'

export const reservationRepository = {
  async create(data: NewReservation): Promise<Reservation> {
    // TODO: 실제 DB 연동 구현
    throw new Error('Not implemented')
  },

  async getAll(): Promise<Reservation[]> {
    // TODO: 실제 DB 연동 구현
    return []
  },
}
