import { compare, hash } from 'bcryptjs'
import { IHashProvider } from '.'

export class BcryptHashProvider implements IHashProvider {
  async hash (toHash: string): Promise<string> {
    return hash(toHash, 8)
  }

  async compare (payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
