import { RetirementOrganization } from '../../entities'

export interface IUpdateRetirementOrganizationService {
  execute: (data: UpdateRetirementOrganizationDTO.Input) => Promise<RetirementOrganization>
}

export namespace UpdateRetirementOrganizationDTO {
  export type Input = {
    id: string
    name?: string
    categoryId?: string
    interestPerMonth?: number
    termInMonths?: number
    coefficient?: number
  }
}
