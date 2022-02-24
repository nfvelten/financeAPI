import { RetirementOrganizationDTO } from '@modules/loan/application/repositories/dtos'
import { RetirementOrganization } from '../models'

export class MapRetirementOrganization {
  static toDto(retirementOrganization: RetirementOrganization): RetirementOrganizationDTO {
    return {
      id: retirementOrganization.id,
      category: retirementOrganization.category,
      coefficient: retirementOrganization.coefficient,
      interestPerMonth: retirementOrganization.interestPerMonth,
      name: retirementOrganization.name,
      termInMonths: retirementOrganization.termInMonths
    }
  }
}
