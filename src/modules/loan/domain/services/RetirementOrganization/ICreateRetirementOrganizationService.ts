
export interface ICreateRetirementOrganizationService {
  execute: (data: CreateRetirementOrganizationDTO.Input) => Promise<CreateRetirementOrganizationDTO.Output>
}

export namespace CreateRetirementOrganizationDTO {
  export type Input = {
    categoryId: string
    name: string
    interestPerMonth: number
    termInMonths: number
    coefficient: number
  }

  export type Output = {
    id: string
    name: string
    interestPerMonth: number
    termInMonths: number
    coefficient: number
    category: { id: string, name: string }
  }
}
