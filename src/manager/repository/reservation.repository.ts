import type { Reservation, NewReservation } from '@/types/supabase'

const mockReservations: Reservation[] = [
  {
    id: 1,
    customer: {
      id: 1,
      name: '김미용',
      phone: '010-1111-2222',
      email: 'kimmiyong@gmail.com',
      imageUrl:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=101&orientation=squarish',
      grade: '일반',
      totalSpent: 150000,
    },
    date: '2024-03-20',
    time: '14:00',
    notes: '단발 컷',
    serviceId: '1',
  },
  {
    id: 2,
    customer: {
      id: 2,
      name: '박시술',
      phone: '010-3333-4444',
      email: 'parkshisul@gmail.com',
      imageUrl:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=101&orientation=squarish',
      grade: '일반',
      totalSpent: 150000,
    },
    date: '2024-03-20',
    time: '15:30',
    notes: '염색 + 펌',
    serviceId: '2',
  },
  {
    id: 3,
    customer: {
      id: 3,
      name: '최헤어',
      phone: '010-5555-6666',
      email: 'choihae@gmail.com',
      imageUrl:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer%2C%20soft%20lighting&width=100&height=100&seq=101&orientation=squarish',
      grade: '일반',
      totalSpent: 150000,
    },
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
      id: Number(Date.now()),
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
