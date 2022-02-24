import { ListUsers } from '@modules/users/domain/features'
import { IUsersRepository } from '../repositories'

export class ListUsersService implements ListUsers {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ name, pagination }: ListUsers.Input): Promise<ListUsers.Output> {
    const { itens, numberOfItens } = await this.usersRepository.findAll({
      name, pagination
    })

    return {
      users: itens.map(i => i.toDto()),
      numberOfUsers: numberOfItens
    }
  }
}
