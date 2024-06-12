import { FastifyInstance } from 'fastify'
import { fetchAllAdoptablePetsController } from '../controllers/pets-controllers/fetch-all-adoptable-pets-controller'
import { registerPetController } from '../controllers/pets-controllers/register-pet-controller'
import { wantToAdoptController } from '../controllers/pets-controllers/want-to-adopt-controller'
import { findPetController } from '../controllers/pets-controllers/find-pet-controller'
import { jwtVerify } from '../middlewares/jwt-verify'

export async function petRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [jwtVerify] }, registerPetController)
  app.get('/', fetchAllAdoptablePetsController)
  app.get('/:id', findPetController)
  app.get('/adopt/:id', wantToAdoptController)
}
