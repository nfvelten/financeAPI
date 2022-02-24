export interface ICalculatePayrollLinkedLoanPriceservice {
  execute: (data: CalculatePayrollLinkedLoanPrice.Input) => Promise<number>
}

export namespace CalculatePayrollLinkedLoanPrice{
  export type Input = {
    retirementOrganizationId: string
    amount: number
  }
}
