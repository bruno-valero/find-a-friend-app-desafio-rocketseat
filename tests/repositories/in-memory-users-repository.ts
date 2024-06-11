import { PaginationParams } from '@/core/respositories/pagination-params'
import { UsersRepository } from '@/domain/find-a-friend/application/repositories/users-repository'
import { BaseUser } from '@/domain/find-a-friend/enterprise/entities/base-user'

export class InMemoryUsersRepository implements UsersRepository {
  items: BaseUser[] = []

  async create(user: BaseUser): Promise<BaseUser> {
    this.items.push(user)
    return user
  }

  async findById(id: string): Promise<BaseUser | null> {
    return this.items.find((item) => item.id.value === id) ?? null
  }

  async findMany(params?: PaginationParams | undefined): Promise<BaseUser[]> {
    if (!params) {
      return this.items
    }
    const page = (params.page - 1) * 20
    return this.items.slice(page, page + 20)
  }

  async update(user: BaseUser): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(user.id))
    if (index >= 0) {
      this.items[index] = user
    }
  }
}
