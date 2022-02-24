import { ListCategories } from '@modules/loan/domain/services'
import { Request, Response } from 'express'

export class CategoriesController {
  constructor (
    private readonly listCategoriesService: ListCategories
  ) {}

  public async index(req: Request, res: Response): Promise<Response> {
    const { categories, numberOfCategories } = await this.listCategoriesService.execute()

    return res.json({ categories, numberOfCategories })
  }
}
