import { DataValidationError } from '@/core/errors/errors/data-validation-error'
import { mask } from 'remask'

export class Whatsapp {
  private whatsapp: string

  constructor(whatsapp: string) {
    const whatsappRaw = whatsapp.replaceAll(/[a-zA-z\s\W-]+/gi, '')
    const whatsappLength = whatsappRaw.length
    const correctLength = '00900000000'.length
    if (whatsappLength !== correctLength)
      throw new DataValidationError(
        `whatsapp length must be ${correctLength}, but ${whatsappLength} characters was passed`,
      )
    this.whatsapp = whatsapp
  }

  get raw() {
    return this.whatsapp
  }

  get rawNumber() {
    return Number(this.whatsapp)
  }

  get format() {
    return mask(this.whatsapp, '(99) 9 9999-9999')
  }

  compare(whatsapp: Whatsapp) {
    return this.raw === whatsapp.raw
  }
}
