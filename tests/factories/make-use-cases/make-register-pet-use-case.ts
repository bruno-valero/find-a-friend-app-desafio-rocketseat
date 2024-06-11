import { OrgsRepository } from '@/domain/find-a-friend/application/repositories/orgs-repository'
import { PetsRepository } from '@/domain/find-a-friend/application/repositories/pets-repository'
import { RegisterPetUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/register-pet-use-case'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'

export function MakeRegisterPetUseCase(props?: {
  petsRepositoryAlt?: PetsRepository
  orgsRepositoryAlt?: OrgsRepository
}) {
  const petsRepository =
    props?.petsRepositoryAlt ?? new InMemoryPetsRepository()
  const orgsRepository =
    props?.orgsRepositoryAlt ?? new InMemoryOrgsRepository()
  const useCase = new RegisterPetUseCase(petsRepository, orgsRepository)

  return {
    useCase,
    dependencies: {
      petsRepository,
      orgsRepository,
    },
  }
}
