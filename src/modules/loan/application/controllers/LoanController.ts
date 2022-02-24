import { Request, Response } from 'express'
import { ICalculateFGTSBirthdayInstallmentAmountService, ICalculatePayrollLinkedLoanPriceservice } from '@modules/loan/domain/services'

type ReadFgtsInstalmentAmountRequest = {
  accountBalance: string
  birthday: string
}

export class LoanController {
  constructor(
    private readonly calculatePayrollLinkedLoanPrice: ICalculatePayrollLinkedLoanPriceservice,
    private readonly calculateFGTS: ICalculateFGTSBirthdayInstallmentAmountService
  ) {}

  public async readPayrollLinkedLoanPrice(request: Request, response: Response): Promise<Response> {
    const { amount, retirementOrganizationId } = request.params

    const installmentAmount = await this.calculatePayrollLinkedLoanPrice.execute({
      amount: Number(amount),
      retirementOrganizationId: String(retirementOrganizationId)
    })

    return response.json({ installmentAmount: this.parseAmount(installmentAmount) })
  }

  public async readFgtsLoanInstalmentAmount(request: Request, response: Response): Promise<Response> {
    const { accountBalance, birthday } = request.query as ReadFgtsInstalmentAmountRequest

    const installmentAmount = await this.calculateFGTS.execute({ accountBalance: Number(accountBalance), birthday: new Date(birthday) })

    return response.json({ installmentAmount: this.parseAmount(installmentAmount) })
  }

  private parseAmount(amount: number): number {
    return Number(amount.toFixed(2))
  }
}
