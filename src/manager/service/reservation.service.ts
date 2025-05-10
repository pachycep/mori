import { reservationRepository } from '../repository/reservation.repository'
import type { NewReservation } from '@/types/supabase'

export const reservationService = {
  async createReservation(data: NewReservation) {
    return reservationRepository.create(data)
  },

  async getReservationList() {
    return reservationRepository.getAll()
  },
}
