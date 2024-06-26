import { Encoder } from '@/domain/find-a-friend/application/cryptography/encoder'
import { FastifyReply } from 'fastify'

export class FastifyJwtEncoder implements Encoder {
  constructor(private response: FastifyReply) {}

  encode(data: { sub: string }): Promise<string> {
    return this.response.jwtSign(data, { sign: data })
  }
}
