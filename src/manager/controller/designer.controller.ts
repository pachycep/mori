import { createServerFn } from '@tanstack/react-start'
import { designerService } from '../service/designer.service'
import { z } from 'zod'

const designerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  imageUrl: z.string(),
  specialties: z.array(z.string()),
  services: z.array(z.string()),
  introduction: z.string(),
  workingHours: z.object({
    monday: z.object({ start: z.string(), end: z.string() }),
    tuesday: z.object({ start: z.string(), end: z.string() }),
    wednesday: z.object({ start: z.string(), end: z.string() }),
    thursday: z.object({ start: z.string(), end: z.string() }),
    friday: z.object({ start: z.string(), end: z.string() }),
    saturday: z.object({ start: z.string(), end: z.string() }),
    sunday: z.object({ start: z.string(), end: z.string() }),
  }),
})

export const createDesigner = createServerFn({
  method: 'POST',
})
  .validator((data) => designerSchema.parse(data))
  .handler(async ({ data }) => {
    return designerService.create(data)
  })

export const getDesignerList = createServerFn().handler(async () => {
  return designerService.getDesignerList()
})

export const getDesignerById = createServerFn()
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    return designerService.getById(id)
  })

export const updateDesigner = createServerFn({
  method: 'POST',
})
  .validator((data) =>
    z
      .object({
        id: z.number(),
        data: designerSchema.partial(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    return designerService.update(data.id, data.data)
  })

export const deleteDesigner = createServerFn({
  method: 'POST',
})
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    return designerService.delete(id)
  })

export const getDesignerServices = createServerFn()
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    return designerService.getServicesByDesignerId(id)
  })
