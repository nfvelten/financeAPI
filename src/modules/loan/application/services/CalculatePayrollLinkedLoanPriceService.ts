import { IRetirementOrganizationsRepository } from '@modules/loan/application/repositories'
import { Loan } from '@modules/loan/domain/entities'
import { CalculatePayrollLinkedLoanPrice, ICalculatePayrollLinkedLoanPriceservice } from '@modules/loan/domain/services/Loan/ICalculatePayrollLinkedLoanPrice'
import AppError from '@shared/errors/AppError'

export class CalculatePayrollLinkedLoanPriceService implements ICalculatePayrollLinkedLoanPriceservice {
  constructor(private readonly retirementOrganizationRepository: IRetirementOrganizationsRepository) {}

  async execute(data: CalculatePayrollLinkedLoanPrice.Input): Promise<number> {
    const retirementOrganization = await this.retirementOrganizationRepository.readOne(data.retirementOrganizationId)

    if (!retirementOrganization) throw new AppError('Convênio não encontrado')

    const loan = new Loan({
      amount: data.amount,
      retirementOrganization
    })

    return loan.calculateInstallmentsAmount()
  }
}
