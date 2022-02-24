import { UpdateUserProfile } from '@modules/users/domain/features'
import { IHashProvider } from '@shared/application/providers'
import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '../repositories'

export class UpdateUserProfileService implements UpdateUserProfile {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    name,
    oldPassword,
    password
  }: UpdateUserProfile.Input): Promise<UpdateUserProfile.Output> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('Usuário não existe', 404)
    }

    const updateUserData = {
      name: name ?? user.getName()
    }

    if (oldPassword && password) {
      const isOldPasswordCorrect = await this.hashProvider.compare(oldPassword, user.getPassword())

      if (!isOldPasswordCorrect) {
        throw new AppError('Senha atual incorreta')
      }

      const hashedPassword = await this.hashProvider.hash(password)

      Object.assign(updateUserData, { password: hashedPassword })
    }

    user.update(updateUserData, user.toPartial())

    await this.usersRepository.save(user)

    return user.toDto()
  }
}
