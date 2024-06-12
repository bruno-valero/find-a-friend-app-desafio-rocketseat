import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Address } from '@/domain/find-a-friend/enterprise/entities/value-objects/address'
import { PetCharacteristics } from '@/domain/find-a-friend/enterprise/entities/value-objects/pet-characteristics'
import { makePet } from 'tests/factories/make-entities/make-pet'
import { MakeFetchAllAdoptablePetUseCase } from 'tests/factories/make-use-cases/make-fetch-all-adoptable-pet-use-case'

describe('authenticate org use case', () => {
  let sut = MakeFetchAllAdoptablePetUseCase()

  beforeEach(() => {
    sut = MakeFetchAllAdoptablePetUseCase()
  })
  it('should be able to fetch orgs', async () => {
    for (let i = 1; i <= 25; i++) {
      await sut.dependencies.petsRepository.create(
        makePet({
          characteristics: new PetCharacteristics({
            isAdoptable: i > 13,
            color: 'amarelo',
            type: 'Canário',
            main: ['Cantante', 'Ativo'],
          }),
          address: new Address({
            cep: '00777955',
            city: 'teste',
            neighborhood: 'teste',
            number: '123',
            state: 'AP',
            street: 'teste',
          }),
          orgId: new UniqueEntityId('789'),
        }),
      )
    }

    const sutResp = await sut.useCase.execute({
      filters: {
        city: 'teste',
      },
      orgId: '789',
    })

    expect(sutResp.isRight()).toBeTruthy()
  })

  it('should not be able to fetch orgs without filter by city', async () => {
    for (let i = 1; i <= 25; i++) {
      await sut.dependencies.petsRepository.create(
        makePet({
          characteristics: new PetCharacteristics({
            isAdoptable: i > 13,
            color: 'amarelo',
            type: 'Canário',
            main: ['Cantante', 'Ativo'],
          }),
          address: new Address({
            cep: '00777955',
            city: 'teste',
            neighborhood: 'teste',
            number: '123',
            state: 'AP',
            street: 'teste',
          }),
          orgId: new UniqueEntityId('789'),
        }),
      )
    }

    const sutResp = await sut.useCase.execute({
      filters: {
        city: '',
      },
      orgId: '789',
    })

    expect(sutResp.value?.pets).toHaveLength(0)
  })
})
