import type { Treatment, NewTreatment } from '@/types/supabase'

const mockTreatments: Treatment[] = [
  {
    id: '1',
    reservation_id: '1',
    name: '시술1',
    price: 10000,
    memo: '시술1 메모',
    customer_id: '1',
  },
  {
    id: '2',
    reservation_id: '12',
    name: '시술2',
    price: 20000,
    memo: '시술2 메모',
    customer_id: '1',
  },
  {
    id: '3',
    reservation_id: '23',
    name: '시술3',
    price: 30000,
    memo: '시술3 메모',
    customer_id: '2',
  },
  {
    id: '4',
    reservation_id: '2',
    name: '시술4',
    price: 40000,
    memo: '시술4 메모',
    customer_id: '2',
  },
  {
    id: '5',
    reservation_id: '3',
    name: '시술5',
    price: 50000,
    memo: '시술5 메모',
    customer_id: '3',
  },
]

export const treatmentRepository = {
  async getAll(): Promise<Treatment[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockTreatments), 300),
    )
  },

  // FIXME: createOne 으로 수정
  async createMany(treatments: NewTreatment[]): Promise<Treatment[]> {
    const created = treatments.map((t) => ({
      ...t,
      id: String(Date.now()) + Math.random().toString(16).slice(2),
    }))
    mockTreatments.push(...created)
    return new Promise((resolve) => setTimeout(() => resolve(created), 300))
  },

  async getByReservation(reservationId: string): Promise<Treatment | null> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            mockTreatments.find((t) => t.reservation_id === reservationId) ||
              null,
          ),
        300,
      ),
    )
  },

  async getById(id: string): Promise<Treatment | null> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(mockTreatments.find((t) => t.id === id) || null),
        300,
      ),
    )
  },

  async getByCustomerId(customerId: string): Promise<Treatment[]> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(mockTreatments.filter((t) => t.customer_id === customerId)),
        300,
      ),
    )
  },
}
