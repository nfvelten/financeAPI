import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { email } from '../../validators'
import { adaptRoute } from '../adaptRoute'
import { makeUserPasswordController } from '@shared/factories/controllers/makeUserPasswordController'
import { UserPasswordController } from '@modules/users/application/controllers'

const userPasswordRouter = Router()
const userPasswordController: UserPasswordController = makeUserPasswordController()

userPasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: email.required()
    }
  }),
  adaptRoute(userPasswordController, 'forgot')
)

userPasswordRouter.patch('/',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required()
    }
  }),
  adaptRoute(userPasswordController, 'reset')
)

export default { route: userPasswordRouter, path: '/password' }
