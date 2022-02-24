import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { isAuthenticated, paginate } from '@shared/infra/http/middlewares'
import { adaptRoute } from '../adaptRoute'
import { email } from '../../validators'
import password from './password'
import avatar from './avatar'
import { makeUsersController } from '@shared/factories/controllers/makeUsersController'

const usersRouter = Router()
const usersController = makeUsersController()

usersRouter.get(
  '/',
  isAuthenticated('admin'),
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0),
      take: Joi.number().min(0),
      name: Joi.string()
    }
  }),
  paginate({ skip: 0, take: 20 }),
  adaptRoute(usersController, 'index')
)

usersRouter.post(
  '/',
  isAuthenticated('super'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: email.required(),
      role: Joi.string().valid('admin', 'editor').required(),
      position: Joi.string().required(),
      sendPasswordViaEmail: Joi.boolean().required()
    }
  }),
  adaptRoute(usersController, 'create')
)

usersRouter.put(
  '/',
  isAuthenticated(),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      oldPassword: Joi.string(),
      password: Joi.when('oldPassword', {
        is: Joi.exist(),
        then: Joi.string().min(6).required()
      }),
      passwordConfirmation: Joi.when('oldPassword', {
        is: Joi.exist(),
        then: Joi.string().valid(Joi.ref('password')).required()
      })
    }
  }),
  adaptRoute(usersController, 'updateProfile')
)

usersRouter.put(
  '/:id',
  isAuthenticated('super'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid()
    },
    [Segments.BODY]: {
      name: Joi.string(),
      email: email,
      position: Joi.string(),
      role: Joi.string().valid('admin', 'editor')
    }
  }),
  adaptRoute(usersController, 'update')
)

usersRouter.delete(
  '/:id',
  isAuthenticated('super'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid()
    }
  }),
  adaptRoute(usersController, 'softDelete')
)

usersRouter.use(password.path, password.route)

usersRouter.use(avatar.path, avatar.route)

export default { route: usersRouter, path: '/users' }
