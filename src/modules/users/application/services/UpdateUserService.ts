import { UpdateUser } from '@modules/users/domain/features'
import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '../repositories'

export class UpdateUserService implements UpdateUser {
  constructor(
    private readonly usersRepository: IUsersRepository
  ) {}

  public async execute({
    loggedUserId,
    id,
    name,
    email,
    position,
    role
  }: UpdateUser.Input): Promise<UpdateUser.Output> {
    const loggedUser = await this.usersRepository.findById(loggedUserId)

    if (!loggedUser) {
      throw new AppError('Usuário logado não existe', 404)
    }

    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('Usuário não existe', 404)
    }

    const updateUserData = {
      name: name ?? user.getName()
    }

    if (role) {
      if (user.toDto().role === 'super') {
        throw new AppError('Não é possível editar cargo do Super Usuário')
      }

      Object.assign(updateUserData, { role })
    }

    if (position) {
      Object.assign(updateUserData, { position })
    }

    if (email) {
      const sameEmail = await this.usersRepository.findByEmail(email)

      if (sameEmail && sameEmail.id !== user.id) {
        throw new AppError('Já existe outro usuário com esse email')
      }

      Object.assign(updateUserData, { email })
    }

    user.update(updateUserData, loggedUser.toPartial())

    await this.usersRepository.save(user)

    return user.toDto()
  }
}
