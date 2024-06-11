import { Either, left, right } from '@/core/either'
import { PetsRepository } from '../../repositories/pets-repository'
import { Pet } from '../../../enterprise/entities/pet'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface FindPetUseCaseRequest {
  orgId: string
  petId: string
}

export type FindPetUseCaseResponse = Either<ResourceNotFoundError, { pet: Pet }>

export class FindPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    petId,
  }: FindPetUseCaseRequest): Promise<FindPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId, orgId)

    if (!pet) return left(new ResourceNotFoundError())

    return right({ pet })
  }
}
