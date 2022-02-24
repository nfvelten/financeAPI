import { ICategoriesRepository, IRetirementOrganizationsRepository } from '@modules/loan/application/repositories'
import { UpdateRetirementOrganizationService } from '@modules/loan/application/services'
import { UpdateRetirementOrganizationDTO } from '@modules/loan/domain/services'
import AppError from '@shared/errors/AppError'
import { Mocked } from '@tests/helpers'
import { makeFakeRetirementOrganization } from '@tests/helpers/mocks/makeFakeRetirementOrganization'

describe('UpdateRetirementOrganizationService', () => {
  let categoriesRepository: Mocked<ICategoriesRepository>
  let retirementOranizationsRepository: Mocked<IRetirementOrganizationsRepository>
  let args: UpdateRetirementOrganizationDTO.Input
  let systemUnderTests: UpdateRetirementOrganizationService

  beforeAll(() => {
    categoriesRepository = { findById: jest.fn().mockImplementation(id => ({ id, name: 'any-category' })) }

    const organization = makeFakeRetirementOrganization()

    args = {
      id: organization.id,
      categoryId: organization.category.id,
      coefficient: organization.coefficient,
      interestPerMonth: organization.interestPerMonth,
      termInMonths: organization.termInMonths
    }

    retirementOranizationsRepository = {
      save: jest.fn().mockResolvedValue(args),
      readByName: jest.fn(),
      readOne: jest.fn().mockResolvedValue(makeFakeRetirementOrganization())
    } as Mocked<IRetirementOrganizationsRepository>
  })

  beforeEach(() => {
    systemUnderTests = new UpdateRetirementOrganizationService(retirementOranizationsRepository, categoriesRepository)
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
    const retirementOrganization = makeFakeRetirementOrganization(args.id)
    retirementOranizationsRepository.readOne.mockResolvedValueOnce(retirementOrganization)
    const category = { name: 'category', id: 'any-id' }
    categoriesRepository.findById.mockResolvedValueOnce(category)
    await systemUnderTests.execute(args)

    expect(retirementOranizationsRepository.save).toBeCalledTimes(1)
    const { categoryId, ...call } = args
    expect(retirementOranizationsRepository.save).toBeCalledWith({ ...call, category, name: retirementOrganization.name })
  })

  it('should call retirementOranizationsRepository.readOne with correct args', async () => {
    await systemUnderTests.execute(args)

    expect(retirementOranizationsRepository.readOne).toBeCalledTimes(1)
    expect(retirementOranizationsRepository.readOne).toBeCalledWith(args.id)
  })

  it('should throws if id is not found', async () => {
    retirementOranizationsRepository.readOne.mockResolvedValueOnce(undefined)

    const promise = systemUnderTests.execute(args)

    await expect(promise).rejects.toEqual(new AppError('Convênio não cadastrado'))
  })

  it('should return the updated retirement organization', async () => {
    const retirementOrganization = await systemUnderTests.execute(args)

    expect(retirementOrganization).toEqual(args)
  })
})
