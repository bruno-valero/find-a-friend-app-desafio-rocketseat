import { app } from '@/infra/app'
import { prisma } from '@/infra/database/prisma'
import request from 'supertest'

describe('register pet controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
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

    const authOrgResp = await request(app.server).post('/sessions').send({
      email: 'bruno@gmail.com',
      password: '123',
    })

    const token = authOrgResp.body.token
    const orgs = await prisma.org.findMany()
    const orgId = orgs[0].id

    const sutResp = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orgId,
        name: 'cat',
        petCharacteristics: {
          main: ['diurno', 'Inteligente', 'ativo'],
          color: 'preto',
          type: 'Gato',
          isAdoptable: true,
        },
      })

    expect(createOrgRespResp.statusCode).toEqual(201)
    expect(authOrgResp.statusCode).toEqual(200)
    expect(sutResp.statusCode).toEqual(201)
    expect(orgs).toHaveLength(1)
  })
})
