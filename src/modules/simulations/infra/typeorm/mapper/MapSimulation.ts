import { Simulation } from '@modules/simulations/domain/entities'
import { PossibleRole } from '@modules/users/domain/entities/Role'
import { UserPartial } from '@modules/users/domain/entities/User'
import SimulationDB from '../models/Simulation'

export class MapSimulation {
  static mapOne({ updatedBy, ...simulationDb }: SimulationDB): Simulation {
    let updatedByPartial: UserPartial | undefined
    if (updatedBy) {
      updatedByPartial = {
        email: updatedBy.email,
        id: updatedBy.id,
        name: updatedBy.name,
        role: updatedBy.role as PossibleRole
      }
    }

    return new Simulation({
      id: simulationDb.id,
      customer: {
        cpf: simulationDb.cpf,
        email: simulationDb.email,
        phone: simulationDb.phone
      },
      loanType: simulationDb.loanType,
      status: simulationDb.status,
      negotiator: simulationDb.negotiator,
      createdAt: simulationDb.createdAt,
      updatedAt: simulationDb.updatedAt,
      updatedBy: updatedByPartial,
      deletedAt: simulationDb.deletedAt
    })
  }

  static mapMany(simulationsDb: SimulationDB[]): Simulation[] {
    return simulationsDb.map(this.mapOne)
  }
}
