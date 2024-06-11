import { PaginationParams } from '@/core/respositories/pagination-params'
import { OrgsRepository } from '@/domain/find-a-friend/application/repositories/orgs-repository'
import { Org } from '@/domain/find-a-friend/enterprise/entities/org'
import { prisma } from '../prisma'
import { PrismaOrgMapper } from '../mappers/prisma/prisma-org-mapper'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(org: Org): Promise<Org> {
    const PrismaOrg = await prisma.org.create({
      data: PrismaOrgMapper.domainToPrisma(org),
    })

    const mappedOrg = PrismaOrgMapper.toDomain(PrismaOrg)

    return mappedOrg
  }

  async findById(id: string): Promise<Org | null> {
    const PrismaOrg = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    if (!PrismaOrg) return null

    const mappedOrg = PrismaOrgMapper.toDomain(PrismaOrg)

    return mappedOrg
  }

  async findByEmail(email: string): Promise<Org | null> {
    const PrismaOrg = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    if (!PrismaOrg) return null

    const mappedOrg = PrismaOrgMapper.toDomain(PrismaOrg)

    return mappedOrg
  }

  async findMany(params?: PaginationParams | undefined): Promise<Org[]> {
    if (!params) {
      const PrismaOrg = await prisma.org.findMany()

      const mappedOrg = PrismaOrg.map(PrismaOrgMapper.toDomain)

      return mappedOrg
    }
    const PrismaOrg = await prisma.org.findMany({
      skip: params.page - 1,
      take: 20,
    })

    const mappedOrg = PrismaOrg.map(PrismaOrgMapper.toDomain)

    return mappedOrg
  }

  async update(org: Org): Promise<void> {
    await prisma.org.update({
      where: {
        id: org.id.value,
      },
      data: PrismaOrgMapper.domainToPrisma(org),
    })
  }
}
