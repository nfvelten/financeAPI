import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { isAuthenticated, paginate } from '@shared/infra/http/middlewares'
import { adaptRoute } from '../adaptRoute'
import { makePayrollSimulationController } from '@shared/factories/controllers/makePayrollSimulationController'
import { cpf, phone, email } from '@shared/infra/http/validators'
import { PayrollSimulationController } from '@modules/simulations/application/controllers'

const payrollRoute = Router()
const payrollController: PayrollSimulationController = makePayrollSimulationController()

payrollRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: cpf.required(),
      email: email.required(),
      phone: phone.required()
    }
  }),
  adaptRoute(payrollController, 'create')
)

payrollRoute.get('/',
  isAuthenticated('editor'),
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0),
      take: Joi.number().min(0),
      cpf: Joi.string(),
      status: Joi.string().valid('Contratou', 'Negociando', 'Não contratou', 'Simulou')
    }
  }),
  paginate({ skip: 0, take: 20 }),
  adaptRoute(payrollController, 'index')
)

payrollRoute.patch(
  '/:simulationId/status',
  isAuthenticated('editor'),
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().valid('Contratou', 'Negociando', 'Não contratou', 'Simulou').required()
    }
  }),
  adaptRoute(payrollController, 'update')
)

payrollRoute.put(
  '/:simulationId',
  isAuthenticated('editor'),
  celebrate({
    [Segments.BODY]: {
      cpf: cpf,
      email: email,
      phone: phone,
      status: Joi.string().valid('Contratou', 'Negociando', 'Não contratou', 'Simulou'),
      negotiator: Joi.string()
    }
  }),
  adaptRoute(payrollController, 'update')
)

export { payrollRoute }
