import { PossibleRole, UserDto } from '../entities'

export interface UpdateUser {
  execute: (data: UpdateUser.Input) => Promise<UpdateUser.Output>
}

export namespace UpdateUser {
  export type Input = {
    loggedUserId: string
    id: string
    role?: PossibleRole
    position?: string
    name?: string
    email?: string
  }

  export type Output = UserDto
}
