export type Customer = {
  id: number
  name: string
  phone: string
  email: string
  grade: 'VIP' | '일반' | '신규'
  image_url?: string
  memo?: string
  total_spent: number
  last_visit?: string // ISO 날짜 문자열
}

export type NewCustomer = Partial<
  Pick<Customer, 'id' | 'memo' | 'last_visit'>
> &
  Omit<Customer, 'id' | 'memo' | 'last_visit'>

export type Reservation = {
  id: number
  date: string
  time: string
  customer: Customer
  notes?: string
  service_id: string // 시술 정보
}

export type NewReservation = Partial<Pick<Reservation, 'id' | 'notes'>> &
  Omit<Reservation, 'id' | 'notes'>

export type Treatment = {
  id: number
  reservation: Reservation
  name: string
  price: number
  memo?: string
  image_urls?: string[]
  customer: Customer
  created_at: string
  services: string[]
  style_tags: string[]
  before_image_url?: string
  after_image_url?: string
}

export type NewTreatment = Partial<
  Pick<Treatment, 'id' | 'memo' | 'image_urls'>
> &
  Omit<Treatment, 'id' | 'memo' | 'image_urls'>
