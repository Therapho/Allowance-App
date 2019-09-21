export interface Transaction {
  description: string;
  amount: number;
  categoryId: number;
  accountId?:number;
}
