import { createServerFn } from '@tanstack/react-start'
import { treatmentService } from '../service/treatment.service'
import { z } from 'zod'

export const createTreatments = createServerFn()
  .validator((data) =>
    z
      .array(
        z.object({
          reservation_id: z.string(),
          name: z.string(),
          price: z.number(),
          memo: z.string().optional(),
          imageUrls: z.array(z.string()).optional(),
        }),
      )
      .parse(data),
  )
  .handler(async ({ data }) => {
    return treatmentService.createMany(data)
  })

export const getTreatmentsByReservation = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: reservationId }) => {
    return treatmentService.getByReservation(reservationId)
  })

export const getTreatmentList = createServerFn().handler(async () => {
  return treatmentService.getTreatmentList()
})

export const getTreatmentById = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    return treatmentService.getById(id)
  })

export const getTreatmentsByCustomerId = createServerFn()
  .validator((id: number) => id)
  .handler(async ({ data: customerId }) => {
    return treatmentService.getByCustomerId(customerId)
  })
