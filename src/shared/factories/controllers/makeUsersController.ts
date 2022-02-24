import { UsersController } from '@modules/users/application/controllers'
import {
  CreateUserService,
  ListUsersService,
  UpdateUserService,
  UpdateUserProfileService
} from '@modules/users/application/services'
import { SoftDeleteUserService } from '@modules/users/application/services/SoftDeleteUserService'
import { BcryptHashProvider } from '@shared/application/providers'
import { MakeMailProvider } from '../providers/MakeMailProvider'
import { MakeUser } from '../repositories'

export const makeUsersController = (): UsersController => {
  const usersRepository = MakeUser.getInstance()
  const mailProvider = MakeMailProvider.getInstance()
  const hashProvider = new BcryptHashProvider()

  const createUser = new CreateUserService(usersRepository, hashProvider, mailProvider)
  const listUsers = new ListUsersService(usersRepository)
  const updateUser = new UpdateUserService(usersRepository)
  const updateUserProfile = new UpdateUserProfileService(usersRepository, hashProvider)
  const softDeleteUser = new SoftDeleteUserService(usersRepository)

  return new UsersController(
    createUser,
    listUsers,
    updateUser,
    updateUserProfile,
    softDeleteUser
  )
}
