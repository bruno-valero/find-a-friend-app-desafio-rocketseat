import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { orgRoutes } from './http/routes/org-routes'
import { petRoutes } from './http/routes/pet-routes'

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
