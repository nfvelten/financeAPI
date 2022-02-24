import { verify } from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import { authConfig } from '@modules/users/config/auth'
import { UserPartial } from '@modules/users/domain/entities/User'
import { PossibleRole } from '@modules/users/domain/entities/Role'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

export type IsAuthenticatedRequest = {
  headers: {
    authorization?: string
  }
  user: UserPartial
}

export const isAuthenticated = (role?: PossibleRole) => (
  request: IsAuthenticatedRequest,
  _: unknown,
  next: () => void
): void => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT is missing')
  }
  const [, token] = authHeader.split(' ')

  let minRole: number
  let userRole: number
  try {
    const decodedToken = verify(token, authConfig.jwt.secret)

    const { sub } = decodedToken as TokenPayload

    const decoded = JSON.parse(sub)

    request.user = decoded

    const roles: Record<PossibleRole, number> = {
      editor: 1,
      admin: 2,
      super: 3
    }

    minRole = roles[role ?? 'editor']
    userRole = roles[request.user.role]
  } catch {
    throw new AppError('Invalid JWT')
  }

  if (minRole > userRole) throw new AppError("You don't have permission to access this route", 401)
  return next()
}
