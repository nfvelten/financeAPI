import { getRepository, Repository } from 'typeorm'

import { ICategoriesRepository } from '@modules/loan/application/repositories'
import { CategoryDTO } from '@modules/loan/application/repositories/dtos'
import { Category } from '../models/Category'
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination'
import { MapCategory } from '../mappers/MapCategories'

export class TypeormCategoriesRepository implements ICategoriesRepository {
  private readonly ormRepository: Repository<Category>

  constructor() {
    this.ormRepository = getRepository(Category)
  }

  async findAll(): Promise<PaginatedRepositoryResponse<CategoryDTO>> {
    const [categories, numberOfItens] = await this.ormRepository.findAndCount()

    return {
      itens: MapCategory.mapMany(categories),
      numberOfItens
    }
  }

  async findById(id: string): Promise<CategoryDTO|undefined> {
    const category = await this.ormRepository.findOne(id)
    let dto: CategoryDTO | undefined

    if (category != null) {
      dto = {
        id: category.id,
        name: category.name,
        hasUniqueOrganization: category.hasUniqueOrganization
      }
    }

    return dto
  }
}
