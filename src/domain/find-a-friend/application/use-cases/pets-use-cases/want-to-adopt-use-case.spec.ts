import { MakeRegisterOrgUseCase } from 'tests/factories/make-use-cases/make-register-org-use-case'
import { MakeRegisterPetUseCase } from 'tests/factories/make-use-cases/make-register-pet-use-case'
import { MakeWantToAdoptUseCase } from 'tests/factories/make-use-cases/wat-to-adopt-use-case'

describe('want to adopt use case', () => {
  let registerOrg = MakeRegisterOrgUseCase()
  let registerPet = MakeRegisterPetUseCase({
    orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
  })
  let sut = MakeWantToAdoptUseCase({
    orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
    petsRepositoryAlt: registerPet.dependencies.petsRepository,
  })

  beforeEach(() => {
    registerOrg = MakeRegisterOrgUseCase()
    registerPet = MakeRegisterPetUseCase({
      orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
    })
    sut = MakeWantToAdoptUseCase({
      orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
      petsRepositoryAlt: registerPet.dependencies.petsRepository,
    })
  })
  it('should be able to send the respective org whatsapp when a user wants to adopt a pet', async () => {
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

    const registerPetResp = await registerPet.useCase.execute({
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

    const sutResp = await sut.useCase.execute({
      petId: pets[0].id.value,
    })

    expect(registerOrgResp.isRight()).toBeTruthy()
    expect(registerPetResp.isRight()).toBeTruthy()
    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value).toEqual(
      expect.objectContaining({ whatsapp: expect.any(String) }),
    )
    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'teste',
        orgId: orgs[0].id,
      }),
    )
  })
})
