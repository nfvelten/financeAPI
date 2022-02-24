import { IFgtsLoanRepository } from '@modules/loan/application/repositories'
import { FgtsBirthdayLoan } from '@modules/loan/domain/entities'
import { CalculateFGTSInstallmentAmount, ICalculateFGTSBirthdayInstallmentAmountService } from '@modules/loan/domain/services'

export class CalculateFGTSBirthdayInstallmentAmountService implements ICalculateFGTSBirthdayInstallmentAmountService {
  constructor(private readonly fgtsLoanRepository: IFgtsLoanRepository) {}

  async execute(args: CalculateFGTSInstallmentAmount.Input): Promise<number> {
    const interestPerMonth = await this.fgtsLoanRepository.getInterestPerMonth()
    const fgtsLoan = new FgtsBirthdayLoan({ ...args, interestPerMonth })
    return fgtsLoan.getInstallmentsAmount()
  }
}
