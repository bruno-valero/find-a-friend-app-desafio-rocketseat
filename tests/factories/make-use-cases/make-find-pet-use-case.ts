import { PetsRepository } from '@/domain/find-a-friend/application/repositories/pets-repository'
import { FindPetUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/find-pet-use-case'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'

export function MakeFindPetUseCase(props?: {
  petsRepositoryAlt?: PetsRepository
}) {
  const petsRepository =
    props?.petsRepositoryAlt ?? new InMemoryPetsRepository()
  const useCase = new FindPetUseCase(petsRepository)

  return {
    useCase,
    dependencies: {
      petsRepository,
    },
  }
}
