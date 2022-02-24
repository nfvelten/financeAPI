import { Loan } from '@modules/loan/domain/entities'

describe('Loan', () => {
  describe('calculateInstallmentAmount', () => {
    const amount = 10000
    const baseRetirementOrganization = { id: 'any-retirement-organization-id', category: { id: 'any-category-id', name: 'any-category-name' } }

    it('should return 246.88 if term is 84 and fee 1.15 and coefficient is 0.02468837103', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.02468837103,
          interestPerMonth: 1.15,
          termInMonths: 84,
          name: 'INSS'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(246.88)
    })

    it('should return 253.12 if term is 84 and fee 1.71 and coefficient is 0.02531256447', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.02531256447,
          interestPerMonth: 1.71,
          termInMonths: 96,
          name: 'Federal'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(253.12)
    })

    it('should return 300.27 if term is 96 and fee 1.80 and coefficient is 0.03002714453', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.03002714453,
          interestPerMonth: 1.80,
          termInMonths: 96,
          name: 'Governo do Amazonas'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(300.27)
    })

    it('should return 271.48 if term is 96 and fee 1.70 and coefficient is 0.02714860876', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.02714860876,
          interestPerMonth: 1.70,
          termInMonths: 96,
          name: 'Governo do Acre'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(271.48)
    })

    it('should return 291.33 if term is 96 and fee 1.89 and coefficient is 0.0291335394', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.0291335394,
          interestPerMonth: 1.89,
          termInMonths: 96,
          name: 'Prefeitura de Manaus'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(291.33)
    })

    it('should return 322.50 if term is 84 and fee 1.79 and coefficient is 0.03225047005', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.03225047005,
          interestPerMonth: 1.79,
          termInMonths: 84,
          name: 'Manausprev'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(322.5)
    })

    it('should return 278.12 if term is 96 and fee 1.79 and coefficient is 0.0278124661', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.0278124661,
          interestPerMonth: 1.79,
          termInMonths: 96,
          name: 'Prefeitura de Boa Vista'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(278.12)
    })

    it('should return 251.54 if term is 96 and fee 1.79 and coefficient is 0.02515444831', async () => {
      const systemUnderTests = new Loan({
        amount,
        retirementOrganization: {
          ...baseRetirementOrganization,
          coefficient: 0.02515444831,
          interestPerMonth: 1.79,
          termInMonths: 96,
          name: 'Prefeitura de Belém'
        }
      })

      const total = systemUnderTests.calculateInstallmentsAmount()
      expect(total).toBe(251.54)
    })
  })
})
