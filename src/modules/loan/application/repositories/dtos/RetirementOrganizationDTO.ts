import { CategoryDTO } from '.'

export type RetirementOrganizationDTO = {
  id: string
  name: string
  interestPerMonth: number
  termInMonths: number
  coefficient: number
  category: CategoryDTO
}
