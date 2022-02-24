import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { makeSessionsController } from '@shared/factories/controllers/makeSessionsController'
import { adaptRoute } from '@shared/infra/http/routes/adaptRoute'
import { email } from '../validators'

const sessionsRouter = Router()
const sessionsController = makeSessionsController()

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: email.required(),
      password: Joi.string().required()
    }
  }),
  adaptRoute(sessionsController, 'create')
)

export default { route: sessionsRouter, path: '/sessions' }
