import { OrgsRepository } from '@/domain/find-a-friend/application/repositories/orgs-repository'
import { PetsRepository } from '@/domain/find-a-friend/application/repositories/pets-repository'
import { WhantToAdoptUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/want-to-adopt-use-case'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'

export function MakeWantToAdoptUseCase(props?: {
  petsRepositoryAlt?: PetsRepository
  orgsRepositoryAlt?: OrgsRepository
}) {
  const petsRepository =
    props?.petsRepositoryAlt ?? new InMemoryPetsRepository()
  const orgsRepository =
    props?.orgsRepositoryAlt ?? new InMemoryOrgsRepository()
  const useCase = new WhantToAdoptUseCase(petsRepository, orgsRepository)

  return {
    useCase,
    dependencies: {
      petsRepository,
      orgsRepository,
    },
  }
}
