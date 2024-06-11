import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Pet } from '@/domain/find-a-friend/enterprise/entities/pet'
import { Address } from '@/domain/find-a-friend/enterprise/entities/value-objects/address'
import { PetCharacteristics } from '@/domain/find-a-friend/enterprise/entities/value-objects/pet-characteristics'
import { Pet as PrismaPet } from '@prisma/client'

const PetMainChars: Record<string, PetCharacteristics['main'][0]> = {
  Leal: 'Leal',
  brincalhao: 'brincalhão',
  necessita_de_exercicio_regular: 'necessita de exercício regular',
  Independente: 'Independente',
  limpo: 'limpo',
  pode_ser_afetuoso: 'pode ser afetuoso',
  Relativamente_facil_de_cuidar: 'Relativamente fácil de cuidar',
  silencioso: 'silencioso',
  Pode_ser_cantante: 'Pode ser cantante',
  requer_interacao: 'requer interação',
  tamanho_pequeno: 'tamanho pequeno',
  Pequeno: 'Pequeno',
  atividade_noturna: 'atividade noturna',
  vive_em_gaiolas: 'vive em gaiolas',
  requer_rodinha_para_exercicio: 'requer rodinha para exercício',
  Sociavel: 'Sociável',
  requer_ambiente_especifico: 'requer ambiente específico',
  tamanho_medio: 'tamanho médio',
  Longa_expectativa_de_vida: 'Longa expectativa de vida',
  facil_de_cuidar: 'fácil de cuidar',
  Requer_habitat_especifico: 'Requer habitat específico',
  venenoso: 'venenoso',
  Ativo: 'Ativo',
  curioso: 'curioso',
  necessita_de_espaco_para_brincar: 'necessita de espaço para brincar',
  noturno: 'noturno',
  pode_ser_treinado: 'pode ser treinado',
  Variedade_de_especies: 'Variedade de espécies',
  dieta_especifica: 'dieta específica',
  Diversidade_de_especies: 'Diversidade de espécies',
  nao_venenoso: 'não venenoso',
  terrestre: 'terrestre',
  pode_ser_treinado_para_falar: 'pode ser treinado para falar',
  diurno: 'diurno',
  Inteligente: 'Inteligente',
  requer_interacao_social: 'requer interação social',
  requer_estimulacao: 'requer estimulação',
  Cantante: 'Cantante',
  relativamente_facil_de_cuidar: 'relativamente fácil de cuidar',
  ativo: 'ativo',
  necessita_de_ambiente_com_espaco_para_cavar:
    'necessita de ambiente com espaço para cavar',
  Aquatico: 'Aquático',
  sensivel_a_qualidade_da_agua: 'sensível à qualidade da água',
  Silenciosa: 'Silenciosa',
}

const colors: Record<string, PetCharacteristics['color']> = {
  preto: 'preto',
  marrom: 'marrom',
  branco: 'branco',
  cinza: 'cinza',
  amarelo: 'amarelo',
  listrado: 'listrado',
  laranja: 'laranja',
  vermelho: 'vermelho',
  verde: 'verde',
  azul: 'azul',
  dourado: 'dourado',
}

const type: Record<string, PetCharacteristics['type']> = {
  Cachorro: 'Cachorro',
  Gato: 'Gato',
  Peixe: 'Peixe',
  Passaro: 'Pássaro',
  Hamster: 'Hamster',
  Coelho: 'Coelho',
  Tartaruga: 'Tartaruga',
  Porquinho_da_india: 'Porquinho-da-índia',
  Cobra: 'Cobra',
  Furao: 'Furão',
  Chinchila: 'Chinchila',
  Rato: 'Rato',
  Lagarto: 'Lagarto',
  Ourico: 'Ouriço',
  Aranha: 'Aranha',
  Sapo: 'Sapo',
  Periquito: 'Periquito',
  Papagaio: 'Papagaio',
  Canario: 'Canário',
  Gerbil: 'Gerbil',
  Axolote: 'Axolote',
  Tarantula: 'Tarântula',
}

export const allPetCharacteristicsMains = Object.values(PetMainChars)
export const allPetCharacteristicsColors = Object.values(colors)
export const allPetCharacteristicsTypes = Object.values(type)

function inverseMapDict<T>(text: string, dict: Record<string, string>): T {
  const inverseDict = Object.entries(dict).reduce(
    (acc: Record<string, T>, item) => {
      acc[item[1]] = item[0] as T
      return acc
    },
    {},
  )

  return inverseDict[text]
}

export class PrismaPetMapper {
  static toDomain(pet: PrismaPet): Pet {
    const address = new Address({
      cep: pet.cep,
      city: pet.city,
      neighborhood: pet.neighborhood,
      number: pet.number,
      state: pet.state,
      street: pet.street,
    })

    const characteristics = new PetCharacteristics({
      color: colors[pet.color],
      type: type[pet.type],
      main: pet.mainCharacteristics.map((item) => PetMainChars[item]),
      isAdoptable: pet.isAdoptable,
    })

    const newPet = Pet.create(
      {
        address,
        characteristics,
        name: pet.name,
        orgId: new UniqueEntityId(pet.orgId),
        createdAt: pet.createdAt,
        updatedAt: pet.updatedAt,
      },
      new UniqueEntityId(pet.id),
    )

    return newPet
  }

  static mapColorsToPrisma(char: PetCharacteristics['color']) {
    return inverseMapDict<PrismaPet['color']>(char, colors)
  }

  static mapTypesToPrisma(char: PetCharacteristics['type']) {
    return inverseMapDict<PrismaPet['type']>(char, type)
  }

  static mapMainsToPrisma(char: PetCharacteristics['main']) {
    return char.map((item) =>
      inverseMapDict<PrismaPet['mainCharacteristics'][0]>(item, PetMainChars),
    )
  }

  static domainToPrisma(pet: Pet): PrismaPet {
    const newPet: PrismaPet = {
      id: pet.id.value,
      orgId: pet.orgId.value,
      name: pet.name,
      cep: pet.address.cep.raw,
      city: pet.address.city,
      neighborhood: pet.address.neighborhood,
      number: pet.address.number,
      state: pet.address.state.short,
      street: pet.address.street,
      color: inverseMapDict<PrismaPet['color']>(
        pet.characteristics.color,
        colors,
      ),
      mainCharacteristics: pet.characteristics.main.map((item) =>
        inverseMapDict<PrismaPet['mainCharacteristics'][0]>(item, PetMainChars),
      ),
      type: inverseMapDict<PrismaPet['type']>(pet.characteristics.type, type),
      isAdoptable: pet.characteristics.isAdoptable,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
    }

    return newPet
  }
}
