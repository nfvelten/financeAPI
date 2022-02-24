import { ICategoriesRepository, IRetirementOrganizationsRepository } from '@modules/loan/application/repositories'
import { RetirementOrganizationDTO } from '@modules/loan/application/repositories/dtos'
import { CreateRetirementOrganizationService } from '@modules/loan/application/services'
import { CreateRetirementOrganizationDTO } from '@modules/loan/domain/services'
import AppError from '@shared/errors/AppError'
import { Mocked } from '@tests/helpers'

describe('CreateRetirementOrganizationService', () => {
  let categoriesRepository: Mocked<ICategoriesRepository>
  let retirementOranizationsRepository: Mocked<IRetirementOrganizationsRepository>
  let args: CreateRetirementOrganizationDTO.Input
  let systemUnderTests: CreateRetirementOrganizationService

  beforeAll(() => {
    categoriesRepository = { findById: jest.fn().mockImplementation(id => ({ id, name: 'any-category' })) }
    retirementOranizationsRepository = {
      save: jest.fn().mockImplementation(async ({ categoryId, ...data }) => ({ id: 'any-id', ...data })),
      readByName: jest.fn()
    } as unknown as Mocked<IRetirementOrganizationsRepository>

    args = {
      coefficient: 1.001,
      interestPerMonth: 1.20,
      name: 'any retirement organization',
      termInMonths: 30,
      categoryId: 'any-category-id'
    }
  })

  beforeEach(() => {
    systemUnderTests = new CreateRetirementOrganizationService(retirementOranizationsRepository, categoriesRepository)
  })

  it('should call categories repository with correct args', async () => {
    await systemUnderTests.execute(args)

    expect(categoriesRepository.findById).toHaveBeenCalledTimes(1)
    expect(categoriesRepository.findById).toBeCalledWith(args.categoryId)
  })

  it('should throws if category is not found', async () => {
    categoriesRepository.findById.mockResolvedValueOnce(undefined)

    const promise = systemUnderTests.execute(args)

    await expect(promise).rejects.toEqual(new AppError('Categoria não encontrada'))
  })

  it("should call retirementOrganization's repository withc correct args", async () => {
    const category = { name: 'category', id: 'any-id' }
    categoriesRepository.findById.mockResolvedValueOnce(category)
    await systemUnderTests.execute(args)

    expect(retirementOranizationsRepository.save).toBeCalledTimes(1)
    expect(retirementOranizationsRepository.save).toBeCalledWith({ ...args, category })
  })

  it('should return the retirement organization', async () => {
    const retirementOrganization = await systemUnderTests.execute(args)

    expect(retirementOrganization).toEqual({
      id: 'any-id',
      coefficient: 1.001,
      interestPerMonth: 1.20,
      name: 'any retirement organization',
      termInMonths: 30,
      category: {
        id: 'any-category-id',
        name: 'any-category'
      }
    })
  })

  it('should call retirementOranizationsRepository.readByName with correct args', async () => {
    await systemUnderTests.execute(args)

    expect(retirementOranizationsRepository.readByName).toBeCalledTimes(1)
    expect(retirementOranizationsRepository.readByName).toBeCalledWith(args.name)
  })

  it('should throws if the name is already in use', async () => {
    const fakeReturn: RetirementOrganizationDTO = {} as RetirementOrganizationDTO
    retirementOranizationsRepository.readByName.mockResolvedValueOnce(fakeReturn)

    const promise = systemUnderTests.execute(args)

    await expect(promise).rejects.toEqual(new AppError('Convênio já cadastrado'))
  })
})
