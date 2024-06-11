import { MakeAuthenticateOrgUseCase } from 'tests/factories/make-use-cases/make-authenticate-org-use-case'
import { MakeRegisterOrgUseCase } from 'tests/factories/make-use-cases/make-register-org-use-case'

describe('authenticate org use case', () => {
  let registerOrg = MakeRegisterOrgUseCase()
  let sut = MakeAuthenticateOrgUseCase({
    orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
  })

  beforeEach(() => {
    registerOrg = MakeRegisterOrgUseCase()
    sut = MakeAuthenticateOrgUseCase({
      orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
    })
  })
  it('should be able to authenticate an org', async () => {
    const registerOrgResp = await registerOrg.useCase.execute({
      email: 'bruno@test.com',
      name: 'bruno',
      password: '123',
      whatsapp: '11900999922',
      address: {
        cep: '00111555',
        city: 'test',
        neighborhood: 'meu bairro',
        number: '123',
        state: 'SP',
        street: 'minha rua',
      },
    })

    const sutResp = await sut.useCase.execute({
      email: 'bruno@test.com',
      password: '123',
    })

    const orgs = await sut.dependencies.orgsRepository.findMany()

    expect(registerOrgResp.isRight()).toBeTruthy()
    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value).toEqual({
      token: expect.any(String),
    })
    expect(orgs).toHaveLength(1)
  })

  it('should not be able to authenticate an org with wrong email', async () => {
    const registerOrgResp = await registerOrg.useCase.execute({
      email: 'bruno@test.com',
      name: 'bruno',
      password: '123',
      whatsapp: '11900999922',
      address: {
        cep: '00111555',
        city: 'test',
        neighborhood: 'meu bairro',
        number: '123',
        state: 'SP',
        street: 'minha rua',
      },
    })

    const sutResp = await sut.useCase.execute({
      email: 'bruno1@test.com',
      password: '123',
    })

    const orgs = await sut.dependencies.orgsRepository.findMany()

    expect(registerOrgResp.isRight()).toBeTruthy()
    expect(sutResp.isLeft()).toBeTruthy()
    expect(orgs).toHaveLength(1)
  })

  it('should not be able to authenticate an org with wrong password', async () => {
    const registerOrgResp = await registerOrg.useCase.execute({
      email: 'bruno@test.com',
      name: 'bruno',
      password: '123',
      whatsapp: '11900999922',
      address: {
        cep: '00111555',
        city: 'test',
        neighborhood: 'meu bairro',
        number: '123',
        state: 'SP',
        street: 'minha rua',
      },
    })

    const sutResp = await sut.useCase.execute({
      email: 'bruno@test.com',
      password: '1234',
    })

    const orgs = await sut.dependencies.orgsRepository.findMany()

    expect(registerOrgResp.isRight()).toBeTruthy()
    expect(sutResp.isLeft()).toBeTruthy()
    expect(orgs).toHaveLength(1)
  })
})
