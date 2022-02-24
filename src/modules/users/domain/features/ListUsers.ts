import { Pagintation } from '@shared/domain/dtos/Pagination'
import { UserDto } from '../entities'

export interface ListUsers {
  execute: (data: ListUsers.Input) => Promise<ListUsers.Output>
}

export namespace ListUsers {
  export type Input = {
    name?: string
    pagination: Pagintation
  }

  export type Output = {
    users: UserDto[]
    numberOfUsers: number
  }
}
