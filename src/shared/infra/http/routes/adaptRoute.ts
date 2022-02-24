import { Request, Response } from 'express'

type Handler = (req: Request, res: Response) => Promise<any>

export function adaptRoute<T = any>(controller: T, method: keyof T): Handler {
  return async (req: Request, res: Response) => await (controller[method] as unknown as Handler)(req, res)
}
