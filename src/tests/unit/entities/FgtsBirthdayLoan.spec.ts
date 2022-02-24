import { FgtsBirthdayLoan, FgtsBirthdayLoanProps } from '@modules/loan/domain/entities'

describe('FgtsBirthdayLoan', () => {
  const args: FgtsBirthdayLoanProps = { accountBalance: 100, interestPerMonth: 1.99, birthday: new Date('2003-01-23') }

  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2021, 11, 6, 12, 0, 0, 0))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('getAvailableLimit', () => {
    it('should retun 249.5 when account balance is 499', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 499
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(249.5)
    })

    it('should retun 250 when account balance is 500', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 500
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(250)
    })

    it('should retun 449.6 when account balance is 999', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 999
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(449.6)
    })

    it('should retun 450 when account balance is 1000', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 1000
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(450)
    })

    it('should retun 1649.7 when account balance is 4999', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 4999
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(4999 * 0.3 + 150)
    })

    it('should retun 1650 when account balance is 5000', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 5000
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(5000 * 0.2 + 650)
    })

    it('should retun 2650 when account balance is 5000', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 10000
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(10000 * 0.15 + 1150)
    })

    it('should retun 3400 when account balance is 5000', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 15000
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(15000 * 0.1 + 1900)
    })

    it('should retun 3400 when account balance is 5000', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 15000
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(15000 * 0.1 + 1900)
    })

    it('should retun 3900 when account balance is 5000', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        accountBalance: 20000
      })

      expect(systemUnderTests.getAvailableLimit()).toBe(20000 * 0.05 + 2900)
    })
  })

  describe.skip('getInstallmetsAmount', () => {
    it('should apply fee 1 time when term is 1 month', async () => {
      const systemUnderTests = new FgtsBirthdayLoan({
        ...args,
        birthday: new Date(2003, 0, 23),
        accountBalance: 5000,
        interestPerMonth: 2.04
      })

      expect(systemUnderTests.getAvailableLimit()).toEqual(1294.91)
    })
  })
})
