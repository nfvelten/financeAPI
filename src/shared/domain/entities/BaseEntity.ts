import { UserPartial } from '@modules/users/domain/entities/User'
import { randomUUID } from 'crypto'

export type ApplicationConfig = { user: UserPartial }

interface PropsApplyChanges<T> {
  dto: T
  propertiesToUpdate: string[]
  applicationConfig: ApplicationConfig
}

export type BaseEntityProps = {
  id?: string
  createdAt?: Date
  updatedBy?: UserPartial
  updatedAt?: Date
  deletedAt?: Date
}

export type UpdateEntityProps = Partial<BaseEntityProps>

export abstract class BaseEntity {
  readonly id: string
  readonly createdAt: Date
  protected updatedAt?: Date
  protected updatedBy?: UserPartial
  readonly deletedAt?: Date
  readonly deletedBy?: string

  constructor(props: BaseEntityProps) {
    this.id = props.id ?? randomUUID()
    this.createdAt = props.createdAt ?? new Date()
    this.updatedBy = props.updatedBy
    this.updatedAt = props.updatedAt
    this.deletedAt = props.deletedAt
  }

  protected abstract validate(): Error | undefined

  protected applyChanges<T>(props: PropsApplyChanges<T>): void {
    const { dto, propertiesToUpdate, applicationConfig } = props
    Object.entries(dto).forEach(([key, value]) => {
      if (propertiesToUpdate.includes(key)) {
        (this as Record<string, unknown>)[key] = value
      }
    })

    this.updatedAt = new Date()
    this.updatedBy = applicationConfig.user
  }
}
