import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { WhantToAdoptUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/want-to-adopt-use-case'
import { PrismaOrgsRepository } from '@/infra/database/reposities/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/infra/database/reposities/prisma-pet-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function wantToAdoptController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    orgId: z.string().uuid(),
  })

  const paramsSchema = z.object({
    petId: z.string(),
  })

  const params = paramsSchema.parse(req.params)
  const body = bodySchema.parse(req.body)

  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new WhantToAdoptUseCase(petsRepository, orgsRepository)

  const resp = await useCase.execute({ ...body, ...params })

  if (resp.isLeft()) {
    const error = resp.value
    if (error instanceof ResourceNotFoundError) {
      res.status(404).send({ message: error.message })
    }
    res.send(400).send({ message: error.message })
  }

  if (resp.isRight()) {
    const { whatsapp } = resp.value
    res.status(200).send({ whatsapp })
  }

  res.status(500).send({ message: 'Internal server error.' })
}
