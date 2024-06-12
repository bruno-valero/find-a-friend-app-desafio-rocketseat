import { app } from '@/infra/app'
import { prisma } from '@/infra/database/prisma'
import request from 'supertest'

describe('authenticate org controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate org', async () => {
    const createOrgRespResp = await request(app.server)
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

    const sutResp = await request(app.server).post('/sessions').send({
      email: 'bruno@gmail.com',
      password: '123',
    })

    const orgs = await prisma.org.findMany()

    expect(createOrgRespResp.statusCode).toEqual(201)
    expect(sutResp.statusCode).toEqual(200)
    expect(sutResp.body.token).toEqual(expect.any(String))
    expect(orgs).toHaveLength(1)
  })
})
