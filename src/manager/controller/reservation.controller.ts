import { createServerFn } from '@tanstack/react-start'
import { reservationService } from '../service/reservation.service'
import { z } from 'zod'

const reservationSchema = z.object({
  customer_id: z.string(),
  date: z.string(),
  time: z.string(),
  memo: z.string().optional(),
  customer_name: z.string(),
  service_id: z.string(),
})

export const createReservation = createServerFn({
  method: 'POST',
})
  .validator((data) => {
    return reservationSchema.parse(data)
  })
  .handler(({ data }) => {
    return reservationService.createReservation(data)
  })

export const getReservationList = createServerFn().handler(async () => {
  return reservationService.getReservationList()
})
