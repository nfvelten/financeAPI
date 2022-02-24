import { SystemParams } from '@shared/domain/entities'
import { PossibleRole } from '../entities/Role'
import { UserDto } from '../entities/User'

export interface CreateUser {
  execute: (data: CreateUser.Input) => Promise<CreateUser.Output>
}

export namespace CreateUser {
  export type Input = {
    userData: {
      name: string
      email: string
      role: PossibleRole
      position: string
      sendPasswordViaEmail: boolean
    }

    systemParams: SystemParams
  }

  export type Output = UserDto & {password?: string}
}
