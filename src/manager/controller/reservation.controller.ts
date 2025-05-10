import { createServerFn } from '@tanstack/react-start'
import { reservationService } from '../service/reservation.service'
import { z, ZodError } from 'zod'
import { createServerValidate } from '@tanstack/react-form/start'
import { setResponseStatus } from '@tanstack/react-start/server'
import { reservationFormOpts } from '@/ui/routes/reservation/new'

const reservationValidate = createServerValidate({
  ...reservationFormOpts,
  onServerValidate: async (data) =>
    z
      .object({
        customer_id: z.string(),
        date: z.string(),
        time: z.string(),
        memo: z.string().optional(),
      })
      .parse(data),
})
export const createReservation = createServerFn({
  method: 'POST',
})
  .validator(async (data) => {
    console.log('validator', data)
    if (!(data instanceof FormData)) {
      throw new Error('Invalid form data')
    }
    const validatedData = await reservationValidate(data)
    console.log(data)
    return validatedData
  })
  .handler(async ({ data }) => {
    try {
      await reservationService.createReservation(data)
    } catch (e) {
      if (e instanceof ZodError) {
        setResponseStatus(400)
        return e.errors.map((err) => err.message).join(', ')
      }

      setResponseStatus(500)
      return '서버 에러가 발생했습니다'
    }

    return 'Form has validated successfully'
  })

export const getReservationList = createServerFn().handler(async () => {
  return reservationService.getReservationList()
})
