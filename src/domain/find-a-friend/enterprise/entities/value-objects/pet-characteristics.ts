import z from 'zod'

export const characteristicsMainSchema = z.enum([
  'Leal',
  'brincalhão',
  'necessita de exercício regular',
  'Independente',
  'limpo',
  'pode ser afetuoso',
  'Relativamente fácil de cuidar',
  'silencioso',
  'Pode ser cantante',
  'requer interação',
  'tamanho pequeno',
  'Pequeno',
  'atividade noturna',
  'vive em gaiolas',
  'requer rodinha para exercício',
  'Sociável',
  'requer ambiente específico',
  'tamanho médio',
  'Longa expectativa de vida',
  'fácil de cuidar',
  'Requer habitat específico',
  'venenoso',
  'Ativo',
  'curioso',
  'necessita de espaço para brincar',
  'noturno',
  'pode ser treinado',
  'Variedade de espécies',
  'dieta específica',
  'Diversidade de espécies',
  'não venenoso',
  'terrestre',
  'pode ser treinado para falar',
  'diurno',
  'Inteligente',
  'requer interação social',
  'requer estimulação',
  'Cantante',
  'relativamente fácil de cuidar',
  'ativo',
  'necessita de ambiente com espaço para cavar',
  'Aquático',
  'sensível à qualidade da água',
  'Silenciosa',
])

export const characteristicsColorSchema = z.enum([
  'preto',
  'marrom',
  'branco',
  'cinza',
  'amarelo',
  'listrado',
  'laranja',
  'vermelho',
  'verde',
  'azul',
  'dourado',
])

export const characteristicsTypeSchema = z.enum([
  'Cachorro',
  'Gato',
  'Peixe',
  'Pássaro',
  'Hamster',
  'Coelho',
  'Tartaruga',
  'Porquinho-da-índia',
  'Cobra',
  'Furão',
  'Chinchila',
  'Rato',
  'Lagarto',
  'Ouriço',
  'Aranha',
  'Sapo',
  'Periquito',
  'Papagaio',
  'Canário',
  'Gerbil',
  'Axolote',
  'Tarântula',
])

interface Characteristics {
  main: z.infer<typeof characteristicsMainSchema>
  color: z.infer<typeof characteristicsColorSchema>
  type: z.infer<typeof characteristicsTypeSchema>
}

export interface PetCharacteristicsProps {
  main: Characteristics['main'][]
  color: Characteristics['color']
  type: Characteristics['type']
  isAdoptable: boolean
}

export class PetCharacteristics {
  private _main: Characteristics['main'][]
  private _color: Characteristics['color']
  private _type: Characteristics['type']
  private _isAdoptable: boolean

  constructor(props: PetCharacteristicsProps) {
    this._main = props.main
    this._color = props.color
    this._type = props.type
    this._isAdoptable = props.isAdoptable
  }

  get main() {
    return this._main
  }

  get color() {
    return this._color
  }

  get type() {
    return this._type
  }

  get isAdoptable() {
    return this._isAdoptable
  }

  someIsInMain(main: PetCharacteristics['main']) {
    return this.main.some((item) => main.includes(item))
  }

  everyIsInMain(main: PetCharacteristics['main']) {
    return this.main.every((item) => main.includes(item))
  }

  isColorEqual(color: PetCharacteristics['color']) {
    return this.color === color
  }

  isTypeEqual(type: PetCharacteristics['type']) {
    return this.type === type
  }

  compare(char: PetCharacteristics) {
    const mainEqual = this.main.every((item) => char.main.includes(item))
    const colorEqual = this.color === char.color
    const typeEqual = this.type === char.type
    const isAdoptableEqual = this.isAdoptable === char.isAdoptable

    const charEqual = mainEqual && colorEqual && typeEqual && isAdoptableEqual

    return charEqual
  }
}
