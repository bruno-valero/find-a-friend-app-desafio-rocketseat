import { Pet } from '@/domain/find-a-friend/enterprise/entities/pet'

export class PetPresenter {
  static basic(pet: Pet) {
    return {
      name: pet.name,
      orgId: pet.orgId.value,
      color: pet.characteristics.color,
      type: pet.characteristics.type,
      details: pet.characteristics.main,
    }
  }
}
