import type { Reservation, NewReservation } from '@/types/supabase'

const mockReservations: Reservation[] = [
  {
    id: '1',
    customer_id: '1',
    customer_name: '김미용',
    date: '2024-03-20',
    time: '14:00',
    notes: '단발 컷',
    serviceId: '1',
  },
  {
    id: '2',
    customer_id: '2',
    customer_name: '박시술',
    date: '2024-03-20',
    time: '15:30',
    notes: '염색 + 펌',
    serviceId: '2',
  },
  {
    id: '3',
    customer_id: '3',
    customer_name: '최헤어',
    date: '2024-03-21',
    time: '11:00',
    notes: '헤어케어',
    serviceId: '3',
  },
]

export const reservationRepository = {
  async create(data: NewReservation): Promise<Reservation> {
    const newReservation: Reservation = {
      ...data,
      id: String(Date.now()),
    }
    mockReservations.push(newReservation)
    return new Promise((resolve) =>
      setTimeout(() => resolve(newReservation), 300),
    )
  },

  async getAll(): Promise<Reservation[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockReservations), 300),
    )
  },
}
