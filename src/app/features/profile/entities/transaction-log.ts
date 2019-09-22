export class TransactionLog {
  id?: number;
  amount: number;
  description: string;
  categoryId: number;
  accountId: number;
  date: Date;
  userIdentifier: string;

  static map(data: TransactionLog): TransactionLog {
    const transactionLog: TransactionLog = {
      id: +data.id,
      date: new Date(data.date),
      amount: +data.amount,
      description: data.description,
      categoryId: +data.categoryId,
      accountId: +data.accountId,
      userIdentifier: data.userIdentifier
    };
    return transactionLog;
  }
}
