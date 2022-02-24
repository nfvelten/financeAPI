import { Simulation } from '@modules/simulations/domain/entities'

export const makeFakeSimulation = (): Simulation => new Simulation({
  status: 'Simulou',
  loanType: 'fgts',
  customer: {
    cpf: '12345678909',
    email: 'customer@mail.com',
    phone: '1140028922'
  }
})
