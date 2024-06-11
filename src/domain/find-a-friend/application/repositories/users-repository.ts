import { PaginationParams } from '@/core/respositories/pagination-params'
import { BaseUser } from '../../enterprise/entities/base-user'

export interface UsersRepository {
  create(user: BaseUser): Promise<BaseUser>
  findById(id: string): Promise<BaseUser | null>
  findMany(params?: PaginationParams): Promise<BaseUser[]>
  update(user: BaseUser): Promise<void>
}
