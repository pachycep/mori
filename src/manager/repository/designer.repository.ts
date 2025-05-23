import type { Designer } from '@/types/supabase'

const mockDesigners: Designer[] = [
  {
    id: 1,
    name: '김디자이너',
    phone: '010-1111-2222',
    email: 'kimdesigner@gmail.com',
    imageUrl:
      'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20stylist&width=100&height=100&seq=101&orientation=squarish',
    specialties: ['컷', '염색', '펌'],
    services: [
      '단발 컷',
      '레이어드 컷',
      '발레아쥬',
      '뿌리 염색',
      '전체 염색',
      'C컬 펌',
      'S컬 펌',
    ],
    introduction: '10년 경력의 베테랑 디자이너입니다.',
    workingHours: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '10:00', end: '19:00' },
      sunday: { start: '10:00', end: '19:00' },
    },
  },
  {
    id: 2,
    name: '이디자이너',
    phone: '010-3333-4444',
    email: 'leedesigner@gmail.com',
    imageUrl:
      'https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20long%20brown%20hair%2C%20professional%20headshot%2C%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%2C%20photorealistic%2C%20beauty%20salon%20stylist&width=100&height=100&seq=102&orientation=squarish',
    specialties: ['헤어케어', '트리트먼트'],
    services: [
      '두피 케어',
      '헤드 스파',
      '헤어 에센스 트리트먼트',
      '케라틴 트리트먼트',
    ],
    introduction: '헤어케어 전문가입니다.',
    workingHours: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '10:00', end: '19:00' },
      sunday: { start: '10:00', end: '19:00' },
    },
  },
]

export const designerRepository = {
  async getAll(): Promise<Designer[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockDesigners), 300),
    )
  },

  async getById(id: number): Promise<Designer | undefined> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockDesigners.find((d) => d.id === id)), 300),
    )
  },

  async create(data: Omit<Designer, 'id'>): Promise<Designer> {
    const newDesigner: Designer = {
      ...data,
      id: Number(Date.now()),
    }
    mockDesigners.push(newDesigner)
    return new Promise((resolve) => setTimeout(() => resolve(newDesigner), 300))
  },

  async update(
    id: number,
    data: Partial<Designer>,
  ): Promise<Designer | undefined> {
    const index = mockDesigners.findIndex((d) => d.id === id)
    if (index === -1) return undefined

    mockDesigners[index] = {
      ...mockDesigners[index],
      ...data,
    }
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockDesigners[index]), 300),
    )
  },

  async delete(id: number): Promise<boolean> {
    const index = mockDesigners.findIndex((d) => d.id === id)
    if (index === -1) return false

    mockDesigners.splice(index, 1)
    return new Promise((resolve) => setTimeout(() => resolve(true), 300))
  },

  async getServicesByDesignerId(id: number): Promise<string[] | undefined> {
    const designer = await this.getById(id)
    if (!designer) return undefined
    return designer.services
  },
}
