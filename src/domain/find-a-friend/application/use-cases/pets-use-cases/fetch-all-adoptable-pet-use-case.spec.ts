import { MakeFetchAllAdoptablePetUseCase } from 'tests/factories/make-use-cases/make-fetch-all-adoptable-pet-use-case'

describe('authenticate org use case', () => {
  let sut = MakeFetchAllAdoptablePetUseCase()

  beforeEach(() => {
    sut = MakeFetchAllAdoptablePetUseCase()
  })
  it('should be able to authenticate an org', async () => {
    const sutResp = await sut.useCase.execute({
      filters: {
        city: '',
      },
      orgId: '',
    })

    expect(sutResp.isRight()).toBeTruthy()
  })
})
