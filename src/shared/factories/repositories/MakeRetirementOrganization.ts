import { IRetirementOrganizationsRepository } from '@modules/loan/application/repositories'
import { TypeormRetirementOrganizationRepository } from '@modules/loan/infra/typeorm'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MakeRetirementOrganization {
  private static instance?: IRetirementOrganizationsRepository

  static getInstance(): IRetirementOrganizationsRepository {
    if (!this.instance) {
      this.instance = new TypeormRetirementOrganizationRepository()
    }

    return this.instance
  }
}
