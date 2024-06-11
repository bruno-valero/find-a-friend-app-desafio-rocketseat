import { MakeRegisterOrgUseCase } from 'tests/factories/make-use-cases/make-register-org-use-case'
import { MakeRegisterPetUseCase } from 'tests/factories/make-use-cases/make-register-pet-use-case'

describe('register pet use case', () => {
  let registerOrg = MakeRegisterOrgUseCase()
  let sut = MakeRegisterPetUseCase({
    orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
  })

  beforeEach(() => {
    registerOrg = MakeRegisterOrgUseCase()
    sut = MakeRegisterPetUseCase({
      orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
    })
  })
  it('should be able to register a pet', async () => {
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

    const orgs = await registerOrg.dependencies.orgsRepository.findMany()

    const sutResp = await sut.useCase.execute({
      name: 'teste',
      orgId: orgs[0].id.value,
      petCharacteristics: {
        color: 'dourado',
        isAdoptable: true,
        type: 'Cachorro',
        main: [
          'diurno',
          'dieta específica',
          'pode ser afetuoso',
          'pode ser treinado',
        ],
      },
    })

    const pets = await sut.dependencies.petsRepository.findMany(
      { city: orgs[0].address.city },
      orgs[0].id.value,
    )

    expect(registerOrgResp.isRight()).toBeTruthy()
    expect(sutResp.isRight()).toBeTruthy()
    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'teste',
        orgId: orgs[0].id,
      }),
    )
  })
  it('should not be able to register a pet if its not a valid org', async () => {
    const sutResp = await sut.useCase.execute({
      name: 'teste',
      orgId: '132',
      petCharacteristics: {
        color: 'dourado',
        isAdoptable: true,
        type: 'Cachorro',
        main: [
          'diurno',
          'dieta específica',
          'pode ser afetuoso',
          'pode ser treinado',
        ],
      },
    })

    expect(sutResp.isLeft()).toBeTruthy()
  })
})
