import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FindPetUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/find-pet-use-case'
import { PrismaPetsRepository } from '@/infra/database/reposities/prisma-pet-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function findPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const paramsSchema = z.object({
    petId: z.string(),
  })

  const params = paramsSchema.parse(req.params)

  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindPetUseCase(petsRepository)

  const resp = await useCase.execute({ ...params, orgId: req.user.sub })

  if (resp.isLeft()) {
    const error = resp.value
    if (error instanceof ResourceNotFoundError) {
      res.status(404).send({ message: error.message })
    }
    res.send(400).send({ message: error.message })
  }

  if (resp.isRight()) {
    const { pet } = resp.value
    res.status(200).send({ pet })
  }

  res.status(500).send({ message: 'Internal server error.' })
}
