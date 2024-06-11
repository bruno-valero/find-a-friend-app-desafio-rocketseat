import { Either, right } from '@/core/either'
import { PetsRepository } from '../../repositories/pets-repository'
import { PetCharacteristics } from '../../../enterprise/entities/value-objects/pet-characteristics'
import { Pet } from '../../../enterprise/entities/pet'

export interface FetchAllAdoptablePetsUseCaseRequest {
  orgId?: string
  filters: {
    city: string
    mainCharacteristics?: PetCharacteristics['main']
    type?: PetCharacteristics['type']
    color?: PetCharacteristics['color']
  }
}

export type FetchAllAdoptablePetsUseCaseResponse = Either<null, { pets: Pet[] }>

export class FetchAllAdoptablePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    filters,
  }: FetchAllAdoptablePetsUseCaseRequest): Promise<FetchAllAdoptablePetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany(filters, orgId)

    return right({ pets })
  }
}
