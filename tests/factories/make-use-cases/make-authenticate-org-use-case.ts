import { Encoder } from '@/domain/find-a-friend/application/cryptography/encoder'
import { Encrypter } from '@/domain/find-a-friend/application/cryptography/encrypter'
import { OrgsRepository } from '@/domain/find-a-friend/application/repositories/orgs-repository'
import { AuthenticateOrgUseCase } from '@/domain/find-a-friend/application/use-cases/orgs-use-cases/authenticate-org-use-case'
import { FakeEncoder } from 'tests/cryptography/fake-encoder'
import { FakeEncrypter } from 'tests/cryptography/fake-encrypter'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'

export function MakeAuthenticateOrgUseCase(props?: {
  orgsRepositoryAlt?: OrgsRepository
  encrypterAlt?: Encrypter
  encoderAlt?: Encoder
}) {
  const orgsRepository =
    props?.orgsRepositoryAlt ?? new InMemoryOrgsRepository()
  const encrypter = props?.encrypterAlt ?? new FakeEncrypter()
  const encoder = props?.encoderAlt ?? new FakeEncoder()
  const useCase = new AuthenticateOrgUseCase(orgsRepository, encrypter, encoder)

  return {
    useCase,
    dependencies: {
      orgsRepository,
      encrypter,
      encoder,
    },
  }
}
