import { CategoryDTO } from '@modules/loan/application/repositories/dtos'
import { Category as CategoryDb } from '../models'

export class MapCategory {
  static mapOne({ id, name, hasUniqueOrganization }: CategoryDb): CategoryDTO {
    return {
      id,
      name,
      hasUniqueOrganization
    }
  }

  static mapMany(categoriesDb: CategoryDb[]): CategoryDTO[] {
    return categoriesDb.map(this.mapOne)
  }
}
