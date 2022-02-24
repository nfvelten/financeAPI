import { IUsersRepository } from '@modules/users/application/repositories/IUsersRepository'
import { TypeormUsersRepository } from '@modules/users/infra/typeorm/repositories/TypeormUsersRepository'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MakeUser {
  private static instance?: IUsersRepository

  static getInstance(): IUsersRepository {
    if (!this.instance) {
      this.instance = new TypeormUsersRepository()
    }

    return this.instance
  }
}
