import { FastifyInstance } from 'fastify'
import { authenticateOrgController } from '../controllers/orgs-controllers/authenticate-org-controllers'
import { registerOrgController } from '../controllers/orgs-controllers/register-org-controllers'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgController)
  app.post('/sessions', authenticateOrgController)
}
