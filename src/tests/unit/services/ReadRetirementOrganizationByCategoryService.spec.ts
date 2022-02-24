import { ICategoriesRepository, IRetirementOrganizationsRepository } from '@modules/loan/application/repositories'
import { ReadRetirementOrganizationsByCategoryService } from '@modules/loan/application/services'
import AppError from '@shared/errors/AppError'
import { Mocked } from '@tests/helpers'
import { makeFakeRetirementOrganization } from '@tests/helpers/mocks/makeFakeRetirementOrganization'

describe('ReadRetirementOrganizationsByCategoryService', () => {
  let categoriesRepository: Mocked<ICategoriesRepository>
  let retirementOranizationsRepository: Mocked<IRetirementOrganizationsRepository>
  let args: string
  let systemUnderTests: ReadRetirementOrganizationsByCategoryService

  beforeAll(() => {
    categoriesRepository = { findById: jest.fn().mockImplementation(id => ({ id, name: 'any-category' })) }
    retirementOranizationsRepository = {
      readByCategory: jest.fn().mockResolvedValue([makeFakeRetirementOrganization('retirement-1'), makeFakeRetirementOrganization('retirement-1')])
    } as Mocked<IRetirementOrganizationsRepository>

    args = 'any-category-id'
  })

  beforeEach(() => {
    systemUnderTests = new ReadRetirementOrganizationsByCategoryService(retirementOranizationsRepository, categoriesRepository)
  })

  it('should call categories repository with correct args', async () => {
    await systemUnderTests.execute(args)

    expect(categoriesRepository.findById).toHaveBeenCalledTimes(1)
    expect(categoriesRepository.findById).toBeCalledWith(args)
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

    expect(retirementOranizationsRepository.readByCategory).toBeCalledTimes(1)
    expect(retirementOranizationsRepository.readByCategory).toBeCalledWith(args)
  })

  it('should return the retirement organizations', async () => {
    const ro1 = makeFakeRetirementOrganization('retirement-1')
    const ro2 = makeFakeRetirementOrganization('retirement-1')
    retirementOranizationsRepository.readByCategory.mockResolvedValueOnce([ro1, ro2])

    const retirementOrganizations = await systemUnderTests.execute(args)

    expect(retirementOrganizations).toEqual([ro1, ro2])
  })
})
