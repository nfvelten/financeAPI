import { IUserTokensRepository } from '@modules/users/application/repositories'
import { TypeormUserTokensRepository } from '@modules/users/infra/typeorm/repositories'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MakeUserToken {
  private static instance?: IUserTokensRepository

  static getInstance(): IUserTokensRepository {
    if (!this.instance) {
      this.instance = new TypeormUserTokensRepository()
    }

    return this.instance
  }
}
