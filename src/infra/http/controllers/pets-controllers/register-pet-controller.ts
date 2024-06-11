import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'
import { RegisterPetUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/register-pet-use-case'
import {
  characteristicsColorSchema,
  characteristicsMainSchema,
  characteristicsTypeSchema,
} from '@/domain/find-a-friend/enterprise/entities/value-objects/pet-characteristics'
import { PrismaOrgsRepository } from '@/infra/database/reposities/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/infra/database/reposities/prisma-pet-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    orgId: z.string().uuid(),
    name: z.string(),
    petCharacteristics: z.object({
      main: z.array(characteristicsMainSchema),
      color: characteristicsColorSchema,
      type: characteristicsTypeSchema,
      isAdoptable: z.boolean(),
    }),
  })

  const body = bodySchema.parse(req.body)

  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterPetUseCase(petsRepository, orgsRepository)

  const resp = await useCase.execute(body)

  if (resp.isLeft()) {
    const error = resp.value
    if (error instanceof UnauthorizedError) {
      res.status(401).send({ message: error.message })
    }
    res.send(400).send({ message: error.message })
  }

  if (resp.isRight()) {
    res.status(201).send()
  }

  res.status(500).send({ message: 'Internal server error.' })
}
