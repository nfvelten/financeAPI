import { ApplicationConfig } from '@shared/domain/entities'
import AppError from '@shared/errors/AppError'
import { ISimulationsRepository } from '../repositories'
import { SimulationDto, UpdateSimulationProps } from '../../domain/entities'

export type UpdateSimulationInput = {
  simulationId: string
  data: UpdateSimulationProps
  applicationConfig: ApplicationConfig
}

export class UpdateSimulationService {
  constructor(private readonly simulationsRepository: ISimulationsRepository) {}

  async execute({ simulationId, data, applicationConfig }: UpdateSimulationInput): Promise<SimulationDto> {
    const simulation = await this.simulationsRepository.findById(simulationId)

    if (!simulation) throw new AppError('Simulação não encontrada')

    const formattedData = {}

    if (data.negotiator) {
      if (data.status === 'Simulou' || (simulation.toDto().status === 'Simulou' && !data.status)) {
        throw new AppError("Ao adicionar um negociador, o status deve ser atualizado para 'Negociando'")
      }

      Object.assign(formattedData, { negotiator: data.negotiator })
    }

    if (data.status) {
      if (data.status !== 'Simulou' && (!data.negotiator && (!simulation.toDto().negotiator))) {
        throw new AppError('Não é possível mudar o status sem adicionar um negociador!')
      }

      Object.assign(formattedData, { status: data.status })
    }

    if (data.customer) {
      Object.assign(formattedData, { customer: data.customer })
    }

    const updated = simulation.update(formattedData, applicationConfig)

    await this.simulationsRepository.save(updated)

    return simulation.toDto()
  }
}
