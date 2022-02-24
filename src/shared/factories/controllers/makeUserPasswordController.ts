import { UserPasswordController } from '@modules/users/application/controllers'
import { ResetPasswordService, SendForgotPasswordEmailService } from '@modules/users/application/services'
import { BcryptHashProvider } from '@shared/application/providers'
import { MakeMailProvider } from '../providers/MakeMailProvider'
import { MakeUser, MakeUserToken } from '../repositories'

export const makeUserPasswordController = (): UserPasswordController => {
  const usersRepository = MakeUser.getInstance()
  const mailProvider = MakeMailProvider.getInstance()
  const userTokensRepository = MakeUserToken.getInstance()
  const sendForgotPassword = new SendForgotPasswordEmailService(usersRepository, mailProvider, userTokensRepository)
  const resetPassword = new ResetPasswordService(usersRepository, userTokensRepository, new BcryptHashProvider())
  return new UserPasswordController(sendForgotPassword, resetPassword)
}
