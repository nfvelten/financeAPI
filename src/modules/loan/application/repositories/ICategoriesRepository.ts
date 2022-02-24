import { CategoryDTO } from './dtos'
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination'

export interface ICategoriesRepository {
  findById: (id: string) => Promise<CategoryDTO | undefined>
  findAll: () => Promise<PaginatedRepositoryResponse<CategoryDTO>>
}
