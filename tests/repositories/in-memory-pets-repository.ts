import { PaginationParams } from '@/core/respositories/pagination-params'
import {
  PetFilters,
  PetsRepository,
} from '@/domain/find-a-friend/application/repositories/pets-repository'
import { Pet } from '@/domain/find-a-friend/enterprise/entities/pet'
import { PetCharacteristics } from '@/domain/find-a-friend/enterprise/entities/value-objects/pet-characteristics'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

  async create(org: Pet): Promise<Pet> {
    this.items.push(org)
    return org
  }

  async findById(id: string, orgId: string): Promise<Pet | null> {
    return (
      this.items.find(
        (item) => item.id.value === id && item.orgId.value === orgId,
      ) ?? null
    )
  }

  async findMany(
    filters: PetFilters,
    orgId?: string,
    params?: PaginationParams | undefined,
  ): Promise<Pet[]> {
    const filter = (item: Pet) => {
      const isAuthorized = orgId ? item.orgId.value === orgId : true
      const isAdoptable = item.characteristics.isAdoptable
      const isInSameCity =
        item.address.city.toLowerCase() === filters.city.toLowerCase()
      const isMainCharEqual = filters.mainCharacteristics
        ? item.characteristics.someIsInMain(filters.mainCharacteristics)
        : true
      const isTypeEqual = filters.type
        ? item.characteristics.isTypeEqual(filters.type)
        : true
      const isColorEqual = filters.color
        ? item.characteristics.isColorEqual(filters.color)
        : true

      const filterResult =
        isAuthorized &&
        isAdoptable &&
        isInSameCity &&
        isMainCharEqual &&
        isTypeEqual &&
        isColorEqual

      return filterResult
    }
    if (!params) {
      return this.items.filter((item) => filter(item))
    }
    const page = (params.page - 1) * 20
    return this.items.slice(page, page + 20).filter((item) => filter(item))
  }

  async update(org: Pet, orgId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.equals(org.id) && item.orgId.value === orgId,
    )
    if (index >= 0) {
      this.items[index] = org
    }
  }

  async filterByMainCharacteristics(
    main: PetCharacteristics['main'],
    orgId: string,
  ): Promise<Pet[]> {
    return this.items.filter(
      (item) =>
        item.orgId.value === orgId && item.characteristics.someIsInMain(main),
    )
  }

  async filterByColor(
    color: PetCharacteristics['color'],
    orgId: string,
  ): Promise<Pet[]> {
    return this.items.filter(
      (item) =>
        item.orgId.value === orgId && item.characteristics.isColorEqual(color),
    )
  }

  async filterByType(
    type: PetCharacteristics['type'],
    orgId: string,
  ): Promise<Pet[]> {
    return this.items.filter(
      (item) =>
        item.orgId.value === orgId && item.characteristics.isTypeEqual(type),
    )
  }

  async filterByAllCharacteristics(
    allChar: PetCharacteristics,
    orgId: string,
  ): Promise<Pet[]> {
    const main = allChar.main
    const color = allChar.color
    const type = allChar.type

    return this.items.filter(
      (item) =>
        item.orgId.value === orgId &&
        (item.characteristics.someIsInMain(main) ||
          item.characteristics.isColorEqual(color) ||
          item.characteristics.isTypeEqual(type)),
    )
  }
}
