import { PaginationParams } from '@/core/respositories/pagination-params'
import { Pet } from '../../enterprise/entities/pet'
import { PetCharacteristics } from '../../enterprise/entities/value-objects/pet-characteristics'

export type PetFilters = {
  city: string
  mainCharacteristics?: PetCharacteristics['main']
  type?: PetCharacteristics['type']
  color?: PetCharacteristics['color']
}

export interface PetsRepository {
  create(pet: Pet): Promise<Pet>
  findById(id: string, orgId: string): Promise<Pet | null>
  findMany(
    filters: PetFilters,
    orgId?: string,
    params?: PaginationParams,
  ): Promise<Pet[]>
  update(pet: Pet, orgId: string): Promise<void>
}
