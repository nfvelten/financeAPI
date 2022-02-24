import { ISimulationsRepository } from '../repositories'
import { ListSimulations } from '@modules/simulations/domain/features'

export class ListSimulationService implements ListSimulations {
  constructor(private readonly simulationsRepository: ISimulationsRepository) { }

  public async execute(params: ListSimulations.Input): Promise<ListSimulations.Output> {
    const { itens, numberOfItens } = await this.simulationsRepository.findByLoanType(params)

    return {
      numberOfSimulations: numberOfItens,
      simulations: itens.map(i => i.toDto())
    }
  }
}
