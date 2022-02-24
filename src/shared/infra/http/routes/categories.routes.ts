import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import makeRetirementOrganizationController from '@shared/factories/controllers/makeRetirementOrganizationController'
import { adaptRoute } from './adaptRoute'
import { RetirementOrganizationController } from '@modules/loan/application/controllers'

import { TypeormCategoriesRepository } from '@modules/loan/infra/typeorm'
import { ListCategoriesService } from '@modules/loan/application/services/ListCategoriesService'
import { CategoriesController } from '@modules/loan/application/controllers/CategoriesController'
import { isAuthenticated } from '../middlewares'

const categoriesRouter = Router()
const categoriesRepository = new TypeormCategoriesRepository()

const listCategoriesService = new ListCategoriesService(categoriesRepository)
const categoriesController = new CategoriesController(listCategoriesService)
const retirementOrganizationController: RetirementOrganizationController = makeRetirementOrganizationController()

categoriesRouter.get('/:categoryId/retirement-organizations',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().uuid().allow('inss', 'federal', 'municipal', 'estadual')
    }
  }),
  adaptRoute(retirementOrganizationController, 'readByCategory')
)

categoriesRouter.get(
  '/',
  isAuthenticated('editor'),
  async (req, res) => categoriesController.index(req, res)
)

export default { router: categoriesRouter, path: '/categories' }
