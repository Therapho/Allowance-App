import { Store } from '../types/store';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { Account } from '../entities/account';
@Injectable()
export class AccountStore extends Store<Account> {
  constructor(private dataService: DataService) {
    super(null);
  }

  public load(userIdentifier: string): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.dataService.getAccount(userIdentifier).then(
        (data: Account) => {
          this.setState(data);
          resolve(data);
        })
        .catch(error => reject(error));

    });
  }
}
