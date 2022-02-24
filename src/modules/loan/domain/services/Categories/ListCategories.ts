import { CategoryDTO } from '@modules/loan/application/repositories/dtos'

export interface ListCategories {
  execute: () => Promise<ListCategories.Output>
}

export namespace ListCategories {
  export type Output = {
    categories: CategoryDTO[]
    numberOfCategories: number
  }
}
