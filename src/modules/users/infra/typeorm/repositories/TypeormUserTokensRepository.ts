import { getRepository, Repository } from 'typeorm'

import { IUserTokensRepository, GenerateTokenDTO } from '@modules/users/application/repositories/IUserTokensRepository'
import { UserToken as UserTokenDB } from '../models'
import { UserToken } from '@modules/users/domain/entities'

export class TypeormUserTokensRepository implements IUserTokensRepository {
  private readonly ormRepository: Repository<UserTokenDB>

  constructor() {
    this.ormRepository = getRepository(UserTokenDB)
  }

  public async generate({ token, userId, expiresIn }: GenerateTokenDTO): Promise<UserToken> {
    let userToken = this.ormRepository.create({ userId, token, expiresIn })

    userToken = await this.ormRepository.save(userToken)

    return new UserToken(userToken)
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } })

    return userToken ? new UserToken(userToken) : undefined
  }

  public async expireToken (token: string): Promise<void> {
    const tokenDb = await this.ormRepository.findOne({ token })

    if (!tokenDb) return

    tokenDb.expiresIn = new Date()

    await this.ormRepository.save(tokenDb)
  }
}
