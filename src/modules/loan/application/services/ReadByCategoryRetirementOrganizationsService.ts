import { IReadRetirementOrganizationsByCategoryService, ReadRetirementOrganizationsByCategoryDTO } from '@modules/loan/domain/services'
import AppError from '@shared/errors/AppError'
import { ICategoriesRepository, IRetirementOrganizationsRepository } from '../repositories'

export class ReadRetirementOrganizationsByCategoryService implements IReadRetirementOrganizationsByCategoryService {
  constructor(
    private readonly retirementOrganizationRepository: IRetirementOrganizationsRepository,
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(categoryId: string): Promise<ReadRetirementOrganizationsByCategoryDTO.Output> {
    const categories = {
      federal: 'cd8252e8-c7a0-4302-b62f-8581eab1bf54',
      estadual: '0b700abe-dbcc-450d-b7e6-27adf2758d1d',
      municipal: '1eedd1c0-45ac-4f15-aa74-3f520945c560',
      inss: '2dc05254-4354-4bef-971b-9f01e30865e2'
    }

    // retorna o respectivo id caso o categoryId === 'federal' | 'estadual' | 'municipal' | 'inss'
    let id = Object.entries(categories).find(([key]) => key === categoryId)?.[1]
    id = id ?? categoryId

    const category = await this.categoriesRepository.findById(id)
    if (!category) {
      throw new AppError('Categoria não encontrada')
    }

    const retirementOrganizations = await this.retirementOrganizationRepository.readByCategory(id)

    return {
      category: {
        id: category.id,
        hasUniqueOrganization: category.hasUniqueOrganization,
        name: category.name
      },
      retirementOrganizations: retirementOrganizations.map(({ id, name, termInMonths, interestPerMonth }) => ({ id, name, termInMonths, interestPerMonth }))
    }
  }
}
