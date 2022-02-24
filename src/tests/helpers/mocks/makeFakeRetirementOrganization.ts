import { RetirementOrganizationDTO } from '@modules/loan/application/repositories/dtos'

export const makeFakeRetirementOrganization = (id = 'any-id'): RetirementOrganizationDTO => ({
  id,
  name: `${Date.now()} any-name`,
  coefficient: 0.1,
  interestPerMonth: 1.23,
  termInMonths: 90,
  category: { id: 'any-category-id', name: 'any-category-name' }
})
