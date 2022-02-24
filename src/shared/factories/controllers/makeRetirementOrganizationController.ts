import { RetirementOrganizationController } from '@modules/loan/application/controllers'
import {
  CreateRetirementOrganizationService,
  ReadRetirementOrganizationsByCategoryService,
  UpdateRetirementOrganizationService,
  ReadRetirementOrganizationsService,
  ReadOneRetirementOrganizationService,
  DeleteRetirementOrganizationService
} from '@modules/loan/application/services'
import { TypeormCategoriesRepository } from '@modules/loan/infra/typeorm'
import { MakeRetirementOrganization } from '../repositories/MakeRetirementOrganization'

export default function makeRetirementOrganizationController(): RetirementOrganizationController {
  const categoriesOrganizationRepository = new TypeormCategoriesRepository()
  const retirementOrganizationRepository = MakeRetirementOrganization.getInstance()
  const createService = new CreateRetirementOrganizationService(retirementOrganizationRepository, categoriesOrganizationRepository)
  const updateService = new UpdateRetirementOrganizationService(retirementOrganizationRepository, categoriesOrganizationRepository)
  const readService = new ReadRetirementOrganizationsByCategoryService(retirementOrganizationRepository, categoriesOrganizationRepository)
  const readAllService = new ReadRetirementOrganizationsService(retirementOrganizationRepository)
  const readOneService = new ReadOneRetirementOrganizationService(retirementOrganizationRepository)
  const deleteRetirementOrganization = new DeleteRetirementOrganizationService(retirementOrganizationRepository)
  return new RetirementOrganizationController(createService, updateService, readService, readAllService, readOneService, deleteRetirementOrganization)
}
