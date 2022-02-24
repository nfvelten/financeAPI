import { CreateUser, ListUsers, SoftDeleteUser, UpdateUser, UpdateUserProfile } from '@modules/users/domain/features'
import { PaginationResponse } from '@shared/application/dtos/PaginationResponse'
import { Request, Response } from 'express'

type GetQuery = {
  skip: string
  take: string
  name?: string
}

type UserResponse = {
  id: string
  name: string
  email: string
  role: string
  position: string
  created?: {
    date: number
  }
  updated?: {
    by: string
    date: number
  }
}

type UsersResponse = PaginationResponse<{
  users: UserResponse[]
}>

export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly listUser: ListUsers,
    private readonly updateUser: UpdateUser,
    private readonly updateUserProfile: UpdateUserProfile,
    private readonly softDeleteUser: SoftDeleteUser
  ) {}

  public async index(req: Request<any, any, any, GetQuery>, res: Response<UsersResponse>): Promise<Response> {
    const take = Number(req.query.take)
    const skip = Number(req.query.skip)

    const { name } = req.query

    const { users, numberOfUsers } = await this.listUser.execute({ name, pagination: { skip, take } })

    const pagination: UsersResponse = {
      numberOfRegisters: numberOfUsers,
      numberOfPages: Math.ceil(numberOfUsers / take),
      users: users.map(u => {
        const created = {
          date: u.createdAt.getTime()
        }

        let updated
        if (u.updatedBy && u.updatedAt) {
          updated = {
            by: u.updatedBy.name,
            date: u.updatedAt.getTime()
          }
        }

        return {
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          position: u.position,
          created,
          updated
        }
      })
    }

    return res.json(pagination)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, sendPasswordViaEmail, role, position } = request.body

    const { password } = await this.createUser.execute({
      userData: {
        name,
        email,
        sendPasswordViaEmail,
        role,
        position
      },
      systemParams: { userId: request.user.id }
    })

    return response.json({ email, password })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: loggedUserId } = request.user
    const { id } = request.params

    const {
      name,
      email,
      role,
      position
    } = request.body

    const user = await this.updateUser.execute({
      loggedUserId,
      id,
      name,
      email,
      role,
      position
    })

    return response.json({
      id: user.id,
      name: user.name,
      email,
      position
    })
  }

  public async updateProfile(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const {
      name,
      oldPassword,
      password
    } = request.body

    const user = await this.updateUserProfile.execute({
      id,
      name,
      oldPassword,
      password
    })

    return response.json({
      id: user.id,
      name: user.name
    })
  }

  public async softDelete(request: Request, response: Response): Promise<Response> {
    const { id: loggedUserId } = request.user
    const { id } = request.params

    await this.softDeleteUser.execute({
      id,
      loggedUserId
    })

    return response.status(204).send()
  }
}
