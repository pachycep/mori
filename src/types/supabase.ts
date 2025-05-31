import type { Tables, TablesInsert } from './supabase.generated'

export type Treatment = Tables<'treatments'>
export type NewTreatment = TablesInsert<'treatments'>
export type Customer = Tables<'customers'>
export type NewCustomer = TablesInsert<'customers'>
export type Designer = Tables<'designers'>
export type NewDesigner = TablesInsert<'designers'>
export type Reservation = Tables<'reservations'>
export type NewReservation = TablesInsert<'reservations'>
export type Service = Tables<'services'>
export type NewService = TablesInsert<'services'>

export type { Tables, TablesInsert, TablesUpdate } from './supabase.generated'
