export interface ICalculateFGTSBirthdayInstallmentAmountService {
  execute: (data: CalculateFGTSInstallmentAmount.Input) => Promise<number>
}

export namespace CalculateFGTSInstallmentAmount {
  export type Input = {
    birthday: Date
    accountBalance: number
  }
}
