import { Request, Response, NextFunction } from 'express'

export default function permit(...permittedRoles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { user } = request

    if (user && permittedRoles.includes(user.role)) {
      next()
    } else {
      response.status(403).json({ message: 'Forbidden' })
    }
  }
}
