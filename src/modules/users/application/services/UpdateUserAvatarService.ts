import { UpdateUserAvatar } from '@modules/users/domain/features/UpdateUserAvatar'
import { IStorageProvider } from '@shared/application/providers/StorageProvider'
import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '../repositories'

export class UpdateUserAvatarService implements UpdateUserAvatar {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly storageProvider: IStorageProvider
  ) {}

  public async execute({
    userId,
    avatarFilename
  }: UpdateUserAvatar.Input): Promise<UpdateUserAvatar.Output> {
    if (!avatarFilename.length) {
      throw new AppError('Erro ao obter o nome do arquivo')
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const currentAvatar = user.getAvatar()

    if (currentAvatar) {
      await this.storageProvider.delete({
        filename: currentAvatar,
        folder: 'avatar'
      })
    }

    await this.storageProvider.save({
      filename: avatarFilename,
      folder: 'avatar'
    })

    user.update({
      avatar: avatarFilename,
      avatarUrl: user.generateAvatarUrl(avatarFilename)
    }, user.toPartial())

    await this.usersRepository.save(user)

    return {
      avatarUrl: String(user.getAvatarUrl())
    }
  }
}
