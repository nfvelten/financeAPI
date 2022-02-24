import { UpdateUserAvatar } from '@modules/users/domain/features/UpdateUserAvatar'
import { Request, Response } from 'express'

export class UserAvatarController {
  constructor(private readonly updateAvatar: UpdateUserAvatar) {}

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const avatarFilename = request.file?.filename ?? ''

    const { avatarUrl } = await this.updateAvatar.execute({
      userId: id,
      avatarFilename
    })

    return response.json({ avatarUrl })
  }
}
