import { UserDto } from '../entities'

export interface UpdateUserProfile {
  execute: (data: UpdateUserProfile.Input) => Promise<UpdateUserProfile.Output>
}

export namespace UpdateUserProfile {
  export type Input = {
    id: string
    name?: string
    oldPassword?: string
    password?: string
  }

  export type Output = UserDto
}
