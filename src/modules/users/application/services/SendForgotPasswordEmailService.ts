import path from 'path'
import { randomUUID } from 'crypto'

import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IMailProvider } from '@shared/application/providers/MailProvider/IMailProvider'
import { IUserTokensRepository } from '../repositories'
import env from '@config/env'
import { SendForgotPasswordEmail } from '@modules/users/domain/features'

export class SendForgotPasswordEmailService implements SendForgotPasswordEmail {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly mailProvider: IMailProvider,
    private readonly userTokensRepository: IUserTokensRepository
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('User does not exists')

    const now = new Date()
    const expiresIn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 3, now.getMinutes())
    const userToken = await this.userTokensRepository.generate({ userId: user.id, token: randomUUID(), expiresIn })

    const forgotPasswordTemplateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        email: user.getEmail(),
        name: user.getName()
      },
      subject: '[CAP] Recuperação de senha',
      template: {
        file: forgotPasswordTemplateFile,
        variables: {
          name: user.getName(),
          link: `${env.webUrl}/reset_password?token=${userToken.getToken()}`
        }
      }
    })
  }
}
