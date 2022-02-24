import { ListCategories } from '@modules/loan/domain/services'
import { ICategoriesRepository } from '../repositories'

export class ListCategoriesService implements ListCategories {
  constructor(
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<ListCategories.Output> {
    const { itens, numberOfItens } = await this.categoriesRepository.findAll()

    return {
      categories: itens,
      numberOfCategories: numberOfItens
    }
  }
}
