import { BaseEntity, BaseEntityProps } from '.'

export type CreatedEntityProps = BaseEntityProps & {
  createdBy: string
}

export abstract class CreatedEntity extends BaseEntity {
  public createdBy: string
  constructor(props: CreatedEntityProps) {
    super(props)
    this.createdBy = props.createdBy
  }
}
