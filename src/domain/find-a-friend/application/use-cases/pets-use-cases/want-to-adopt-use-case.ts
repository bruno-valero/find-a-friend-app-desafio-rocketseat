import { Either, left, right } from '@/core/either'
import { PetsRepository } from '../../repositories/pets-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { OrgsRepository } from '../../repositories/orgs-repository'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'

export interface WhantToAdoptUseCaseRequest {
  petId: string
}

export type WhantToAdoptUseCaseResponse = Either<
  ResourceNotFoundError,
  { whatsapp: string }
>

export class WhantToAdoptUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: WhantToAdoptUseCaseRequest): Promise<WhantToAdoptUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)
    if (!pet) return left(new ResourceNotFoundError())
    if (!pet.characteristics.isAdoptable) return left(new UnauthorizedError())

    const org = await this.orgsRepository.findById(pet.orgId.value)
    if (!org) return left(new ResourceNotFoundError())

    const whatsapp = org.whatsapp.format

    return right({ whatsapp })
  }
}
