import type { Designer } from '@/types/supabase'

export const designerRepository = {
  async getAll(): Promise<Designer[]> {
    // TODO: 실제 DB 연동 구현
    return []
  },

  async getById(id: number): Promise<Designer | undefined> {
    // TODO: 실제 DB 연동 구현
    return undefined
  },

  async create(data: Omit<Designer, 'id'>): Promise<Designer> {
    // TODO: 실제 DB 연동 구현
    throw new Error('Not implemented')
  },

  async update(
    id: number,
    data: Partial<Designer>,
  ): Promise<Designer | undefined> {
    // TODO: 실제 DB 연동 구현
    return undefined
  },

  async delete(id: number): Promise<boolean> {
    // TODO: 실제 DB 연동 구현
    return false
  },

  async getServicesByDesignerId(id: number): Promise<string[] | undefined> {
    // TODO: 실제 DB 연동 구현
    return undefined
  },
}
