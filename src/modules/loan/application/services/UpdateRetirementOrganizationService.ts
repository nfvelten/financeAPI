import { RetirementOrganization } from '@modules/loan/domain/entities'
import { UpdateRetirementOrganizationDTO, IUpdateRetirementOrganizationService } from '@modules/loan/domain/services'
import AppError from '@shared/errors/AppError'
import { ICategoriesRepository, IRetirementOrganizationsRepository } from '../repositories'
import { CategoryDTO } from '../repositories/dtos'

export class UpdateRetirementOrganizationService implements IUpdateRetirementOrganizationService {
  constructor(
    private readonly retirementOrganizationRepository: IRetirementOrganizationsRepository,
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ id, name, categoryId, coefficient, interestPerMonth, termInMonths }: UpdateRetirementOrganizationDTO.Input): Promise<RetirementOrganization> {
    let retirementOrganization = await this.retirementOrganizationRepository.readOne(id)
    if (!retirementOrganization) throw new AppError('Convênio não cadastrado')

    let category: CategoryDTO | undefined
    if (categoryId !== undefined) {
      const c = await this.categoriesRepository.findById(categoryId)
      if (c == null) throw new AppError('Categoria não encontrada')

      if (categoryId !== retirementOrganization.category.id && c.hasUniqueOrganization) {
        const categoryHasUniqueOrganization = await this.retirementOrganizationRepository.readOneByCategory(categoryId)

        if (categoryHasUniqueOrganization) {
          throw new AppError('Essa categoria só pode ter um convênio cadastrado')
        }
      }

      category = c
    }

    if (name) {
      const sameName = await this.retirementOrganizationRepository.readByName(name)

      if (sameName && sameName.id !== retirementOrganization.id) {
        throw new AppError('Já existe outro convênio com esse nome')
      }
    }

    retirementOrganization = await this.retirementOrganizationRepository.save({
      id,
      name: name ?? retirementOrganization.name,
      category: category ?? retirementOrganization.category,
      coefficient: coefficient ?? retirementOrganization.coefficient,
      interestPerMonth: interestPerMonth ?? retirementOrganization.interestPerMonth,
      termInMonths: termInMonths ?? retirementOrganization.termInMonths
    })

    return retirementOrganization
  }
}
