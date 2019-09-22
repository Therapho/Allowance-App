import { Store } from 'src/app/core/types/store';
import { DataService } from 'src/app/core/services/data-service/data.service';
import { Injectable } from '@angular/core';
import { TransactionLog } from '../entities/transaction-log';

@Injectable()
export class TransactionLogStore extends Store<TransactionLog[]> {
  constructor(private dataService: DataService) {
    super(null);
  }

  public async load(accountId: number): Promise<TransactionLog[]> {
    return new Promise<TransactionLog[]>((resolve, reject) => {
      this.dataService
        .getTransactionLogList(accountId)
        .then(data => {
          this.setState(data);
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }
}
