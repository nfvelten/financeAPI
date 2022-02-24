export interface IReadRetirementOrganizationsByCategoryService {
  execute: (categoryId: string) => Promise<ReadRetirementOrganizationsByCategoryDTO.Output>
}

export namespace ReadRetirementOrganizationsByCategoryDTO {
  type RetirementOrganization = {
    id: string
    name: string
    interestPerMonth: number
    termInMonths: number
  }

  export type Output = {
    category: {
      id: string
      name: string
      hasUniqueOrganization: boolean
    }
    retirementOrganizations: RetirementOrganization[]
  }
}
