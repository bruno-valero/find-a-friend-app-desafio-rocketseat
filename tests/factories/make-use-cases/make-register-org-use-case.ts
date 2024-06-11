import { Encrypter } from '@/domain/find-a-friend/application/cryptography/encrypter'
import { OrgsRepository } from '@/domain/find-a-friend/application/repositories/orgs-repository'
import { RegisterOrgUseCase } from '@/domain/find-a-friend/application/use-cases/orgs-use-cases/register-org-use-case'
import { FakeEncrypter } from 'tests/cryptography/fake-encrypter'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'

export function MakeRegisterOrgUseCase(props?: {
  orgsRepositoryAlt?: OrgsRepository
  encrypterAlt?: Encrypter
}) {
  const orgsRepository =
    props?.orgsRepositoryAlt ?? new InMemoryOrgsRepository()
  const encrypter = props?.encrypterAlt ?? new FakeEncrypter()
  const useCase = new RegisterOrgUseCase(orgsRepository, encrypter)

  return {
    useCase,
    dependencies: {
      orgsRepository,
      encrypter,
    },
  }
}
