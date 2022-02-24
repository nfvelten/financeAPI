import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import AppError from '@shared/errors/AppError'
import { authConfig } from '@modules/users/config/auth'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { UserPartial } from '@modules/users/domain/entities/User'

interface IRequest {
  email: string
  password: string
}

type UserResponse = UserPartial & {
  position: string
  avatarUrl?: string
}

type Response = {
  user: UserResponse
  token: string
}

export class CreateSessionsService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email)
    if (user === undefined) {
      throw new AppError('Incorrect email or password', 401)
    }

    const passwordConfirmed = await compare(password, user.getPassword())
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password', 401)
    }

    const { id, name, role, position } = user.toDto()
    const avatarUrl = user.getAvatarUrl()

    const token = sign({}, authConfig.jwt.secret, {
      subject: JSON.stringify({ id, role, name, email, position, avatarUrl }),
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      user: { id, name, email, role, position, avatarUrl },
      token
    }
  }
}
