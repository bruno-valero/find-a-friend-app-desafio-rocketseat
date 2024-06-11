import { PaginationParams } from '@/core/respositories/pagination-params'
import { OrgsRepository } from '@/domain/find-a-friend/application/repositories/orgs-repository'
import { Org } from '@/domain/find-a-friend/enterprise/entities/org'

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Org[] = []

  async create(org: Org): Promise<Org> {
    this.items.push(org)
    return org
  }

  async findById(id: string): Promise<Org | null> {
    return this.items.find((item) => item.id.value === id) ?? null
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((item) => item.email === email) ?? null
  }

  async findMany(params?: PaginationParams | undefined): Promise<Org[]> {
    if (!params) {
      return this.items
    }
    const page = (params.page - 1) * 20
    return this.items.slice(page, page + 20)
  }

  async update(org: Org): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(org.id))
    if (index >= 0) {
      this.items[index] = org
    }
  }
}
