import { Either, left, right } from '@/core/either'
import { PetsRepository } from '../../repositories/pets-repository'
import { Pet } from '../../../enterprise/entities/pet'
import {
  PetCharacteristics,
  PetCharacteristicsProps,
} from '../../../enterprise/entities/value-objects/pet-characteristics'
import { OrgsRepository } from '../../repositories/orgs-repository'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'

export interface RegisterPetUseCaseRequest {
  orgId: string
  name: string
  petCharacteristics: PetCharacteristicsProps
}

export type RegisterPetUseCaseResponse = Either<UnauthorizedError, null>

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    orgId,
    name,
    petCharacteristics,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) return left(new UnauthorizedError())
    const characteristics = new PetCharacteristics(petCharacteristics)

    const pet = Pet.create({
      orgId: new UniqueEntityId(orgId),
      name,
      address: org.address,
      characteristics,
    })

    await this.petsRepository.create(pet)

    return right(null)
  }
}
