export interface IFgtsLoanRepository {
  /**
   * returns the interes per month.
   * Example.: 2.9% per month will return 2.9
   */
  getInterestPerMonth: () => Promise<number>
}
