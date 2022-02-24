import AppError from '@shared/errors/AppError'
import { isCelebrateError } from 'celebrate'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (isCelebrateError(error)) {
    const values = error.details.values()
    let { message } = values.next().value.details[0]
    message = message.replace('"', '').replace('"', '')

    return res.status(400).json({
      status: 'error',
      type: 'validation',
      message: message ?? 'no message'
    })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  console.log(error)

  console.log({ err: error })
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
}
