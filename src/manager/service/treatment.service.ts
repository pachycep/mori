import { treatmentRepository } from '../repository/treatment.repository'
import type { Treatment } from '@/types/supabase'

export const treatmentService = {
  async getTreatmentList() {
    return treatmentRepository.getAll()
  },

  async getById(id: string) {
    return treatmentRepository.getById(id)
  },

  async create(treatment: Treatment) {
    return treatmentRepository.create(treatment)
  },

  async getByReservation(reservationId: string) {
    return treatmentRepository.getByReservation(reservationId)
  },

  async getByCustomerId(customerId: number) {
    return treatmentRepository.getByCustomerId(customerId)
  },
}
