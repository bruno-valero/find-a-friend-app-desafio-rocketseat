import { Optional } from '@/core/types/optional'
import { User } from './user'
import { Address } from './value-objects/address'
import { Whatsapp } from './value-objects/whatsapp'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export interface OrgProps {
  name: string
  email: string
  password: string
  role: 'USER' | 'ORG'
  address: Address
  whatsapp: Whatsapp
  createdAt: Date
  updatedAt: Date | null
}

export type OrgPropsCreationProps = Optional<
  OrgProps,
  'createdAt' | 'updatedAt' | 'role'
>

export class Org extends User<OrgProps> {
  static create(props: OrgPropsCreationProps, id?: UniqueEntityId) {
    const org = new Org(
      {
        ...props,
        createdAt: props.updatedAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        role: props.role ?? 'ORG',
      },
      id ?? new UniqueEntityId(),
    )
    return org
  }

  get address() {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
    this.touch()
  }

  get whatsapp() {
    return this.props.whatsapp
  }

  set whatsapp(whatsapp: Whatsapp) {
    this.props.whatsapp = whatsapp
    this.touch()
  }
}
