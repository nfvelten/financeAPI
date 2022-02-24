import { Router } from 'express'
import multer from 'multer'
// import { celebrate, Joi, Segments } from 'celebrate'

import uploadConfig from '@config/upload'
import { adaptRoute } from '../adaptRoute'
import { isAuthenticated } from '../../middlewares'
import { TypeormUsersRepository } from '@modules/users/infra/typeorm/repositories/TypeormUsersRepository'
import { UpdateUserAvatarService } from '@modules/users/application/services/UpdateUserAvatarService'
import { UserAvatarController } from '@modules/users/application/controllers/UserAvatarController'
import { MakeStorageProvider } from '@shared/factories/providers/MakeStorageProvider'

const uploadAvatar = multer(uploadConfig)

const userAvatarRouter = Router()

const usersRepository = new TypeormUsersRepository()
const storageProvider = MakeStorageProvider.getInstance()
const updateUserAvatarService = new UpdateUserAvatarService(usersRepository, storageProvider)
const userAvatarController = new UserAvatarController(updateUserAvatarService)

userAvatarRouter.patch(
  '/',
  isAuthenticated(),
  uploadAvatar.single('avatar'),
  adaptRoute(userAvatarController, 'update')
)

export default { route: userAvatarRouter, path: '/avatar' }
