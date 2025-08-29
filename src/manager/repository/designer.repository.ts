import type { Designer } from '@/types/supabase'
import { getSupabaseServerClient } from '@/manager/client/supabase'

export const designerRepository = {
  async getAll(): Promise<Designer[]> {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from('designers').select('*')
    if (error) throw new Error(error.message)
    return data as Designer[]
  },

  async getById(id: number): Promise<Designer | null> {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from('designers')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error && error.code !== 'PGRST116') throw new Error(error.message)
    // PGRST116: no rows returned
    return data ? (data as Designer) : null
  },

  async create(data: Omit<Designer, 'id'>): Promise<Designer> {
    const supabase = await getSupabaseServerClient()
    const { data: inserted, error } = await supabase
      .from('designers')
      .insert(data)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return inserted as Designer
  },

  async update(
    id: number,
    data: Partial<Designer>,
  ): Promise<Designer | undefined> {
    const supabase = await getSupabaseServerClient()
    const { data: updated, error } = await supabase
      .from('designers')
      .update(data)
      .eq('id', id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return updated as Designer
  },

  async delete(id: number): Promise<boolean> {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from('designers').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return true
  },

  async getServicesByDesignerId(id: number): Promise<string[] | undefined> {
    // 예시: 별도 services 테이블이 있다면 조인 필요, 단순히 designers 테이블에 없다면 null 반환
    return undefined
  },
}
