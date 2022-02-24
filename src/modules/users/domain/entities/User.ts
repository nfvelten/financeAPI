import { CreatedEntity, CreatedEntityProps } from '@shared/domain/entities/CreatedEntity'
import AppError from '@shared/errors/AppError'
import { PossibleRole, Role } from './Role'
import env from '@config/env'

export type UserProps = CreatedEntityProps & {
  name: string
  email: string
  password: string
  avatar?: string
  avatarUrl?: string
  role: PossibleRole
  position: string
  createdBy: string
}

export type UserDto = {
  id: string
  name: string
  email: string
  password: string
  avatar: string | undefined
  avatarUrl: string | undefined
  role: PossibleRole
  position: string
  createdBy: string
  createdAt: Date
  updatedBy?: UserPartial
  updatedAt?: Date
  deletedBy?: string
  deletedAt?: Date
}

export type UserPartial = {
  id: string
  name: string
  email: string
  role: PossibleRole
}

export type UpdateUserProps = Partial<UserProps>

export class User extends CreatedEntity {
  private readonly name: string
  private readonly email: string
  private readonly avatar?: string
  private readonly avatarUrl?: string
  private password: string
  private role: Role
  private readonly position: string

  constructor(props: UserProps) {
    super(props)
    this.createdBy = props.createdBy
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.avatar = props.avatar
    this.avatarUrl = props.avatarUrl
    this.position = props.position
    this.role = new Role(props.role)
    this.validate()
  }

  protected validate(): AppError | undefined {
    if (this.password.length < 6) {
      return new AppError('Password must have at least 6 charcters')
    }
  }

  getPassword(): string {
    return this.password
  }

  setPassword(password: string): User {
    this.password = password
    return this
  }

  getEmail(): string {
    return this.email
  }

  getName(): string {
    return this.name
  }

  getAvatar(): string | undefined {
    return this.avatar
  }

  getAvatarUrl(): string | undefined {
    return this.avatarUrl
  }

  generateAvatarUrl(filename: string): string {
    switch (env.storage) {
      case 'spaces':
        return `https://${env.spaces.bucket}.nyc3.digitaloceanspaces.com/${env.spaces.projectFolder}/avatar/${filename}`
      default:
        return `${String(env.apiUrl)}/avatar/${filename}`
    }
  }

  update({ role, ...data }: UpdateUserProps, userUpdating: UserPartial): this {
    Object.assign(this, data)
    if (role) {
      this.role = new Role(role)
    }

    this.updatedBy = userUpdating
    this.updatedAt = new Date()
    return this
  }

  toDto(): UserDto {
    return {
      id: this.id,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt,
      name: this.name,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
      avatarUrl: this.avatarUrl,
      position: this.position,
      role: this.role.value,
      deletedAt: this.deletedAt,
      deletedBy: this.deletedBy
    }
  }

  toPartial(): UserPartial {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role.value
    }
  }
}
