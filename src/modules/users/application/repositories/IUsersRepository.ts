import { UserPartial, User } from '@modules/users/domain/entities'
import { PaginatedRepositoryResponse, Pagintation } from '@shared/domain/dtos/Pagination'

export interface IUsersRepository {
  findAll: (data: UsersRepositoryDTO.FindAll) => Promise<PaginatedRepositoryResponse<User>>
  findById: (email: string) => Promise<User| undefined>
  findByEmail: (email: string) => Promise<User| undefined>
  /**
   * save user in database
   */
  save: (userData: User) => Promise<User>
  softDelete: (userData: User, loggedUser: UserPartial) => Promise<void>
}

export namespace UsersRepositoryDTO {
  export type FindAll = {
    name?: string
    pagination: Pagintation
  }
}
