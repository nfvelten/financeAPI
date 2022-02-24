import { UserPartial } from '@modules/users/domain/entities/User'
import { ApplicationConfig, BaseEntity, BaseEntityProps } from '@shared/domain/entities/BaseEntity'

export type LoanType = 'payrollLinked' | 'fgts'
export type SimulationStatus = 'Contratou' | 'Negociando' | 'Não contratou' | 'Simulou'

export type SimulationProps = {
  customer: Customer
  loanType: LoanType
  status: SimulationStatus
  negotiator?: string
}

export type SimulationDto = {
  id: string
  customer: Customer
  loanType: LoanType
  status: SimulationStatus
  negotiator?: string
  createdAt: Date
  updatedBy?: UserPartial
  updatedAt?: Date
  deletedAt?: Date
}

export type UpdateSimulationProps = Omit<Partial<SimulationProps>, 'loanType'>

export type Customer = {
  email: string
  cpf: string
  phone: string
}

export class Simulation extends BaseEntity {
  private readonly customer: Customer

  private readonly loanType: LoanType

  private readonly status: SimulationStatus

  private readonly negotiator?: string

  constructor(props: SimulationProps & BaseEntityProps) {
    super(props)
    this.customer = props.customer
    this.loanType = props.loanType
    this.status = props.status
    this.negotiator = props.negotiator
    this.validate()
  }

  protected validate(): Error | undefined {
    return undefined
  }

  update(data: UpdateSimulationProps, applicationConfig: ApplicationConfig): this {
    const propertiesToUpdate = ['customer', 'loanType', 'status', 'negotiator']

    this.applyChanges({ applicationConfig, dto: data, propertiesToUpdate })

    return this
  }

  toDto(): SimulationDto {
    return {
      id: this.id,
      customer: this.customer,
      loanType: this.loanType,
      status: this.status,
      negotiator: this.negotiator,
      createdAt: this.createdAt,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt
    }
  }
}
