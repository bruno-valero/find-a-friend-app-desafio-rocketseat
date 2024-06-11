import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { RegisterOrgUseCase } from '@/domain/find-a-friend/application/use-cases/orgs-use-cases/register-org-use-case'
import { BcryptEncrypter } from '@/infra/auth/cryptography/bcrypt-encrypter'
import { PrismaOrgsRepository } from '@/infra/database/reposities/prisma-orgs-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerOrgController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    address: z.object({
      cep: z.string(),
      number: z.string(),
      street: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.enum([
        'AM',
        'PA',
        'RR',
        'AP',
        'AC',
        'RO',
        'TO',
        'MA',
        'PI',
        'CE',
        'RN',
        'PB',
        'PE',
        'AL',
        'SE',
        'BA',
        'MG',
        'ES',
        'RJ',
        'SP',
        'PR',
        'SC',
        'RS',
        'MS',
        'MT',
        'GO',
        'DF',
      ]),
    }),
    whatsapp: z.string(),
  })

  const body = bodySchema.parse(req.body)

  const orgsRepository = new PrismaOrgsRepository()
  const encrypter = new BcryptEncrypter()
  const useCase = new RegisterOrgUseCase(orgsRepository, encrypter)

  const resp = await useCase.execute(body)

  if (resp.isLeft()) {
    const error = resp.value
    if (error instanceof UserAlreadyExistsError) {
      res.status(409).send({ message: error.message })
    }
    res.send(400).send({ message: error.message })
  }

  if (resp.isRight()) {
    res.status(201).send()
  }

  res.status(500).send({ message: 'Internal server error.' })
}
