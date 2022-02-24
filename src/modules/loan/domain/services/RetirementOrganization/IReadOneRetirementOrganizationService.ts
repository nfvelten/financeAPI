import { RetirementOrganizationDTO } from '@modules/loan/application/repositories/dtos'

export interface IReadOneRetirementOrganizationService {
  execute: (id: string) => Promise<RetirementOrganizationDTO>
}
