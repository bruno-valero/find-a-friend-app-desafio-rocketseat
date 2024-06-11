import { Either, left, right } from '@/core/either'
import { OrgsRepository } from '../../repositories/orgs-repository'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'
import { Encoder } from '../../cryptography/encoder'
import { Encrypter } from '../../cryptography/encrypter'

export interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

export type AuthenticateOrgUseCaseResponse = Either<
  UnauthorizedError,
  { token: string }
>

export class AuthenticateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private encrypter: Encrypter,
    private encoder: Encoder,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) return left(new UnauthorizedError())

    const isValidPassword = await this.encrypter.compare(password, org.password)

    if (!isValidPassword) return left(new UnauthorizedError())

    const token = await this.encoder.encode({ sub: org.id.value })

    return right({ token })
  }
}
