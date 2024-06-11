import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Org } from '@/domain/find-a-friend/enterprise/entities/org'
import { Address } from '@/domain/find-a-friend/enterprise/entities/value-objects/address'
import { Whatsapp } from '@/domain/find-a-friend/enterprise/entities/value-objects/whatsapp'
import { Org as PrismaOrg } from '@prisma/client'

export class PrismaOrgMapper {
  static toDomain(org: PrismaOrg): Org {
    const address = new Address({
      cep: org.cep,
      city: org.city,
      neighborhood: org.neighborhood,
      number: org.number,
      state: org.state,
      street: org.street,
    })

    const whatsapp = new Whatsapp(org.whatsapp)

    const newOrg = Org.create(
      {
        name: org.name,
        email: org.email,
        password: org.passwordHash,
        address,
        whatsapp,
        role: org.role,
        createdAt: org.createdAt,
        updatedAt: org.updatedAt,
      },
      new UniqueEntityId(org.id),
    )

    return newOrg
  }

  static domainToPrisma(org: Org): PrismaOrg {
    const newOrg: PrismaOrg = {
      id: org.id.value,
      name: org.name,
      email: org.email,
      passwordHash: org.password,
      whatsapp: org.whatsapp.raw,
      role: org.role,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
      cep: org.address.cep.raw,
      city: org.address.city,
      neighborhood: org.address.neighborhood,
      number: org.address.number,
      state: org.address.state.short,
      street: org.address.street,
    }

    return newOrg
  }
}
