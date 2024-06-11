import { Either, left, right } from '@/core/either'
import { OrgsRepository } from '../../repositories/orgs-repository'
import { Org } from '../../../enterprise/entities/org'
import {
  Address,
  AddressProps,
} from '../../../enterprise/entities/value-objects/address'
import { Whatsapp } from '../../../enterprise/entities/value-objects/whatsapp'
import { Encrypter } from '../../cryptography/encrypter'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'

export interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  password: string
  address: AddressProps
  whatsapp: string
}

export type RegisterOrgUseCaseResponse = Either<UserAlreadyExistsError, null>

export class RegisterOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    address,
    whatsapp,
    ...props
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const existentOrg = await this.orgsRepository.findByEmail(props.email)

    if (existentOrg) return left(new UserAlreadyExistsError(props.email))

    const newAddress = new Address(address)
    const newWhatsapp = new Whatsapp(whatsapp)
    const org = Org.create({
      address: newAddress,
      whatsapp: newWhatsapp,
      ...props,
    })

    org.password = await this.encrypter.hash(org.password)

    await this.orgsRepository.create(org)

    return right(null)
  }
}
