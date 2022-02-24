import {
  IUsersRepository,
  UsersRepositoryDTO
} from '@modules/users/application/repositories/IUsersRepository'
import { User, UserPartial, UserProps } from '@modules/users/domain/entities'
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination'
import { getRepository, Raw, Repository } from 'typeorm'
import { MapUser } from '../mapper/MapUser'
import { User as UserDb } from '../models/User'

export class TypeormUsersRepository implements IUsersRepository {
  private readonly ormRepository: Repository<UserDb>
  constructor() {
    this.ormRepository = getRepository(UserDb)
  }

  public async findAll({
    name,
    pagination: {
      skip,
      take
    }
  }: UsersRepositoryDTO.FindAll): Promise<PaginatedRepositoryResponse<User>> {
    const formattedName = name ? name.toLowerCase() : ''

    const [users, count] = await this.ormRepository.findAndCount({
      where: {
        name: Raw((alias) => `LOWER(${alias}) LIKE '%${formattedName}%'`)
      },
      order: { createdAt: 'DESC' },
      skip,
      take,
      relations: ['updatedByUser']
    })

    return {
      numberOfItens: count,
      itens: MapUser.mapMany(users)
    }
  }

  public async findById(id: string): Promise<User | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { id }
    })

    let user: User | undefined
    if (userData) {
      user = new User(userData as unknown as UserProps)
    }

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { email }
    })

    let user: User | undefined
    if (userData) {
      user = new User(userData as unknown as UserProps)
    }

    return user
  }

  public async save (userData: User): Promise<User> {
    const { updatedBy, ...dto } = userData.toDto()
    const userDb = this.ormRepository.create({
      ...dto,
      updatedBy: updatedBy?.id
    })

    await this.ormRepository.save(userDb)

    return new User(userDb as unknown as UserProps)
  }

  public async softDelete(userData: User, loggedUser: UserPartial): Promise<void> {
    const { updatedBy, ...dto } = userData.toDto()

    const userDb = this.ormRepository.create({
      ...dto,
      deletedBy: loggedUser.id,
      deletedAt: new Date()
    })

    await this.ormRepository.save(userDb)
  }
}
