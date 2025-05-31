import type { NewTreatment, Treatment } from '@/types/supabase'

export const treatmentRepository = {
  async getAll(): Promise<Treatment[]> {
    // TODO: 실제 DB 연동 구현
    return []
  },

  async create(treatment: NewTreatment): Promise<Treatment> {
    // TODO: 실제 DB 연동 구현
    throw new Error('Not implemented')
  },

  async getByReservation(reservationId: string): Promise<Treatment | null> {
    // TODO: 실제 DB 연동 구현
    return null
  },

  async getById(id: string): Promise<Treatment | null> {
    // TODO: 실제 DB 연동 구현
    return null
  },

  async getByCustomerId(customerId: number): Promise<Treatment[]> {
    // TODO: 실제 DB 연동 구현
    return []
  },
}
