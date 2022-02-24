import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { makeLoanController } from '@shared/factories/controllers/makeLoanController'

const retirementOrganizationRouter = Router()
const retirementOrganizationController = makeLoanController()

retirementOrganizationRouter.get('/payroll-linked/simulation/:retirementOrganizationId/:amount',
  celebrate({
    [Segments.PARAMS]: {
      retirementOrganizationId: Joi.string().uuid().required(),
      amount: Joi.number().min(0)
    }
  }),
  async (req, res) => retirementOrganizationController.readPayrollLinkedLoanPrice(req, res)
)

retirementOrganizationRouter.get('/fgts-birthday/simulation',
  celebrate({
    [Segments.QUERY]: {
      birthday: Joi.date().required(),
      accountBalance: Joi.string().min(0)
    }
  }),
  async (req, res) => retirementOrganizationController.readFgtsLoanInstalmentAmount(req, res)
)

export default { router: retirementOrganizationRouter, path: '/loan' }
