import { Encoder } from '@/domain/find-a-friend/application/cryptography/encoder'

export class FakeEncoder implements Encoder {
  async encode(data: Record<string, unknown>): Promise<string> {
    return (data.sub as string).concat('-encoded')
  }
}
