import { ISimulationsRepository } from '@modules/simulations/application/repositories'
import { Simulation } from '@modules/simulations/domain/entities'
import { UpdateSimulationInput, UpdateSimulationService } from '@modules/simulations/application/services/UpdateSimulationService'
import AppError from '@shared/errors/AppError'
import { Mocked } from '@tests/helpers'
import { makeFakeSimulation } from '@tests/helpers/mocks'

describe('UpdateSimulationService', () => {
  let systemUnderTests: UpdateSimulationService
  let simulationsRepository: Mocked<ISimulationsRepository>
  let savedSimulation: Simulation
  let args: UpdateSimulationInput

  beforeAll(() => {
    args = {
      simulationId: 'any-simulation-id',
      data: {
        customer: {
          cpf: '01234567899',
          email: 'customer@mail.com',
          phone: '3140028922'
        },
        status: 'Contratou'
      },
      applicationConfig: {
        user: {
          id: 'any-user-id',
          email: 'any-user-email',
          name: 'any-user-name',
          role: 'editor'
        }
      }

    }
    savedSimulation = makeFakeSimulation()
    simulationsRepository = {
      findById: jest.fn().mockResolvedValue(savedSimulation),
      save: jest.fn().mockImplementation(async simulation => simulation)
    } as Mocked<ISimulationsRepository>
  })

  beforeEach(() => {
    systemUnderTests = new UpdateSimulationService(simulationsRepository)
  })

  it('should get simulation', async () => {
    await systemUnderTests.execute(args)

    expect(simulationsRepository.findById).toBeCalledTimes(1)
    expect(simulationsRepository.findById).toBeCalledWith(args.simulationId)
  })

  it('shoud throws if simulation is not found', async () => {
    simulationsRepository.findById.mockResolvedValueOnce(undefined)

    const promise = systemUnderTests.execute(args)

    await expect(promise).rejects.toEqual(new AppError('Simulação não encontrada'))
  })

  it('should update simulation in database', async () => {
    const updated = savedSimulation.update(args.data, args.applicationConfig)

    await systemUnderTests.execute(args)

    expect(simulationsRepository.save).toBeCalledTimes(1)
    expect(simulationsRepository.save).toBeCalledWith(updated)
  })

  it('should return the updated simulation', async () => {
    const updated = savedSimulation.update(args.data, args.applicationConfig)

    const simulation = await systemUnderTests.execute(args)

    expect(simulation).toEqual(updated)
  })
})
