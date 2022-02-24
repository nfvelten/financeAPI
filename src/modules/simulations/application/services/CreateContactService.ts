import { ISimulationsRepository } from '../repositories'
import { Simulation, SimulationDto } from '../../domain/entities'

type CreateSimulationDTO = {
  email: string
  cpf: string
  phone: string
  loanType: 'fgts' | 'payrollLinked'
}

export class CreateSimulationService {
  constructor(private readonly simulationsRepository: ISimulationsRepository) {}
  public async execute({ email, cpf, phone, loanType }: CreateSimulationDTO): Promise<SimulationDto> {
    let simulation = new Simulation({
      customer: {
        cpf, email, phone
      },
      loanType,
      status: 'Simulou'
    })

    simulation = await this.simulationsRepository.save(simulation)

    return simulation.toDto()
  }
}
