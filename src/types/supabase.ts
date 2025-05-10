export type Customer = {
  id: string
  name: string
  phone: string
  grade: 'VIP' | '일반' | '신규'
  memo?: string
  total_spent: number
  last_visit?: string // ISO 날짜 문자열
}

export type NewCustomer = Partial<
  Pick<Customer, 'id' | 'memo' | 'last_visit'>
> &
  Omit<Customer, 'id' | 'memo' | 'last_visit'>

export type Reservation = {
  id: string
  date: string
  time: string
  customer_id: string
  customer_name: string
  notes?: string
  service_id: string // 시술 정보
}

export type NewReservation = Partial<Pick<Reservation, 'id' | 'notes'>> &
  Omit<Reservation, 'id' | 'notes'>

export type Treatment = {
  id: string
  reservation_id: string
  name: string
  price: number
  memo?: string
  image_urls?: string[]
  customer_id: string
}

export type NewTreatment = Partial<
  Pick<Treatment, 'id' | 'memo' | 'image_urls'>
> &
  Omit<Treatment, 'id' | 'memo' | 'image_urls'>
