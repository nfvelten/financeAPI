import { Request, Response } from 'express'
import {
  CreateRetirementOrganizationDTO,
  ICreateRetirementOrganizationService,
  IUpdateRetirementOrganizationService,
  IReadRetirementOrganizationsByCategoryService,
  IReadRetirementOrganizationsService,
  IReadOneRetirementOrganizationService,
  IDeleteRetirementOrganizationService
} from '@modules/loan/domain/services'

export type CreateRetirementOrganizationRequest = CreateRetirementOrganizationDTO.Input

export type UpdateRetirementOrganizationRequest = Partial<{
  interestPerMonth: number
  termInMonths: number
  coefficient: number
}>

export class RetirementOrganizationController {
  constructor(
    private readonly createRetirementOrganization: ICreateRetirementOrganizationService,
    private readonly updateRetirementOrganization: IUpdateRetirementOrganizationService,
    private readonly listByCategory: IReadRetirementOrganizationsByCategoryService,
    private readonly readAll: IReadRetirementOrganizationsService,
    private readonly readOne: IReadOneRetirementOrganizationService,
    private readonly deleteRetirementOrganization: IDeleteRetirementOrganizationService
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const body = req.body as CreateRetirementOrganizationRequest

    const category = await this.createRetirementOrganization.execute(body)

    return res.json(category)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const body = req.body as UpdateRetirementOrganizationRequest
    const { id } = req.params
    const params = Object.assign(body, { id })

    const category = await this.updateRetirementOrganization.execute(params)

    return res.json(category)
  }

  public async readByCategory(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params

    const response = await this.listByCategory.execute(categoryId)

    return res.json(response)
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const retirementOrganizations = await this.readAll.execute()
    return res.json(retirementOrganizations)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const retirementOrganization = await this.readOne.execute(id)

    return res.json(retirementOrganization)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    await this.deleteRetirementOrganization.execute(id)

    return res.status(204).send()
  }
}
