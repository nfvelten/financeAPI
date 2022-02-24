
import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IUserTokensRepository } from '../repositories'
import { ResetPassword } from '@modules/users/domain/features'
import { IHashProvider } from '@shared/application/providers'

export class ResetPasswordService implements ResetPassword {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly userTokensRepository: IUserTokensRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute(token: string, password: string): Promise<void> {
    if (password.length < 6) throw new AppError('Senha deve conter no mínimo 6 dígitos')

    const userToken = await this.userTokensRepository.findByToken(token)
    if (!userToken) throw new AppError('Token not found')

    const user = await this.usersRepository.findById(userToken.getUserId())
    if (!user) throw new AppError('User not found')

    const now = Number(new Date())
    const expiration = Number(userToken.getExpiration())

    if (now > expiration) {
      throw new AppError('Token expired.')
    }

    const hash = await this.hashProvider.hash(password)
    user.setPassword(hash)

    await this.usersRepository.save(user)

    await this.userTokensRepository.expireToken(userToken.getToken())
  }
}
