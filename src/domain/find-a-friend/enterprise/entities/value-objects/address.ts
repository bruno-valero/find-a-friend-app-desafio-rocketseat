import { Cep } from './cep'
import { State, StatesShort } from './state'

export interface AddressProps {
  cep: string
  number: string
  street: string
  neighborhood: string
  city: string
  state: StatesShort
}

export class Address {
  private _cep: Cep
  private _number: string
  private _street: string
  private _neighborhood: string
  private _city: string
  private _state: State

  constructor(props: AddressProps) {
    this._cep = new Cep(props.cep)
    this._number = props.number
    this._street = props.street
    this._neighborhood = props.neighborhood
    this._city = props.city
    this._state = new State(props.state)
  }

  get cep() {
    return this._cep
  }

  get number() {
    return this._number
  }

  get street() {
    return this._street
  }

  get neighborhood() {
    return this._neighborhood
  }

  get city() {
    return this._city
  }

  get state() {
    return this._state
  }

  get raw() {
    return {
      cep: this.cep.format,
      number: this.number,
      street: this.street,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state.short,
    }
  }

  get plainText() {
    const raw = this.raw
    return `${raw.street}, ${raw.number}, ${raw.neighborhood}, ${raw.city}-${raw.state}`
  }

  compare(address: Address) {
    const cepEqual = this.cep.compare(address.cep)
    const numberEqual = this.number === address.number
    const streetEqual = this.street === address.street
    const neighborhoodEqual = this.neighborhood === address.neighborhood
    const cityEqual = this.city === address.city
    const stateEqual = this.state.compare(address.state)

    const addressEqual =
      cepEqual &&
      numberEqual &&
      streetEqual &&
      neighborhoodEqual &&
      cityEqual &&
      stateEqual

    return addressEqual
  }
}
