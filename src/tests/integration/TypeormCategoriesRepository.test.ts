import { ICategoriesRepository } from '@modules/loan/application/repositories'
import { TypeormCategoriesRepository } from '@modules/loan/infra/typeorm/repositories'
import { TypeormHelper } from '@modules/loan/infra/typeorm'
import { CategoryDTO } from '@modules/loan/application/repositories/dtos'
import { randomUUID } from 'crypto'

const insertCategory = async (): Promise<CategoryDTO> => {
  const name = `Category ${Date.now()} ${Math.random()}`
  const id = randomUUID()
  await TypeormHelper.query(`insert into categories values('${id}', '${name}', false)`)
  return { name, id }
}

describe('ICategoriesRepository', () => {
  let systemUnderTests: ICategoriesRepository

  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  beforeEach(() => {
    systemUnderTests = new TypeormCategoriesRepository()
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  it('should return undefined if category does not exists', async () => {
    const category = await systemUnderTests.findById(randomUUID())

    expect(category).toBe(undefined)
  })

  it('should return the category if it exists', async () => {
    const { id, name } = await insertCategory()
    const category = await systemUnderTests.findById(id)

    expect(category).toEqual({
      id,
      name
    })
  })
})
