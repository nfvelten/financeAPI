import { IReadOneRetirementOrganizationService } from '@modules/loan/domain/services'
import AppError from '@shared/errors/AppError'
import { IRetirementOrganizationsRepository } from '../repositories'
import { RetirementOrganizationDTO } from '../repositories/dtos'

export class ReadOneRetirementOrganizationService implements IReadOneRetirementOrganizationService {
  constructor(
    private readonly retirementOrganizationRepository: IRetirementOrganizationsRepository
  ) {}

  async execute(id: string): Promise<RetirementOrganizationDTO> {
    const retirementOrganization = await this.retirementOrganizationRepository.readOne(id)

    if (!retirementOrganization) {
      throw new AppError('Convênio não encontrado', 404)
    }

    return retirementOrganization
  }
}
