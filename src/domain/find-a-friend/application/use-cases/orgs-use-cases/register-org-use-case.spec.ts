import { MakeRegisterOrgUseCase } from 'tests/factories/make-use-cases/make-register-org-use-case'

describe('register org use case', () => {
  let sut = MakeRegisterOrgUseCase()

  beforeEach(() => {
    sut = MakeRegisterOrgUseCase()
  })
  it('should be able to register a new org', async () => {
    const sutResp = await sut.useCase.execute({
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

    const orgs = await sut.dependencies.orgsRepository.findMany()

    expect(sutResp.isRight()).toBeTruthy()
    expect(orgs).toHaveLength(1)
    expect(orgs[0]).toEqual(
      expect.objectContaining({
        email: 'bruno@test.com',
        name: 'bruno',
      }),
    )
  })

  it('should not be able to register orgs with same email', async () => {
    const sutResp = await sut.useCase.execute({
      email: 'bruno1@test.com',
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

    const sutResp2 = await sut.useCase.execute({
      email: 'bruno1@test.com',
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

    const orgs = await sut.dependencies.orgsRepository.findMany()

    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp2.isLeft()).toBeTruthy()
    expect(orgs).toHaveLength(1)
    expect(orgs[0]).toEqual(
      expect.objectContaining({
        email: 'bruno1@test.com',
        name: 'bruno',
      }),
    )
  })
  it("should be able to hash a org' password on registration", async () => {
    const sutResp = await sut.useCase.execute({
      email: 'bruno2@test.com',
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

    const orgs = await sut.dependencies.orgsRepository.findMany()

    expect(sutResp.isRight()).toBeTruthy()
    expect(orgs).toHaveLength(1)
    expect(
      await sut.dependencies.encrypter.compare('123', orgs[0].password),
    ).toEqual(true)
  })
})
