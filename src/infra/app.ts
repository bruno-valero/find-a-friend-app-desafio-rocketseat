import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { orgRoutes } from './http/routes/org-routes'
import { petRoutes } from './http/routes/pet-routes'
import { env } from '@/env/env'
import { ZodError } from 'zod'
import { DataValidationError } from '@/core/errors/errors/data-validation-error'

export const app = fastify()

app.register(fastifyJwt, {
  secret: {
    private: readFileSync(
      resolve(__dirname, '..', '..', 'keys', 'private_key.pem'),
      'utf8',
    ),
    public: readFileSync(
      resolve(__dirname, '..', '..', 'keys', 'public_key.pem'),
      'utf8',
    ),
  },
  sign: { algorithm: 'RS256' },
})

app.register(orgRoutes)
app.register(petRoutes, { prefix: '/pets' })

app.setErrorHandler((err, _req, res) => {
  if (env.NODE_ENV !== 'prod') {
    console.error(err)
  }
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error', issues: err.format() })
  }
  if (err instanceof DataValidationError) {
    return res
      .status(400)
      .send({ message: 'Validation error', issues: err.message })
  }
  return res.status(500).send({ message: 'Internal server error.' })
})
