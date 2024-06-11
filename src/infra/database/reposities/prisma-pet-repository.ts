import { PaginationParams } from '@/core/respositories/pagination-params'
import {
  PetFilters,
  PetsRepository,
} from '@/domain/find-a-friend/application/repositories/pets-repository'
import { Pet } from '@/domain/find-a-friend/enterprise/entities/pet'
import { prisma } from '../prisma'

import {
  PrismaPetMapper,
  allPetCharacteristicsMains,
} from '../mappers/prisma/prisma-pet-mapper'

export class PrismaPetsRepository implements PetsRepository {
  async create(pet: Pet): Promise<Pet> {
    const PrismaPet = await prisma.pet.create({
      data: PrismaPetMapper.domainToPrisma(pet),
    })

    const mappedPet = PrismaPetMapper.toDomain(PrismaPet)

    return mappedPet
  }

  async findById(id: string, orgId: string): Promise<Pet | null> {
    const PrismaPet = await prisma.pet.findUnique({
      where: {
        id,
        orgId,
      },
    })

    if (!PrismaPet) return null

    const mappedPet = PrismaPetMapper.toDomain(PrismaPet)

    return mappedPet
  }

  async findMany(
    { city, color, type, mainCharacteristics }: PetFilters,
    orgId?: string,
    params?: PaginationParams | undefined,
  ): Promise<Pet[]> {
    if (!params) {
      console.log('findMany city', city)
      const PrismaPet = await prisma.pet.findMany({
        where: {
          city,
          isAdoptable: true,
          AND: [
            {
              orgId,
              color: color
                ? PrismaPetMapper.mapColorsToPrisma(color)
                : undefined,
              type: type ? PrismaPetMapper.mapTypesToPrisma(type) : undefined,
              mainCharacteristics: {
                hasSome: mainCharacteristics
                  ? PrismaPetMapper.mapMainsToPrisma(mainCharacteristics)
                  : PrismaPetMapper.mapMainsToPrisma(
                      allPetCharacteristicsMains,
                    ),
              },
            },
          ],
        },
      })

      const mappedPet = PrismaPet.map(PrismaPetMapper.toDomain)

      return mappedPet
    }
    const PrismaPet = await prisma.pet.findMany({
      where: {
        city,
        orgId,
        AND: [
          {
            color: color ? PrismaPetMapper.mapColorsToPrisma(color) : undefined,
            type: type ? PrismaPetMapper.mapTypesToPrisma(type) : undefined,
            mainCharacteristics: {
              hasSome: mainCharacteristics
                ? PrismaPetMapper.mapMainsToPrisma(mainCharacteristics)
                : PrismaPetMapper.mapMainsToPrisma(allPetCharacteristicsMains),
            },
          },
        ],
      },
      skip: params.page - 1,
      take: 20,
    })

    const mappedPet = PrismaPet.map(PrismaPetMapper.toDomain)

    return mappedPet
  }

  async update(pet: Pet, orgId: string): Promise<void> {
    await prisma.pet.update({
      where: {
        id: pet.id.value,
        orgId,
      },
      data: PrismaPetMapper.domainToPrisma(pet),
    })
  }
}
