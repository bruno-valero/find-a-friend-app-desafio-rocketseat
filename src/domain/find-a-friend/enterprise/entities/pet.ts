import { Optional } from '@/core/types/optional'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import Entity from '@/core/entities/entity'
import { PetCharacteristics } from './value-objects/pet-characteristics'
import { Address } from './value-objects/address'

export interface PetProps {
  orgId: UniqueEntityId
  name: string
  address: Address
  characteristics: PetCharacteristics
  createdAt: Date
  updatedAt: Date | null
}

export type PetPropsCreationProps = Optional<
  PetProps,
  'createdAt' | 'updatedAt'
>

export class Pet extends Entity<PetProps> {
  static create(props: PetPropsCreationProps, id?: UniqueEntityId) {
    const pet = new Pet(
      {
        ...props,
        createdAt: props.updatedAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id ?? new UniqueEntityId(),
    )
    return pet
  }

  get orgId() {
    return this.props.orgId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
    this.touch()
  }

  get characteristics() {
    return this.props.characteristics
  }

  set characteristics(characteristics: PetCharacteristics) {
    this.props.characteristics = characteristics
    this.touch()
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

  compare(pet: Pet) {
    const isCharacteristicsEqual = this.characteristics.compare(
      pet.characteristics,
    )
    const isNameEqual = this.name === pet.name
    const isCreatedAtEqual = this.createdAt === pet.createdAt
    const isUpdatedAtEqual = this.updatedAt === pet.updatedAt
    const isOrdIdEqual = this.orgId.equals(pet.orgId)

    const isPetEqual =
      isCharacteristicsEqual &&
      isNameEqual &&
      isCreatedAtEqual &&
      isUpdatedAtEqual &&
      isOrdIdEqual

    return isPetEqual
  }
}
