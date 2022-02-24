import { Simulation } from '@modules/simulations/domain/entities'
import { PaginatedRepositoryResponse, Pagintation } from '@shared/domain/dtos/Pagination'

export interface ISimulationsRepository {
  findByLoanType: (params: SimulationsRepositoryDTO.FindByLoanInput) => Promise<PaginatedRepositoryResponse<Simulation>>
  findById: (id: string) => Promise<Simulation | undefined>
  save: (simulation: Simulation) => Promise<Simulation>
}

export namespace SimulationsRepositoryDTO {
  export type FindByLoanInput = {
    loanType: string
    pagination: Pagintation
    cpf?: string
    status: string
  }
}
