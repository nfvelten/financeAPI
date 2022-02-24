import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { isAuthenticated } from '@shared/infra/http/middlewares'
import makeRetirementOrganizationController from '@shared/factories/controllers/makeRetirementOrganizationController'
import { adaptRoute } from './adaptRoute'
import { RetirementOrganizationController } from '@modules/loan/application/controllers'
import { positiveNumber } from '../validators'

const retirementOrganizationRouter = Router()
const retirementOrganizationController: RetirementOrganizationController = makeRetirementOrganizationController()

retirementOrganizationRouter.get('/', adaptRoute(retirementOrganizationController, 'index'))

retirementOrganizationRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid()
    }
  }),
  adaptRoute(retirementOrganizationController, 'show')
)

retirementOrganizationRouter.post(
  '/',
  isAuthenticated('admin'),
  celebrate({
    [Segments.BODY]: {
      categoryId: Joi.string().uuid().required(),
      name: Joi.string().required(),
      interestPerMonth: positiveNumber,
      termInMonths: positiveNumber,
      coefficient: positiveNumber
    }
  }),
  adaptRoute(retirementOrganizationController, 'create')
)

retirementOrganizationRouter.put(
  '/:id',
  isAuthenticated('admin'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      interestPerMonth: Joi.number().positive(),
      termInMonths: Joi.number().positive(),
      coefficient: Joi.number().positive(),
      categoryId: Joi.string().uuid()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  adaptRoute(retirementOrganizationController, 'update')
)

retirementOrganizationRouter.delete(
  '/:id',
  isAuthenticated('admin'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  adaptRoute(retirementOrganizationController, 'delete')
)

export default { router: retirementOrganizationRouter, path: '/retirement-organizations' }
