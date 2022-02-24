import AppError from '@shared/errors/AppError'
import { CreateUser } from '@modules/users/domain/features/CreateUser'
import { User } from '@modules/users/domain/entities/User'
import { IHashProvider } from '@shared/application/providers'
import { IUsersRepository } from '../repositories/IUsersRepository'
import path from 'path/posix'
import { IMailProvider } from '@shared/application/providers/MailProvider/IMailProvider'
import env from '@config/env'

export class CreateUserService implements CreateUser {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider,
    private readonly mailProvider: IMailProvider
  ) {}

  public async execute({ userData, systemParams }: CreateUser.Input): Promise<CreateUser.Output> {
    const emailExists = await this.usersRepository.findByEmail(userData.email)
    if (emailExists) {
      throw new AppError('Email já cadastrado')
    }

    // string with with 6 numbers (between 100000 and 999999)
    // Based on Math.floor(Math.random() * (max - min + 1) + min)
    const tmpPassword = `${Math.floor(Math.random() * 900000 + 100000)}`
    const hashedPassword = await this.hashProvider.hash(tmpPassword)

    let user = new User({
      password: hashedPassword,
      email: userData.email,
      createdBy: systemParams.userId,
      name: userData.name,
      role: userData.role,
      position: userData.position
    })

    user = await this.usersRepository.save(user)

    if (userData.sendPasswordViaEmail) {
      const passwordViaEmailTemplateFile = path.resolve(
        __dirname,
        '..',
        'views',
        'password_via_email.hbs'
      )

      await this.mailProvider.sendMail({
        to: {
          email: user.getEmail(),
          name: user.getName()
        },
        subject: '[CAP] Cadastro no Dashboard',
        template: {
          file: passwordViaEmailTemplateFile,
          variables: {
            name: user.getName(),
            role: userData.role === 'admin' ? 'administrador' : 'editor',
            link: `${env.webUrl}/dashboard/login`,
            email: user.getEmail(),
            password: tmpPassword

          }
        }
      })
    }

    return {
      ...user.toDto(),
      password: tmpPassword
    }
  }
}
