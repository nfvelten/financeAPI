import { Request, Response } from 'express'

type PaginateProps = {
  skip?: number
  take: number
}

export const paginate = ({ skip = 0, take }: PaginateProps) => (req: Request, res: Response, next: () => void) => {
  // if req.query.take is nullish ?? use default take
  req.query.take ??= String(Math.floor(take))
  // if req.query.skip is nullish ?? use default take
  req.query.skip ??= String(Math.floor(skip))
  next()
}
