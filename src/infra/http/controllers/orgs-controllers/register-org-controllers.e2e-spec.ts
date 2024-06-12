import { app } from '@/infra/app'
import { prisma } from '@/infra/database/prisma'
import request from 'supertest'

describe('register org controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new org', async () => {
    const sutResp = await request(app.server)
      .post('/orgs')
      .send({
        name: 'bruno',
        email: 'bruno@gmail.com',
        password: '123',
        address: {
          cep: '00444999',
          number: '987',
          street: 'reua teste',
          neighborhood: 'meu bairro',
          city: 'the daily planet',
          state: 'SP',
        },
        whatsapp: '11933337788',
      })

    const orgs = await prisma.org.findMany()

    expect(sutResp.statusCode).toEqual(201)
    expect(orgs).toHaveLength(1)
  })
})
