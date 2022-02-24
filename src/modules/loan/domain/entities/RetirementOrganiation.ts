type Category = { id: string, name: string, hasUniqueOrganization: boolean }

export type RetirementOrganization = {
  id: string
  name: string
  interestPerMonth: number
  termInMonths: number
  coefficient: number
  category: Category
}
