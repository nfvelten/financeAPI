import { SoftDeleteUser } from '@modules/users/domain/features'
import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '../repositories'

export class SoftDeleteUserService implements SoftDeleteUser {
  constructor(
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ id, loggedUserId }: SoftDeleteUser.Input): Promise<void> {
    const loggedUser = await this.usersRepository.findById(loggedUserId)

    if (!loggedUser) {
      throw new AppError('Usuário logado não existe', 404)
    }

    const userToDelete = await this.usersRepository.findById(id)

    if (!userToDelete) {
      throw new AppError('Usuário não existe', 404)
    }

    if (userToDelete.toDto().role === 'super') {
      throw new AppError('Não é possível deletar o Super Usuário')
    }

    await this.usersRepository.softDelete(userToDelete, loggedUser.toPartial())
  }
}
