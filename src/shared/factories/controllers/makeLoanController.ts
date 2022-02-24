import { LoanController } from '@modules/loan/application/controllers/LoanController'
import { CalculateFGTSBirthdayInstallmentAmountService, CalculatePayrollLinkedLoanPriceService } from '@modules/loan/application/services'
import { TypeormFgtsLoanRepository } from '@modules/loan/infra/typeorm/repositories/TypeormFgtsLoanRepository'
import { MakeRetirementOrganization } from '../repositories/MakeRetirementOrganization'

export function makeLoanController (): LoanController {
  const retirementOrganizationRepository = MakeRetirementOrganization.getInstance()
  const payrollLinkedLoanService = new CalculatePayrollLinkedLoanPriceService(retirementOrganizationRepository)
  const fgtsLoanRepository = new TypeormFgtsLoanRepository()
  const fgtsBirthdayLoanService = new CalculateFGTSBirthdayInstallmentAmountService(fgtsLoanRepository)

  return new LoanController(payrollLinkedLoanService, fgtsBirthdayLoanService)
}
