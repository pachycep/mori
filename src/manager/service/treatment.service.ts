import { treatmentRepository } from '../repository/treatment.repository'
import type { NewTreatment } from '@/types/supabase'

export const treatmentService = {
  async getTreatmentList() {
    return treatmentRepository.getAll()
  },

  async getById(id: string) {
    return treatmentRepository.getById(id)
  },

  async createMany(treatments: NewTreatment[]) {
    return treatmentRepository.createMany(treatments)
  },

  async getByReservation(reservationId: string) {
    return treatmentRepository.getByReservation(reservationId)
  },

  async getByCustomerId(customerId: number) {
    return treatmentRepository.getByCustomerId(customerId)
  },
}
