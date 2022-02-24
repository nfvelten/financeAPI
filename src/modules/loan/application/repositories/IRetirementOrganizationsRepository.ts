import { RetirementOrganization } from '@modules/loan/domain/entities'
import { CategoryDTO, RetirementOrganizationDTO } from './dtos'

export interface IRetirementOrganizationsRepository {
  save: (data: RetirementOrganizationsRepositoryDTO.SaveInput) => Promise<RetirementOrganizationDTO>
  readByName: (name: string) => Promise<RetirementOrganizationDTO | undefined>
  readOne: (id: string) => Promise<RetirementOrganizationDTO | undefined>
  readByCategory: (categoryId: string) => Promise<RetirementOrganizationDTO[]>
  readOneByCategory: (categoryId: string) => Promise<RetirementOrganizationDTO | undefined>
  readAll: () => Promise<RetirementOrganization[]>
  delete: (id: string) => Promise<void>
}

export namespace RetirementOrganizationsRepositoryDTO {
  export type SaveInput = Omit<RetirementOrganizationDTO, 'id'| 'category'> & {
    id?: string
    category: CategoryDTO | { id: string }
  }

  export type RetirementOrganizationIds = Pick<RetirementOrganizationDTO, 'id'>
}
