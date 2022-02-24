import { PaginationResponse } from '@shared/application/dtos/PaginationResponse'
import { Request, Response } from 'express'
import { LoanType, SimulationStatus } from '../../domain/entities'
import { CreateSimulationService, ListSimulationService, UpdateSimulationService } from '../services'

type UpdateQueryParams = {
  simulationId: string
}

type UpdateBody = {
  cpf: string
  email: string
  phone: string
  status: SimulationStatus
  negotiator: string
}

type GetQuery = {
  skip: string
  take: string
  cpf?: string
  status?: string
}

type SimulationResponse = {
  id: string
  customer: {
    cpf: string
    email: string
    phone: string
  }
  loanType: LoanType
  status: SimulationStatus
  updated?: {
    by: string
    date: number
  }
  negotiator?: string
}

type SimulationsResponse = PaginationResponse<{
  simulations: SimulationResponse[]
}>

export class PayrollSimulationController {
  constructor(
    private readonly listSimulation: ListSimulationService,
    private readonly createSimulation: CreateSimulationService,
    private readonly updateSimulation: UpdateSimulationService
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, cpf, phone } = req.body

    const contact = await this.createSimulation.execute({
      email,
      cpf,
      phone,
      loanType: 'payrollLinked'
    })
    return res.json(contact)
  }

  public async index(req: Request<any, any, any, GetQuery>, res: Response<SimulationsResponse>): Promise<Response> {
    const take = Number(req.query.take)
    const skip = Number(req.query.skip)
    const cpf = req.query.cpf
    const status = req.query.status

    const { simulations, numberOfSimulations } = await this.listSimulation.execute({
      cpf,
      status,
      loanType: 'payrollLinked',
      pagination: { take, skip }
    })

    const pagination: SimulationsResponse = {
      numberOfRegisters: numberOfSimulations,
      numberOfPages: Math.ceil(numberOfSimulations / take),
      simulations: simulations.map(s => {
        let updated
        if (s.updatedBy && s.updatedAt) {
          updated = {
            by: s.updatedBy.name,
            date: s.updatedAt.getTime()
          }
        }

        return {
          id: s.id,
          customer: s.customer,
          loanType: s.loanType,
          negotiator: s.negotiator,
          status: s.status,
          updated
        }
      })
    }
    return res.json(pagination)
  }

  public async update(req: Request<UpdateQueryParams, any, UpdateBody>, res: Response): Promise<Response> {
    const { simulationId } = req.params
    const { cpf, email, phone, status, negotiator } = req.body

    const customer = (cpf || email || phone) ? { cpf, email, phone } : undefined

    const r = await this.updateSimulation.execute({
      applicationConfig: { user: req.user },
      simulationId,
      data: {
        customer, status, negotiator
      }
    })

    return res.json(r)
  }
}

// const simulations: SimulationResponse[] = [
//   {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Simulou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'murilo22@mail.com',
//       phone: '31940028922'
//     },
//     loanType: 'payrollLinked',
//     status: 'Contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '03:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'outro22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Negociando',
//     updated: {
//       by: 'Nicholas Velten',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Não contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Simulou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'murilo22@mail.com',
//       phone: '31940028922'
//     },
//     loanType: 'payrollLinked',
//     status: 'Contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '03:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'outro22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Negociando',
//     updated: {
//       by: 'Nicholas Velten',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Não contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Simulou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'murilo22@mail.com',
//       phone: '31940028922'
//     },
//     loanType: 'payrollLinked',
//     status: 'Contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '03:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'outro22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Negociando',
//     updated: {
//       by: 'Nicholas Velten',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Não contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Simulou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'murilo22@mail.com',
//       phone: '31940028922'
//     },
//     loanType: 'payrollLinked',
//     status: 'Contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '03:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'outro22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Negociando',
//     updated: {
//       by: 'Nicholas Velten',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Não contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Simulou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'murilo22@mail.com',
//       phone: '31940028922'
//     },
//     loanType: 'payrollLinked',
//     status: 'Contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '03:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'outro22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Negociando',
//     updated: {
//       by: 'Nicholas Velten',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Não contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Simulou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'murilo22@mail.com',
//       phone: '31940028922'
//     },
//     loanType: 'payrollLinked',
//     status: 'Contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '03:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'outro22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Negociando',
//     updated: {
//       by: 'Nicholas Velten',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Não contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Simulou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'murilo22@mail.com',
//       phone: '31940028922'
//     },
//     loanType: 'payrollLinked',
//     status: 'Contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '03:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'outro22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Negociando',
//     updated: {
//       by: 'Nicholas Velten',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }, {
//     id: randomUUID(),
//     customer: {
//       cpf: '12345678909',
//       email: 'bessa22@mail.com',
//       phone: '31997160000'
//     },
//     loanType: 'payrollLinked',
//     status: 'Não contratou',
//     updated: {
//       by: 'Murilo Maia',
//       day: '2021-01-07',
//       time: '23:56'
//     },
//     negotiator: 'Nelson Carvalho'
//   }
// ]
