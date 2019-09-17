import { Store } from '../types/store';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { Account } from '../entities/account';
import { Constants } from '../common/constants';
@Injectable()
export class AccountStore {

  constructor(private dataService: DataService) {
    this._accountListStore = new Store<Account[]>([]);
    this._currentAccountStore = new Store<Account>(null);
  }

  private _currentAccountStore: Store<Account>;
  get currentAccount(): Account {
    return this._currentAccountStore.state;
  }

  private _accountListStore: Store<Account[]>;
  get accountList(): Account[] {
    return this._accountListStore.state;
  }

  public load(userIdentifier: string): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.dataService.getAccountList().then(accountList => {
        this._accountListStore.setState(accountList);
        const account = this.getAccount(userIdentifier);
        this._currentAccountStore.setState(account);
      });
    });

  }
  public getAccount(userIdentifier: string): Account {
    const account = this.accountList.find(a => a.userIdentifier === userIdentifier);
    return account;
  }
  public get isParent(): boolean {
    if (this._currentAccountStore.state == null || this._currentAccountStore.state.roleId !== Constants.Role.Parent) {
      return false;
    } else {
      return true;
    }
  }
}
