import { IDeleteRetirementOrganizationService } from '@modules/loan/domain/services'
import AppError from '@shared/errors/AppError'
import { IRetirementOrganizationsRepository } from '../repositories'

export class DeleteRetirementOrganizationService implements IDeleteRetirementOrganizationService {
  constructor(
    private readonly retirementOrganizationRepository: IRetirementOrganizationsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const retirementOrganization = await this.retirementOrganizationRepository.readOne(id)
    if (!retirementOrganization) throw new AppError('Convênio não cadastrado')

    await this.retirementOrganizationRepository.delete(retirementOrganization.id)
  }
}
