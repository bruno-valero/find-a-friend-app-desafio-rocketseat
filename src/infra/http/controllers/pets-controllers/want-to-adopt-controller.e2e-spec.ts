import { PetCharacteristics } from '@/domain/find-a-friend/enterprise/entities/value-objects/pet-characteristics'
import { Whatsapp } from '@/domain/find-a-friend/enterprise/entities/value-objects/whatsapp'
import { app } from '@/infra/app'
import { prisma } from '@/infra/database/prisma'
import request from 'supertest'

describe('want to adopt controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to send the respective org whatsapp when a user wants to adopt a pet', async () => {
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

    type Charachteristics = {
      main?: PetCharacteristics['main']
      type?: PetCharacteristics['type']
      color?: PetCharacteristics['color']
      isAdoptable: boolean
    }

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orgId,
        name: 'cat',
        petCharacteristics: <Charachteristics>{
          main: ['diurno', 'Inteligente', 'ativo'],
          color: 'preto',
          type: 'Gato',
          isAdoptable: true,
        },
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orgId,
        name: 'oi',
        petCharacteristics: <Charachteristics>{
          main: ['Independente', 'limpo', 'Leal'],
          color: 'preto',
          type: 'Coelho',
          isAdoptable: true,
        },
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orgId,
        name: 'oi',
        petCharacteristics: <Charachteristics>{
          main: ['Aquático', 'Pequeno', 'Ativo', 'requer ambiente específico'],
          color: 'preto',
          type: 'Peixe',
          isAdoptable: true,
        },
      })

    const pets = await prisma.pet.findMany({ where: { type: 'Peixe' } })

    const petId = pets[0].id

    const sutResp = await request(app.server).get(`/pets/adopt/${petId}`).send()

    expect(createOrgRespResp.statusCode).toEqual(201)
    expect(authOrgResp.statusCode).toEqual(200)
    expect(sutResp.statusCode).toEqual(200)
    expect(sutResp.body.whatsapp).toEqual(new Whatsapp('11933337788').format)
    expect(orgs).toHaveLength(1)
  })
})
