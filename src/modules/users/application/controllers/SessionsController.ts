import { Request, Response } from 'express'
import { CreateSessionsService } from '@modules/users/application/services'

export class SessionsController {
  constructor(private readonly createSessionsService: CreateSessionsService) {}

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const user = await this.createSessionsService.execute({
      email,
      password
    })

    return response.json(user)
  }
}
