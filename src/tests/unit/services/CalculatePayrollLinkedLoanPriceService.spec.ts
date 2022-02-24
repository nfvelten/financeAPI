import { IRetirementOrganizationsRepository } from '@modules/loan/application/repositories'
import { CalculatePayrollLinkedLoanPriceService } from '@modules/loan/application/services'
import { Loan } from '@modules/loan/domain/entities'
import { CalculatePayrollLinkedLoanPrice } from '@modules/loan/domain/services/Loan/ICalculatePayrollLinkedLoanPrice'
import AppError from '@shared/errors/AppError'
import { Mocked } from '@tests/helpers'
import { makeFakeRetirementOrganization } from '@tests/helpers/mocks/makeFakeRetirementOrganization'

describe('CalculatePayrollLinkedLoanPriceService', () => {
  let systemUnderTests: CalculatePayrollLinkedLoanPriceService
  let retirementOrganizationRepository: Mocked<IRetirementOrganizationsRepository>
  let args: CalculatePayrollLinkedLoanPrice.Input

  beforeAll(() => {
    retirementOrganizationRepository = { readOne: jest.fn().mockResolvedValue(makeFakeRetirementOrganization('any-id')) } as Mocked<IRetirementOrganizationsRepository>

    args = { amount: 10000, retirementOrganizationId: 'any-id' }
  })

  beforeEach(() => {
    systemUnderTests = new CalculatePayrollLinkedLoanPriceService(retirementOrganizationRepository)
  })

  it('should call retirementOrganizationsRepository with correct args', async () => {
    await systemUnderTests.execute(args)

    expect(retirementOrganizationRepository.readOne).toHaveBeenCalledTimes(1)
    expect(retirementOrganizationRepository.readOne).toHaveBeenCalledWith(args.retirementOrganizationId)
  })

  it('should throws if retirementOrganizationsRepository is not found', async () => {
    retirementOrganizationRepository.readOne.mockResolvedValueOnce(undefined)
    const promise = systemUnderTests.execute(args)

    await expect(promise).rejects.toEqual(new AppError('Convênio não encontrado'))
  })

  it('should return the installment amount', async () => {
    const amount = await systemUnderTests.execute(args)

    const loan = new Loan({
      amount: args.amount,
      retirementOrganization: makeFakeRetirementOrganization('any-id')
    })

    expect(amount).toEqual(loan.calculateInstallmentsAmount())
  })
})
