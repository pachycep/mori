import { createServerFn } from '@tanstack/react-start'
import { customerService } from '../service/customer.service'
import { z } from 'zod'

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
        last_visit: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    return customerService.registerCustomer({
      ...data,
      total_spent: 0,
    })
  })
