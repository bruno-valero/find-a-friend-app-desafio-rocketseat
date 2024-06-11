import Entity from '@/core/entities/entity'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  password: string
  role: 'USER' | 'ORG'
  createdAt: Date
  updatedAt: Date | null
}

export abstract class User<props extends UserProps> extends Entity<props> {
  protected constructor(props: props, id?: UniqueEntityId) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}
