import { PaginationParams } from '@/core/respositories/pagination-params'
import { Org } from '../../enterprise/entities/org'

export interface OrgsRepository {
  create(org: Org): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findMany(params?: PaginationParams): Promise<Org[]>
  update(org: Org): Promise<void>
}
