import { RetirementOrganization } from '@modules/loan/domain/entities'
import { randomUUID } from 'crypto'

type LoanProps = {
  id?: string
  retirementOrganization: RetirementOrganization
  amount: number
}

export class Loan {
  readonly id: string
  private readonly retirementOrganization: RetirementOrganization
  private readonly amount: number

  constructor(data: LoanProps) {
    this.id = data.id ?? randomUUID()
    this.retirementOrganization = data.retirementOrganization
    this.amount = data.amount
  }

  public calculateInstallmentsAmount(): number {
    const { coefficient } = this.retirementOrganization

    const precicion = Math.floor((this.amount * coefficient) * 100) / 100
    return precicion
  }
}
