export class Account {
  id: number;
  roleId: number;
  name: string;
  balance: number;
  userIdentifier: string;
  activeTaskWeekId?: number;

  static map(data: Account): Account {
    const account: Account = {
      id: +data.id,
      name: data.name,
      balance: +data.balance,
      roleId: +data.roleId,
      userIdentifier: data.userIdentifier,
      activeTaskWeekId: +data.activeTaskWeekId
    };
    return account;
  }
}
