import { Org } from '@/domain/find-a-friend/enterprise/entities/org'
import { Address } from '@/domain/find-a-friend/enterprise/entities/value-objects/address'
import { StatesShort } from '@/domain/find-a-friend/enterprise/entities/value-objects/state'
import { Whatsapp } from '@/domain/find-a-friend/enterprise/entities/value-objects/whatsapp'
import { faker } from '@faker-js/faker'

export function makeOrg(override?: Partial<Org>) {
  const states: StatesShort[] = [
    'AM',
    'PA',
    'RR',
    'AP',
    'AC',
    'RO',
    'TO',
    'MA',
    'PI',
    'CE',
    'RN',
    'PB',
    'PE',
    'AL',
    'SE',
    'BA',
    'MG',
    'ES',
    'RJ',
    'SP',
    'PR',
    'SC',
    'RS',
    'MS',
    'MT',
    'GO',
    'DF',
  ]
  const address = new Address({
    cep: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
    city: faker.location.city(),
    neighborhood: faker.lorem.sentence(2),
    number: faker.number.int({ min: 0, max: 10000 }),
    state: states[Math.floor(Math.random() * states.length)],
    street: faker.location.street(),
  })

  const whatsapp = new Whatsapp(
    faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
  )

  return Org.create({
    address,
    email: faker.internet.email(),
    name: faker.person.firstName(),
    password: faker.internet.password(),
    whatsapp,
    ...override,
  })
}
