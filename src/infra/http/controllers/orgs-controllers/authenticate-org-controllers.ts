import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'
import { AuthenticateOrgUseCase } from '@/domain/find-a-friend/application/use-cases/orgs-use-cases/authenticate-org-use-case'
import { BcryptEncrypter } from '@/infra/auth/cryptography/bcrypt-encrypter'
import { FastifyJwtEncoder } from '@/infra/auth/cryptography/fastify-jwt-encoder'
import { PrismaOrgsRepository } from '@/infra/database/reposities/prisma-orgs-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticateOrgController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const body = bodySchema.parse(req.body)

  const orgsRepository = new PrismaOrgsRepository()
  const encrypter = new BcryptEncrypter()
  const encoder = new FastifyJwtEncoder(res)
  const useCase = new AuthenticateOrgUseCase(orgsRepository, encrypter, encoder)

  const resp = await useCase.execute(body)

  if (resp.isLeft()) {
    const error = resp.value
    if (error instanceof UnauthorizedError) {
      res.status(401).send({ message: error.message })
    }
    res.send(400).send({ message: error.message })
  }

  if (resp.isRight()) {
    const { token } = resp.value
    res.status(200).send({ token })
  }

  res.status(500).send({ message: 'Internal server error.' })
}
