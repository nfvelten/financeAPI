import { ISimulationsRepository } from '@modules/simulations/application/repositories'
import { TypeormSimulationsRepository } from '@modules/simulations/infra/typeorm/repositories'

export class MakeSimulation {
  private static instance?: ISimulationsRepository

  static getInstance(): ISimulationsRepository {
    if (!this.instance) {
      this.instance = new TypeormSimulationsRepository()
    }

    return this.instance
  }
}
