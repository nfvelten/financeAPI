import { Request, Response } from 'express'
import { CreateSimulationService, ListSimulationService } from '../services'

export class FgtsSimulationController {
  constructor(
    private readonly listFgtsSimulation: ListSimulationService,
    private readonly createFgtsSimulation: CreateSimulationService
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, cpf, phone } = req.body

    const simulation = await this.createFgtsSimulation.execute({
      email,
      cpf,
      phone,
      loanType: 'fgts'
    })
    return res.json(simulation)
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const simulations = await this.listFgtsSimulation.execute('fgts')

    return res.json(simulations)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json(req.body)
  }
}
