import { IFgtsLoanRepository } from '@modules/loan/application/repositories'
import { CalculateFGTSBirthdayInstallmentAmountService } from '@modules/loan/application/services'
import { FgtsBirthdayLoan } from '@modules/loan/domain/entities'
import { Mocked } from '@tests/helpers'

describe('CalculateFGTSBirthdayInstallmentAmount', () => {
  let systemUnderTests: CalculateFGTSBirthdayInstallmentAmountService
  let fgtsLoanRepository: Mocked<IFgtsLoanRepository>

  beforeAll(() => {
    fgtsLoanRepository = { getInterestPerMonth: jest.fn().mockResolvedValue(1) }
  })

  beforeEach(() => {
    systemUnderTests = new CalculateFGTSBirthdayInstallmentAmountService(fgtsLoanRepository)
  })

  it('should get the FGTS fee', async () => {
    await systemUnderTests.execute({
      accountBalance: 5000,
      birthday: new Date('2003-01-23')
    })

    expect(fgtsLoanRepository.getInterestPerMonth).toBeCalledTimes(1)
    expect(fgtsLoanRepository.getInterestPerMonth).toBeCalledWith()
  })

  it('should return correct amount', async () => {
    const installmentAmount = await systemUnderTests.execute({
      accountBalance: 5000,
      birthday: new Date('2000-01-01')
    })

    const entity = new FgtsBirthdayLoan({
      accountBalance: 5000,
      birthday: new Date('2000-01-01'),
      interestPerMonth: 1
    })

    expect(installmentAmount).toEqual(entity.getInstallmentsAmount())
  })
})
