import { IRetirementOrganizationsRepository, RetirementOrganizationsRepositoryDTO } from '@modules/loan/application/repositories'
import { RetirementOrganizationDTO } from '@modules/loan/application/repositories/dtos'
import { getRepository, Repository } from 'typeorm'
import { RetirementOrganization as RetirementOrganizationDB } from '../models'
import { MapRetirementOrganization } from '../mappers/MapRetirementOrganization'
import { RetirementOrganization } from '@modules/loan/domain/entities'

export class TypeormRetirementOrganizationRepository implements IRetirementOrganizationsRepository {
  private readonly ormRepository: Repository<RetirementOrganizationDB>

  constructor() {
    this.ormRepository = getRepository(RetirementOrganizationDB)
  }

  async readAll (): Promise<RetirementOrganization[]> {
    return this.ormRepository.find()
  }

  async readByCategory (categoryId: string): Promise<RetirementOrganizationDTO[]> {
    return this.ormRepository.createQueryBuilder('ro').where('ro.category_id = :categoryId', { categoryId }).getMany()
  }

  async readOneByCategory (categoryId: string): Promise<RetirementOrganizationDTO | undefined> {
    return this.ormRepository.createQueryBuilder('ro').where('ro.category_id = :categoryId', { categoryId }).getOne()
  }

  async readOne (id: string): Promise<RetirementOrganizationDTO | undefined> {
    let dto: RetirementOrganizationDTO | undefined

    const retirementOrganization = await this.ormRepository.findOne(id)

    if (retirementOrganization != null) {
      dto = MapRetirementOrganization.toDto(retirementOrganization)
    }

    return dto
  }

  async readByName(name: string): Promise<RetirementOrganizationDTO | undefined> {
    let dto: RetirementOrganizationDTO | undefined

    const retirementOrganization = await this.ormRepository.findOne({ where: { name } })

    if (retirementOrganization != null) {
      dto = MapRetirementOrganization.toDto(retirementOrganization)
    }

    return dto
  }

  async save(data: RetirementOrganizationsRepositoryDTO.SaveInput): Promise<RetirementOrganizationDTO> {
    let retirementOrganization = await this.ormRepository.findOne({ where: { name: data.name } })

    if (retirementOrganization == null) {
      retirementOrganization = this.ormRepository.create(data)
    }

    retirementOrganization = await this.ormRepository.save({
      ...data,
      id: retirementOrganization?.id
    })

    return MapRetirementOrganization.toDto(retirementOrganization)
  }

  async delete (id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
