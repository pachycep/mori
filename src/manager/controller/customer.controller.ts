import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { customerService } from '../service/customer.service'

export const getCustomerList = createServerFn().handler(async () => {
  return customerService.getCustomerList()
})

export const createCustomer = createServerFn()
  .validator((data) =>
    z
      .object({
        name: z.string(),
        phone: z.string(),
        grade: z.union([
          z.literal('VIP'),
          z.literal('일반'),
          z.literal('신규'),
        ]),
        memo: z.string().optional(),
        lastVisit: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    return customerService.registerCustomer({
      ...data,
    })
  })

export const getCustomerById = createServerFn()
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    return customerService.getCustomerById(id)
  })
