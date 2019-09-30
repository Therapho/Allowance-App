import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Account } from '../../entities/account';
import { Lookup } from '../../entities/lookup';
import { Transaction } from 'src/app/features/profile/types/transaction';
import { TransactionLog } from 'src/app/features/profile/entities/transaction-log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private client: HttpClient) {}

  public getAccount(userIdentifier: string): Promise<Account> {
    const parameters = new HttpParams().set('useridentifier', userIdentifier);
    const options = {params: parameters};

    return new Promise<Account>((resolve, reject) => {
      this.client.get<Account[]>(environment.dataApiUrl + '/accountset' , options).toPromise()
      .then(accountList => resolve(Account.map(accountList[0])))
      .catch(error => reject(error));
    });

  }
  getAccountList(): Promise<Account[]> {
    return this.client.get<Account[]>(environment.dataApiUrl + '/accountset')
      .pipe(map((list: Account[]) => list.map(data => Account.map(data))))
      .toPromise();

  }
  updateBalance(transaction: Transaction): Promise<any> {
    return this.client.post(environment.dataApiUrl + '/updatebalance', transaction).toPromise();
  }
  public getTaskGroupList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/taskgroupset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });
  }

  public getRoleList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/roleset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });
  }

  public getStatusList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/statusset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });

  }
  public getActivityStatusList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/activitystatusset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });
  }
  getTransactionCategoryList() {
    return this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/transactioncategoryset').toPromise();
  }

  public getTransactionLogList(accountId: number): Promise<TransactionLog[]> {
    const parameters = new HttpParams().set('accountid', accountId.toString());
    const options = {params: parameters};

    return this.client.get<TransactionLog[]>(environment.dataApiUrl + '/transactionlogset', options)
      .pipe(map((list: TransactionLog[]) => list.map(data => TransactionLog.map(data))))
      .toPromise();
  }
}
