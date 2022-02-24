import { RetirementOrganizationDTO } from '@modules/loan/application/repositories/dtos'

export interface IReadRetirementOrganizationsService {
  execute: () => Promise<RetirementOrganizationDTO[]>
}
