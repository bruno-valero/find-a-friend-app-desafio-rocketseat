import { MakeFindPetUseCase } from 'tests/factories/make-use-cases/make-find-pet-use-case'
import { MakeRegisterOrgUseCase } from 'tests/factories/make-use-cases/make-register-org-use-case'
import { MakeRegisterPetUseCase } from 'tests/factories/make-use-cases/make-register-pet-use-case'

describe('find pet use case', () => {
  let registerOrg = MakeRegisterOrgUseCase()
  let registerPet = MakeRegisterPetUseCase({
    orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
  })
  let sut = MakeFindPetUseCase({
    petsRepositoryAlt: registerPet.dependencies.petsRepository,
  })

  beforeEach(() => {
    registerOrg = MakeRegisterOrgUseCase()
    registerPet = MakeRegisterPetUseCase({
      orgsRepositoryAlt: registerOrg.dependencies.orgsRepository,
    })
    sut = MakeFindPetUseCase({
      petsRepositoryAlt: registerPet.dependencies.petsRepository,
    })
  })
  it('should be able to find a pet', async () => {
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
      orgId: orgs[0].id.value,
      petId: pets[0].id.value,
    })

    expect(registerOrgResp.isRight()).toBeTruthy()
    expect(registerPetResp.isRight()).toBeTruthy()
    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          name: 'teste',
        }),
      }),
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
