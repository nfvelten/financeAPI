import { PossibleRole, User, UserPartial } from '@modules/users/domain/entities'
import { User as UserDb } from '../models/User'

export class MapUser {
  static mapOne({ updatedByUser, ...userDb }: UserDb): User {
    let updatedByPartial: UserPartial | undefined
    if (updatedByUser) {
      updatedByPartial = {
        email: updatedByUser.email,
        id: updatedByUser.id,
        name: updatedByUser.name,
        role: updatedByUser.role as PossibleRole
      }
    }

    return new User({
      id: userDb.id,
      name: userDb.name,
      email: userDb.email,
      password: userDb.password,
      role: userDb.role as PossibleRole,
      position: userDb.position,
      avatar: userDb.avatar,
      avatarUrl: userDb.avatarUrl,
      createdAt: userDb.createdAt,
      createdBy: userDb.createdBy,
      updatedAt: userDb.updatedAt,
      updatedBy: updatedByPartial,
      deletedAt: userDb.deletedAt
    })
  }

  static mapMany(usersDb: UserDb[]): User[] {
    return usersDb.map(this.mapOne)
  }
}
