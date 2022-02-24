import { ResetPassword, SendForgotPasswordEmail } from '@modules/users/domain/features'
import { Request, Response } from 'express'

export class UserPasswordController {
  constructor(
    private readonly sendForgotPasswordEmail: SendForgotPasswordEmail,
    private readonly resetPassword: ResetPassword
  ) {}

  public async forgot(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    await this.sendForgotPasswordEmail.execute(email)

    return response.status(204).json()
  }

  public async reset(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body as Record<string, string>

    await this.resetPassword.execute(token, password)

    return response.status(204).json()
  }
}
