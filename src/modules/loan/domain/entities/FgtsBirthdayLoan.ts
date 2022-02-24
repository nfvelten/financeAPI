import { randomUUID } from 'crypto'

export type FgtsBirthdayLoanProps = {
  id?: string
  accountBalance: number
  interestPerMonth: number
  birthday: Date
}

type Limits = Array<{
  minAmount: number
  maxPercentage: number
  additional: number
}>

export class FgtsBirthdayLoan {
  readonly id: string

  private readonly limits: Limits
  private readonly accountBalance: number
  private readonly interestPerMonth: number
  private readonly customerBirthday: Date
  private readonly maxAvailableLimit: number

  constructor(data: FgtsBirthdayLoanProps) {
    this.id = data.id ?? randomUUID()
    this.accountBalance = data.accountBalance
    this.interestPerMonth = data.interestPerMonth
    this.customerBirthday = data.birthday

    this.limits = [
      { minAmount: 20000, maxPercentage: 5, additional: 2900 },
      { minAmount: 15000, maxPercentage: 10, additional: 1900 },
      { minAmount: 10000, maxPercentage: 15, additional: 1150 },
      { minAmount: 5000, maxPercentage: 20, additional: 650 },
      { minAmount: 1000, maxPercentage: 30, additional: 150 },
      { minAmount: 500, maxPercentage: 40, additional: 50 },
      { minAmount: 0, maxPercentage: 50, additional: 0 }
    ]

    this.maxAvailableLimit = this.getAvailableLimit()
  }

  public getInstallmentsAmount(): number {
    const i = 1 + this.getInterestPerDay()
    const days = this.getDiferenceInDaysToNextBirthday()
    const discount = Math.pow(i, days)

    return this.getAvailableLimit() / discount
  }

  private getInterestPerDay(): number {
    const interestInPercentage = this.interestPerMonth / 100
    return Math.pow(1 + interestInPercentage, 1 / 30) - 1
  }

  private getDiferenceInDaysToNextBirthday(): number {
    const d = this.customerBirthday
    const nextBirthday = new Date(new Date().getFullYear() + 1, d.getUTCMonth(), d.getDate())

    const date2 = new Date()
    const diffTime = Math.abs(date2.valueOf() - nextBirthday.valueOf())
    let totalDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let minus = 0
    while (totalDifference > 365) {
      minus += 1
      totalDifference -= 365
    }
    totalDifference -= Math.floor(minus / 4)

    return totalDifference
  }

  public getAvailableLimit(): number {
    const limit = this.limits.find(i => i.minAmount <= this.accountBalance)!

    const percentual = limit.maxPercentage / 100

    return (percentual * this.accountBalance) + limit.additional
  }
}
