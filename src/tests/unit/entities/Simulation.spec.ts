import { Simulation } from '@modules/simulations/domain/entities'
import { makeFakeUserPartial } from '@tests/helpers/mocks'

describe('Simulation', () => {
  describe('update', () => {
    it('should update an Simulation', () => {
      const systemUnderTests = new Simulation({
        id: 'any-id',
        customer: {
          cpf: '123456789',
          email: 'mail@example.com',
          phone: '31999997788'
        },
        loanType: 'fgts',
        status: 'Simulou'
      })
      const user = makeFakeUserPartial()

      systemUnderTests.update({
        status: 'Negociando',
        customer: {
          cpf: '98765432109',
          email: 'another@email.com',
          phone: '31999997787'
        }
      }, { user })

      expect(systemUnderTests.toDto()).toEqual({
        updatedBy: user,
        id: 'any-id',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        customer: {
          cpf: '98765432109',
          email: 'another@email.com',
          phone: '31999997787'
        },
        loanType: 'fgts',
        status: 'Negociando'
      })
    })
  })
})
