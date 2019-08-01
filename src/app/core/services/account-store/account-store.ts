import { Store } from '../../types/store';
import { Injectable } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { Account } from '../../types/account';
@Injectable()
export class AccountStore extends Store<Account> {
  constructor(private dataService: DataService) {
    super(null);
  }

  public load(email: string) {
    this.dataService.getAccount(email).subscribe(
      (data: Account) =>
      this.setState(data));
  }
}
