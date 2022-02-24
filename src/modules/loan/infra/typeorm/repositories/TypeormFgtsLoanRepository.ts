import { IFgtsLoanRepository } from '@modules/loan/application/repositories'
import { getRepository, Repository } from 'typeorm'
import { FgtsBirthdayConfig } from '..'

export class TypeormFgtsLoanRepository implements IFgtsLoanRepository {
  private readonly ormRepository: Repository<FgtsBirthdayConfig>

  constructor() {
    this.ormRepository = getRepository(FgtsBirthdayConfig)
  }

  async getInterestPerMonth (): Promise<number> {
    const config = await this.ormRepository.findOne()
    return config!.interestPerMonth
  }
}
