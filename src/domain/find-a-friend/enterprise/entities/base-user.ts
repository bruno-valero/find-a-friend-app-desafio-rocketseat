import { Optional } from '@/core/types/optional'
import { User } from './user'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export interface BaseUserProps {
  name: string
  email: string
  password: string
  role: 'USER' | 'ORG'
  createdAt: Date
  updatedAt: Date | null
}

export type BaseUserPropsCreationProps = Optional<
  BaseUserProps,
  'createdAt' | 'updatedAt' | 'role'
>

export class BaseUser extends User<BaseUserProps> {
  static create(props: BaseUserPropsCreationProps, id?: UniqueEntityId) {
    const baseUser = new BaseUser(
      {
        ...props,
        createdAt: props.updatedAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        role: props.role ?? 'USER',
      },
      id ?? new UniqueEntityId(),
    )
    return baseUser
  }
}
