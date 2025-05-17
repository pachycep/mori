import type { Treatment, NewTreatment } from '@/types/supabase'

const mockTreatments: Treatment[] = [
  {
    id: 1,
    created_at: '2025-05-15',
    reservation: {
      id: 1,
      date: '2025-05-15',
      time: '10:00',
      customer: {
        id: 1,
        name: 'Olivia Parker',
        phone: '(555) 123-4567',
        email: 'olivia.p@example.com',
        image_url:
          'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20blonde%20hair%2C%20professional%20photo%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer&width=100&height=100&seq=1&orientation=squarish',
        grade: 'VIP',
        total_spent: 10000,
      },
      service_id: '1',
    },
    name: 'Haircut & Blowout',
    price: 150,
    customer: {
      id: 1,
      name: 'Olivia Parker',
      phone: '(555) 123-4567',
      email: 'olivia.p@example.com',
      image_url:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20blonde%20hair%2C%20professional%20photo%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer&width=100&height=100&seq=1&orientation=squarish',
      grade: 'VIP',
      total_spent: 10000,
    },
    services: ['Haircut', 'Blowout'],
    style_tags: ['Bob', 'Blonde', 'Textured'],
    after_image_url:
      'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20blonde%20textured%20bob%20haircut%2C%20face%20framing%20layers%2C%20clean%20studio%20background%2C%20high%20quality%20hair%20styling%20photography%2C%20beauty%20salon%20portfolio%20image&width=300&height=400&seq=10&orientation=portrait',
    before_image_url:
      'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20long%20blonde%20hair%20before%20haircut%2C%20clean%20studio%20background%2C%20high%20quality%20hair%20styling%20photography%2C%20beauty%20salon%20portfolio%20image&width=300&height=400&seq=11&orientation=portrait',
  },
  {
    id: 2,
    created_at: '2025-05-14',
    reservation: {
      id: 2,
      date: '2025-05-14',
      time: '14:00',
      customer: {
        id: 2,
        name: 'Madison Chen',
        phone: '(555) 987-6543',
        email: 'madison.c@example.com',
        image_url:
          'https://readdy.ai/api/search-image?query=portrait%20of%20an%20asian%20woman%20with%20long%20black%20hair%2C%20professional%20photo%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer&width=100&height=100&seq=2&orientation=squarish',
        grade: '일반',
        total_spent: 5000,
      },
      service_id: '2',
    },
    name: 'Color & Treatment',
    price: 200,
    customer: {
      id: 2,
      name: 'Madison Chen',
      phone: '(555) 987-6543',
      email: 'madison.c@example.com',
      image_url:
        'https://readdy.ai/api/search-image?query=portrait%20of%20an%20asian%20woman%20with%20long%20black%20hair%2C%20professional%20photo%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer&width=100&height=100&seq=2&orientation=squarish',
      grade: '일반',
      total_spent: 5000,
    },
    services: ['Color', 'Treatment'],
    style_tags: ['Balayage', 'Brunette', 'Long Layers'],
    after_image_url:
      'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20brunette%20balayage%20on%20long%20layered%20hair%2C%20asian%20woman%2C%20clean%20studio%20background%2C%20high%20quality%20hair%20styling%20photography%2C%20beauty%20salon%20portfolio%20image&width=300&height=400&seq=12&orientation=portrait',
  },
  {
    id: 3,
    created_at: '2025-05-13',
    reservation: {
      id: 3,
      date: '2025-05-13',
      time: '16:00',
      customer: {
        id: 3,
        name: 'Sophia Rodriguez',
        phone: '(555) 234-5678',
        email: 'sophia.r@example.com',
        image_url:
          'https://readdy.ai/api/search-image?query=portrait%20of%20a%20latina%20woman%20with%20brown%20hair%2C%20professional%20photo%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer&width=100&height=100&seq=3&orientation=squarish',
        grade: '신규',
        total_spent: 3000,
      },
      service_id: '3',
    },
    name: 'Complete Transformation',
    price: 300,
    customer: {
      id: 3,
      name: 'Sophia Rodriguez',
      phone: '(555) 234-5678',
      email: 'sophia.r@example.com',
      image_url:
        'https://readdy.ai/api/search-image?query=portrait%20of%20a%20latina%20woman%20with%20brown%20hair%2C%20professional%20photo%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20customer&width=100&height=100&seq=3&orientation=squarish',
      grade: '신규',
      total_spent: 3000,
    },
    services: ['Haircut', 'Color', 'Treatment'],
    style_tags: ['Pixie', 'Red', 'Textured'],
    after_image_url:
      'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20copper%20red%20textured%20pixie%20haircut%2C%20latina%20woman%2C%20clean%20studio%20background%2C%20high%20quality%20hair%20styling%20photography%2C%20beauty%20salon%20portfolio%20image&width=300&height=400&seq=13&orientation=portrait',
    before_image_url:
      'https://readdy.ai/api/search-image?query=professional%20salon%20photo%20of%20long%20brown%20hair%20before%20pixie%20haircut%2C%20latina%20woman%2C%20clean%20studio%20background%2C%20high%20quality%20hair%20styling%20photography%2C%20beauty%20salon%20portfolio%20image&width=300&height=400&seq=14&orientation=portrait',
  },
]

export const treatmentRepository = {
  async getAll(): Promise<Treatment[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockTreatments), 300),
    )
  },

  async createMany(treatments: NewTreatment[]): Promise<Treatment[]> {
    const created = treatments.map((t) => ({
      ...t,
      id: Number(Date.now()) + Math.floor(Math.random() * 1000),
    }))
    mockTreatments.push(...created)
    return new Promise((resolve) => setTimeout(() => resolve(created), 300))
  },

  async getByReservation(reservationId: string): Promise<Treatment | null> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            mockTreatments.find(
              (t) => t.reservation.id === Number(reservationId),
            ) || null,
          ),
        300,
      ),
    )
  },

  async getById(id: string): Promise<Treatment | null> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(mockTreatments.find((t) => t.id === Number(id)) || null),
        300,
      ),
    )
  },

  async getByCustomerId(customerId: string): Promise<Treatment[]> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            mockTreatments.filter((t) => t.customer.id === Number(customerId)),
          ),
        300,
      ),
    )
  },
}
