export class Constants {
  public static get ActivityStatus() {
    return { Incomplete: 1, Complete: 2, Blocked: 3};
  }
  public static get Role() {
    return {Parent: 1, Child: 2};
  }
  public static get Status() {
    return {Open: 1, Submitted: 2, Approved: 3, Rejected: 4};
  }
  public static get TransactionCategory() {
    return {Deposit: 1, Withdrawal: 2};
  }
}
