import { Pagintation } from '@shared/domain/dtos/Pagination'
import { LoanType, SimulationDto } from '../entities'

export interface ListSimulations {
  execute: (data: ListSimulations.Input) => Promise<ListSimulations.Output>
}

export namespace ListSimulations {
  export type Input = {
    loanType: LoanType
    cpf?: string
    status?: string
    pagination: Pagintation
  }

  export type Output = {
    simulations: SimulationDto[]
    numberOfSimulations: number
  }
}
