import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FindPetUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/find-pet-use-case'
import { PrismaPetsRepository } from '@/infra/database/reposities/prisma-pet-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PetPresenter } from '../../presenters/pet-presenter'

export async function findPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id: petId } = paramsSchema.parse(req.params)

  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindPetUseCase(petsRepository)

  const resp = await useCase.execute({ petId })

  if (resp.isLeft()) {
    const error = resp.value
    if (error instanceof ResourceNotFoundError) {
      res.status(404).send({ message: error.message })
    }
    res.send(400).send({ message: error.message })
  }

  if (resp.isRight()) {
    const { pet } = resp.value
    res.status(200).send({ pet: PetPresenter.basic(pet) })
  }

  res.status(500).send({ message: 'Internal server error.' })
}
