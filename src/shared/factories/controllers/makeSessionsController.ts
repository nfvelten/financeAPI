import { SessionsController } from '@modules/users/application/controllers'
import { CreateSessionsService } from '@modules/users/application/services'
import { MakeUser } from '../repositories/MakeUsers'

export function makeSessionsController(): SessionsController {
  const usersRepository = MakeUser.getInstance()
  const createSessionsService = new CreateSessionsService(usersRepository)
  return new SessionsController(createSessionsService)
}
