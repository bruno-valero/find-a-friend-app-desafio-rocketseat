import { FetchAllAdoptablePetsUseCase } from '@/domain/find-a-friend/application/use-cases/pets-use-cases/fetch-all-adoptable-pet-use-case'
import {
  characteristicsColorSchema,
  characteristicsMainSchema,
  characteristicsTypeSchema,
} from '@/domain/find-a-friend/enterprise/entities/value-objects/pet-characteristics'
import { PrismaPetsRepository } from '@/infra/database/reposities/prisma-pet-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PetPresenter } from '../../presenters/pet-presenter'

export async function fetchAllAdoptablePetsController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const querySchema = z.object({
    orgId: z.string().uuid().optional(),
    city: z.string(),
    mainCharacteristics: z
      .string()
      .transform((item) => item.split(','))
      .pipe(z.array(characteristicsMainSchema))
      .optional(),
    color: characteristicsColorSchema.optional(),
    type: characteristicsTypeSchema.optional(),
  })

  const { orgId, ...filters } = querySchema.parse(req.query)

  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchAllAdoptablePetsUseCase(petsRepository)

  const resp = await useCase.execute({ orgId, filters })

  if (resp.isLeft()) {
    res.send(400).send({ message: 'bad request' })
  }

  if (resp.isRight()) {
    const { pets } = resp.value
    res.status(200).send({ pets: pets.map(PetPresenter.basic) })
  }

  res.status(500).send({ message: 'Internal server error.' })
}
