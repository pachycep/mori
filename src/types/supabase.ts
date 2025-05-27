export type Customer = {
  id: number
  name: string
  phone: string
  email: string
  grade: 'VIP' | '일반' | '신규'
  imageUrl: string
  memo?: string
  totalSpent: number
  lastVisit?: string // ISO 날짜 문자열
  favoriteServices?: string[]
  tags?: string[]
}

export type NewCustomer = Partial<Pick<Customer, 'id' | 'memo' | 'lastVisit'>> &
  Omit<Customer, 'id' | 'memo' | 'lastVisit'>

export type Reservation = {
  id: number
  date: string
  time: string
  customer: Customer
  memo?: string
  services: string[]
  status: '완료' | '진행중' | '취소'
}

export type NewReservation = Partial<Pick<Reservation, 'id' | 'memo'>> &
  Omit<Reservation, 'id' | 'memo'>

export type Treatment = {
  id: number
  reservation: Reservation
  name: string
  price: number
  memo?: string
  imageUrls?: string[]
  customer: Customer
  createdAt: string
  services: string[]
  styleTags: string[]
  beforeImageUrl?: string
  afterImageUrl?: string
}

export type NewTreatment = Partial<
  Pick<Treatment, 'id' | 'memo' | 'imageUrls'>
> &
  Omit<Treatment, 'id' | 'memo' | 'imageUrls'>

export type Designer = {
  id: number
  name: string
  phone: string
  email: string
  imageUrl: string
  specialties: string[]
  services: string[]
  introduction: string
  workingHours: {
    monday: { start: string; end: string }
    tuesday: { start: string; end: string }
    wednesday: { start: string; end: string }
    thursday: { start: string; end: string }
    friday: { start: string; end: string }
    saturday: { start: string; end: string }
    sunday: { start: string; end: string }
  }
}
