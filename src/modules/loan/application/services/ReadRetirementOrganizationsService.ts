import { IReadRetirementOrganizationsService } from '@modules/loan/domain/services'
import { IRetirementOrganizationsRepository } from '../repositories'
import { RetirementOrganizationDTO } from '../repositories/dtos'

export class ReadRetirementOrganizationsService implements IReadRetirementOrganizationsService {
  constructor(
    private readonly retirementOrganizationRepository: IRetirementOrganizationsRepository
  ) {}

  async execute(): Promise<RetirementOrganizationDTO[]> {
    return this.retirementOrganizationRepository.readAll()
  }
}
