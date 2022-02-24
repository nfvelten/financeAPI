import { PayrollSimulationController } from '@modules/simulations/application/controllers'
import { CreateSimulationService, ListSimulationService, UpdateSimulationService } from '@modules/simulations/application/services'
import { MakeSimulation } from '../repositories/MakeSimulations'

export function makePayrollSimulationController(): PayrollSimulationController {
  const repo = MakeSimulation.getInstance()
  const updateSimulationService = new UpdateSimulationService(repo)
  return new PayrollSimulationController(new ListSimulationService(repo), new CreateSimulationService(repo), updateSimulationService)
}
