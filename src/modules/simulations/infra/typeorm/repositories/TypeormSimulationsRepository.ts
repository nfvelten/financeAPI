import { ISimulationsRepository, SimulationsRepositoryDTO } from '@modules/simulations/application/repositories'
import { Simulation } from '@modules/simulations/domain/entities'
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination'
import { getRepository, Raw, Repository } from 'typeorm'
import { MapSimulation } from '../mapper/MapSimulation'
import SimulationDB from '../models/Simulation'

export type SaveSimulationDTO = {
  email: string
  cpf: string
  phone: string
  loanType: 'fgts' | 'payrollLinked'
  status: 'Contratou' | 'Negociando' | 'Não contratou' | 'Simulou'
  negotiator?: string
}

export class TypeormSimulationsRepository implements ISimulationsRepository {
  private readonly ormRepository: Repository<SimulationDB>

  constructor() {
    this.ormRepository = getRepository(SimulationDB)
  }

  public async findByLoanType ({ loanType, cpf, status, pagination }: SimulationsRepositoryDTO.FindByLoanInput): Promise<PaginatedRepositoryResponse<Simulation>> {
    const { skip, take } = pagination
    const formattedCpf = cpf ? String(cpf) : ''

    const where = {
      loanType,
      cpf: Raw(() => `cpf LIKE '%${formattedCpf}%'`)
    }

    if (status) {
      Object.assign(where, { status })
    }

    const [simulations, count] = await this.ormRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip,
      take
    })

    return {
      numberOfItens: count,
      itens: MapSimulation.mapMany(simulations)
    }
  }

  public async findById (id: string): Promise<Simulation | undefined> {
    const simulationDb = await this.ormRepository.findOne({ where: { id } })

    let simulation: Simulation | undefined
    if (simulationDb) {
      simulation = MapSimulation.mapOne(simulationDb)
    }

    return simulation
  }

  public async save(simulation: Simulation): Promise<Simulation> {
    const { customer: { cpf, email, phone }, ...dto } = simulation.toDto()

    const s = await this.ormRepository.save({
      ...dto,
      cpf,
      email,
      phone
    })

    return MapSimulation.mapOne(s)
  }
}
