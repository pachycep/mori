import type { NewReservation } from '@/types/supabase'
import { reservationRepository } from '../repository/reservation.repository'

export const reservationService = {
  async createReservation(data: NewReservation) {
    return reservationRepository.create(data)
  },

  async getReservationList() {
    return reservationRepository.getAll()
  },
}
