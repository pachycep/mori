import { designerRepository } from '../repository/designer.repository'
import type { Designer } from '@/types/supabase'

export const designerService = {
  async getDesignerList() {
    return designerRepository.getAll()
  },

  async getById(id: number) {
    return designerRepository.getById(id)
  },

  async create(designer: Omit<Designer, 'id'>) {
    return designerRepository.create(designer)
  },

  async update(id: number, data: Partial<Designer>) {
    return designerRepository.update(id, data)
  },

  async delete(id: number) {
    return designerRepository.delete(id)
  },

  async getServicesByDesignerId(id: number) {
    return designerRepository.getServicesByDesignerId(id)
  },
}
