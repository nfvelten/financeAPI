import { CreateRetirementOrganizationDTO, ICreateRetirementOrganizationService } from '@modules/loan/domain/services'
import AppError from '@shared/errors/AppError'
import { ICategoriesRepository, IRetirementOrganizationsRepository } from '../repositories'

export class CreateRetirementOrganizationService implements ICreateRetirementOrganizationService {
  constructor(
    private readonly retirementOrganizationRepository: IRetirementOrganizationsRepository,
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(data: CreateRetirementOrganizationDTO.Input): Promise<CreateRetirementOrganizationDTO.Output> {
    const category = await this.categoriesRepository.findById(data.categoryId)
    if (category == null) throw new AppError('Categoria não encontrada')

    if (category.hasUniqueOrganization) {
      const categoryHasUniqueOrganization = await this.retirementOrganizationRepository.readOneByCategory(data.categoryId)

      if (categoryHasUniqueOrganization) {
        throw new AppError('Essa categoria só pode ter um convênio cadastrado')
      }
    }

    let retirementOrganization = await this.retirementOrganizationRepository.readByName(data.name)
    if (retirementOrganization != null) throw new AppError('Convênio já cadastrado')

    retirementOrganization = await this.retirementOrganizationRepository.save({ ...data, category })

    return retirementOrganization
  }
}
