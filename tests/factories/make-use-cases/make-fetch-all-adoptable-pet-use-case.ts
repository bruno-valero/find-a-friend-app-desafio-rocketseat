import { PetsRepository } from '@/domain/find-a-friend/application/repositories/pets-repository'
import { FetchAllAdoptablePetsUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/fetch-all-adoptable-pet-use-case'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'

export function MakeFetchAllAdoptablePetUseCase(props?: {
  petsRepositoryAlt?: PetsRepository
}) {
  const petsRepository =
    props?.petsRepositoryAlt ?? new InMemoryPetsRepository()
  const useCase = new FetchAllAdoptablePetsUseCase(petsRepository)

  return {
    useCase,
    dependencies: {
      petsRepository,
    },
  }
}
